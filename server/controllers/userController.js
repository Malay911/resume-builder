import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Resume from "../models/Resume.js";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken=(userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"});
    return token
}

//controller for user registration
//POST: api/users/register
export const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;

        //check if required fields are present
        if(!name || !email || !password){
            return res.status(400).json({message:"Missing required fields"});
        }

        //check if user already exists
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        //create new user
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({name,email,password:hashedPassword});
        
        //return success message
        const token=generateToken(newUser._id);
        newUser.password=undefined;
        return res.status(201).json({message:"User created successfully",token,user:newUser});

    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

//controller for user login
//POST: api/users/login
export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;

        //check if user exists
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid email or password"});
        }

        //check if password is correct
        if(!user.comparePassword(password)){
            return res.status(400).json({error:"Invalid email or password"});
        }

        //return success message
        const token=generateToken(user._id);
        user.password=undefined;
        return res.status(200).json({message:"User logged in successfully",token,user});

    } catch (error) {
        return res.status(400).json({error:error.message});
    }
}

//controller for Google One Tap login
//POST: api/users/google-login
export const googleLoginUser=async(req,res)=>{
    try {
        const {credential}=req.body;

        if(!credential){
            return res.status(400).json({message:"No credential provided"});
        }

        let payload;

        // Check if the credential is a JWT (contains two dots) or an access token
        if (credential.split('.').length === 3) {
            // Verify the Google JWT token
            const ticket=await googleClient.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            payload=ticket.getPayload();
        } else {
            // Fetch user info using access token
            const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${credential}` }
            });
            payload = data;
        }

        const {sub: googleId, email, name, picture}=payload;

        // Upsert user: find by email, update or create
        let user=await User.findOne({email});

        if(!user){
            // New Google user — create without password
            user=await User.create({name, email, googleId, picture});
        } else {
            // Existing user — update Google-specific fields if missing
            if(!user.googleId) user.googleId=googleId;
            if(!user.picture && picture) user.picture=picture;
            await user.save();
        }

        const token=generateToken(user._id);
        user.password=undefined;
        return res.status(200).json({
            message:"Logged in with Google successfully",
            token,
            user
        });

    } catch (error) {
        console.error("Google login error:", error.message);
        return res.status(401).json({message:"Google authentication failed"});
    }
}

//controller or getting user by id
//GET: /api/users/data
export const getUserById=async(req,res)=>{
    try{
        const userId=req.userId;

        //check if user exists
        const user=await User.findById(userId);
        if(!user){
            return res.status(400).json({error:"User not found"});
        }

        //return user
        user.password=undefined;
        return res.status(200).json({user});
    }catch(error){
        return res.status(400).json({message:error.message});
    }
}

//controller for getting user resumes
//GET: /api/users/resumes
export const getUserResumes=async(req,res)=>{
    try {
        const userId=req.userId;

        //return user resumes
        const resumes=await Resume.find({userId});
        return res.status(200).json({resumes});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}