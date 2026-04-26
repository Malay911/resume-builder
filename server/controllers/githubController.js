import axios from "axios";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// GET /api/github/callback?code=...
export const githubCallback = async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.redirect(
            `${process.env.CLIENT_URL || "http://localhost:5173"}/?error=github_no_code`
        );
    }

    try {
        // 1. Exchange code for access token
        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            {
                headers: { Accept: "application/json" },
            }
        );

        const accessToken = tokenResponse.data.access_token;

        if (!accessToken) {
            console.error("GitHub token exchange failed:", tokenResponse.data);
            return res.redirect(
                `${process.env.CLIENT_URL || "http://localhost:5173"}/?error=github_token_failed`
            );
        }

        // 2. Fetch user profile
        const userResponse = await axios.get("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { id: githubId, login: username, name, avatar_url } = userResponse.data;

        // 3. Fetch user email (may be private)
        const emailResponse = await axios.get("https://api.github.com/user/emails", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const primaryEmailObj = emailResponse.data.find(
            (e) => e.primary && e.verified
        ) || emailResponse.data[0];

        const email = primaryEmailObj?.email;

        if (!email) {
            return res.redirect(
                `${process.env.CLIENT_URL || "http://localhost:5173"}/?error=github_no_email`
            );
        }

        // 4. Upsert user in database
        let user = await User.findOne({ email });

        if (!user) {
            // New user — create
            user = await User.create({
                name: name || username,
                email,
                githubId: String(githubId),
                picture: avatar_url || null,
            });
        } else {
            // Existing user — update GitHub-specific fields if missing
            if (!user.githubId) user.githubId = String(githubId);
            if (!user.picture && avatar_url) user.picture = avatar_url;
            if (!user.name && (name || username)) user.name = name || username;
            await user.save();
        }

        // 5. Generate JWT token
        const token = generateToken(user._id);
        user.password = undefined;

        // 6. Redirect to frontend with token
        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
        const userData = encodeURIComponent(
            JSON.stringify({ token, user, message: "Logged in with GitHub successfully" })
        );

        return res.redirect(`${clientUrl}/auth/github/callback?data=${userData}`);
    } catch (error) {
        console.error("GitHub OAuth error:", error?.response?.data || error.message);
        return res.redirect(
            `${process.env.CLIENT_URL || "http://localhost:5173"}/?error=github_auth_failed`
        );
    }
};
