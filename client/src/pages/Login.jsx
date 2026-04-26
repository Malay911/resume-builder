import React, { useEffect, useRef, useCallback } from 'react'
import { Lock, Mail, User2Icon, ArrowRight } from 'lucide-react'
import logo from '../assets/logo.svg'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

// ── Google "G" SVG icon ──────────────────────────────────────────────────────
const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
        <path d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
        <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
        <path d="M43.611 20.083H42V20H24v8h11.303a11.953 11.953 0 01-4.089 5.57l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
    </svg>
)

// ── GitHub SVG icon ──────────────────────────────────────────────────────────
const GithubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
)

// ── Divider ──────────────────────────────────────────────────────────────────
const Divider = () => (
    <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-neutral-200" />
        <span className="text-xs font-medium text-neutral-400 select-none">or</span>
        <div className="flex-1 h-px bg-neutral-200" />
    </div>
)

const Login = () => {
    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get("state")
    const [state, setState] = React.useState(urlState || "login")
    const [isLoading, setIsLoading] = React.useState(false)
    const [googleLoading, setGoogleLoading] = React.useState(false)
    const oneTapInitialised = useRef(false)

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    // ── Handle GitHub OAuth error redirects ──────────────────────────────────
    React.useEffect(() => {
        const error = query.get('error')
        if (error) {
            const errorMessages = {
                github_no_code: 'GitHub authorization was cancelled.',
                github_token_failed: 'Failed to exchange GitHub token. Please try again.',
                github_no_email: 'No email found on your GitHub account. Please ensure you have a verified email.',
                github_auth_failed: 'GitHub authentication failed. Please try again.',
            }
            toast.error(errorMessages[error] || 'Sign-in failed. Please try again.')
            // Clean up the URL
            window.history.replaceState({}, '', window.location.pathname)
        }
    }, [])

    // ── Handle credential response from Google ───────────────────────────────
    // useCallback keeps a stable reference so renderButton's callback always works
    const handleGoogleCredential = useCallback(async (response) => {
        setGoogleLoading(true)
        try {
            const { data } = await api.post('/api/users/google-login', {
                credential: response.credential
            })
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            toast.success(data.message || 'Signed in with Google!')
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Google sign-in failed')
            setGoogleLoading(false)
        }
    }, [dispatch])

    // ── Load Google Identity Services, initialise & render hidden button ──────
    // We render Google's real button into a hidden container.
    // When user clicks our styled button we click the real one — this bypasses
    // the browser suppression that affects prompt() on user-gesture events.
    useEffect(() => {
        if (oneTapInitialised.current) return
        oneTapInitialised.current = true

        const initGoogle = () => {
            if (!window.google || !CLIENT_ID) return

            window.google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: handleGoogleCredential,
                auto_select: false,
                cancel_on_tap_outside: true,
                ux_mode: 'popup',
            })

            // Render Google's real button into the hidden container
            const hiddenContainer = document.getElementById('google-hidden-btn-container')
            if (hiddenContainer) {
                window.google.accounts.id.renderButton(hiddenContainer, {
                    theme: 'outline',
                    size: 'large',
                    type: 'standard',
                    shape: 'rectangular',
                })
            }
        }

        const existingScript = document.getElementById('google-gsi')
        if (!existingScript) {
            const script = document.createElement('script')
            script.src = 'https://accounts.google.com/gsi/client'
            script.id = 'google-gsi'
            script.async = true
            script.defer = true
            script.onload = initGoogle
            document.head.appendChild(script)
        } else {
            initGoogle()
        }
    }, [handleGoogleCredential])

    // ── Click the hidden real Google button ─────────────────────────────────
    const handleGoogleButtonClick = () => {
        const realBtn = document.querySelector('#google-hidden-btn-container div[role="button"]')
            || document.querySelector('#google-hidden-btn-container button')
        if (realBtn) {
            realBtn.click()
        } else {
            toast.error('Google sign-in is still loading, please try again.')
        }
    }

    // ── Email/Password submit ────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const { data } = await api.post(`/api/users/${state}`, formData)
            dispatch(login(data))
            localStorage.setItem("token", data.token)
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
        setIsLoading(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="min-h-screen flex" style={{ background: 'var(--bg-body)' }}>

            {/* ── Left branding panel (desktop only) ───────────────────────── */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-12 bg-black">
                {/* subtle grid */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
                        backgroundSize: '44px 44px'
                    }}
                />
                {/* glow blobs */}
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5" style={{ background: '#ffffff', filter: 'blur(100px)' }} />
                <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full opacity-5" style={{ background: '#ffffff', filter: 'blur(80px)' }} />

                <div className="relative text-center max-w-md z-10">
                    <div className="mb-8">
                        <img src={logo} alt="ResumeAI" className="h-9 w-auto mx-auto" style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                    <h2 className="text-3xl font-bold text-white leading-tight">
                        Build your perfect resume<br />in minutes
                    </h2>
                    <p className="text-white/50 mt-4 text-sm leading-relaxed">
                        AI-powered suggestions, beautiful templates, and real-time preview —<br />
                        everything you need to land your dream job.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-10 text-white/40 text-xs">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">10k+</p>
                            <p>Resumes</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">4</p>
                            <p>Templates</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">AI</p>
                            <p>Powered</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Right panel — auth card ───────────────────────────────────── */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-sm animate-fadeIn">

                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center mb-8">
                        <img src={logo} alt="ResumeAI" className="h-7 w-auto" />
                    </div>

                    {/* Heading */}
                    <h1 className="text-2xl font-bold text-black">
                        {state === "login" ? "Welcome back" : "Create your account"}
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1.5">
                        {state === "login"
                            ? "Sign in to access your resumes"
                            : "Start building your professional resume"}
                    </p>

                    {/* ── Hidden container for Google's real rendered button (must be in DOM, not display:none) ── */}
                    <div
                        id="google-hidden-btn-container"
                        style={{
                            position: 'absolute',
                            width: '1px',
                            height: '1px',
                            overflow: 'hidden',
                            opacity: 0,
                            pointerEvents: 'none',
                            top: 0,
                            left: 0,
                        }}
                    />

                    {/* ── Google Button ── */}
                    <button
                        id="google-signin-btn"
                        type="button"
                        onClick={handleGoogleButtonClick}
                        disabled={googleLoading}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            width: '100%',
                            marginTop: '24px',
                            padding: '11px 16px',
                            border: '1.5px solid #d4d4d4',
                            borderRadius: '10px',
                            background: '#ffffff',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#111',
                            transition: 'box-shadow 0.18s ease, transform 0.18s ease',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)'
                            e.currentTarget.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)'
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        {googleLoading ? (
                            <>
                                <div style={{ width: 18, height: 18, border: '2px solid #d4d4d4', borderTop: '2px solid #111', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                                <span>Signing in…</span>
                            </>
                        ) : (
                            <>
                                <GoogleIcon />
                                <span>Continue with Google</span>
                            </>
                        )}
                    </button>

                    {/* ── GitHub Button ── */}
                    <button
                        id="github-signin-btn"
                        type="button"
                        onClick={() => {
                            const clientId = 'Ov23li6vXlOu8jW9I0zi'
                            const redirectUri = encodeURIComponent(
                                `${import.meta.env.VITE_BASE_URL || 'http://localhost:5000'}/api/github/callback`
                            )
                            window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            width: '100%',
                            marginTop: '10px',
                            padding: '11px 16px',
                            border: '1.5px solid #d4d4d4',
                            borderRadius: '10px',
                            background: '#ffffff',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#111',
                            transition: 'box-shadow 0.18s ease, transform 0.18s ease',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)'
                            e.currentTarget.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)'
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        <GithubIcon />
                        <span>Continue with GitHub</span>
                    </button>

                    <Divider />

                    {/* ── Email / Password form ── */}
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {state !== "login" && (
                                <div>
                                    <label className="text-xs font-semibold text-neutral-600 mb-1.5 block">Full Name</label>
                                    <div className="relative">
                                        <User2Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                                        <input
                                            id="field-name"
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            className="w-full pl-10 pr-4 py-3 text-sm"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="text-xs font-semibold text-neutral-600 mb-1.5 block">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                                    <input
                                        id="field-email"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        className="w-full pl-10 pr-4 py-3 text-sm"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-neutral-600 mb-1.5 block">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                                    <input
                                        id="field-password"
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-3 text-sm"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {state === "login" && (
                            <div className="mt-2.5 text-right">
                                <button type="button" className="text-xs font-medium text-black/60 hover:text-black transition">
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        <button
                            id="submit-btn"
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-3 mt-6 flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-1.5">
                                    <div className="size-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="size-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="size-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            ) : (
                                <>
                                    {state === "login" ? "Sign In" : "Create Account"}
                                    <ArrowRight className="size-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm mt-6 text-neutral-500">
                        {state === "login" ? "Don't have an account?" : "Already have an account?"}
                        <button
                            id="toggle-state-btn"
                            type="button"
                            onClick={() => setState(prev => prev === "login" ? "register" : "login")}
                            className="font-semibold text-black hover:text-neutral-600 ml-1.5 transition"
                        >
                            {state === "login" ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>

            {/* ── Spin keyframe (for Google loading spinner) ── */}
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    )
}

export default Login