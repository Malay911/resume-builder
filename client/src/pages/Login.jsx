import React from 'react'
import { Lock, Mail, User2Icon, ArrowRight } from 'lucide-react'
import logo from '../assets/logo.svg'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const Login = () => {
    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get("state")
    const [state, setState] = React.useState(urlState || "login")
    const [isLoading, setIsLoading] = React.useState(false)

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

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
            {/* Left Panel — Pure Black Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-12 bg-black">
                {/* Subtle grid on black */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
                        backgroundSize: '44px 44px'
                    }}
                />
                {/* Soft white glow blobs */}
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5" style={{ background: '#ffffff', filter: 'blur(100px)' }} />
                <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full opacity-5" style={{ background: '#ffffff', filter: 'blur(80px)' }} />

                <div className="relative text-center max-w-md z-10">
                    <div className="mb-8">
                        <img src={logo} alt="ResumeAI" className="h-9 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                    <h2 className="text-3xl font-bold text-white leading-tight">Build your perfect resume in minutes</h2>
                    <p className="text-white/50 mt-4 text-sm leading-relaxed">
                        AI-powered suggestions, beautiful templates, and real-time preview — everything you need to land your dream job.
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

            {/* Right Panel — Form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <form onSubmit={handleSubmit} className="w-full max-w-sm animate-fadeIn">
                    {/* Mobile brand */}
                    <div className="lg:hidden flex items-center mb-8">
                        <img src={logo} alt="ResumeAI" className="h-7 w-auto" />
                    </div>

                    <h1 className="text-2xl font-bold text-black">
                        {state === "login" ? "Welcome back" : "Create your account"}
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1.5">
                        {state === "login" ? "Sign in to access your resumes" : "Start building your professional resume"}
                    </p>

                    <div className="space-y-4 mt-8">
                        {state !== "login" && (
                            <div>
                                <label className="text-xs font-semibold text-neutral-600 mb-1.5 block">Full Name</label>
                                <div className="relative">
                                    <User2Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                                    <input type="text" name="name" placeholder="John Doe" className="w-full pl-10 pr-4 py-3 text-sm" value={formData.name} onChange={handleChange} required />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="text-xs font-semibold text-neutral-600 mb-1.5 block">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                                <input type="email" name="email" placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 text-sm" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-neutral-600 mb-1.5 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                                <input type="password" name="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 text-sm" value={formData.password} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    {state === "login" && (
                        <div className="mt-2.5 text-right">
                            <button type="button" className="text-xs font-medium text-black/60 hover:text-black transition">Forgot password?</button>
                        </div>
                    )}

                    <button
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

                    <p className="text-center text-sm mt-6 text-neutral-500">
                        {state === "login" ? "Don't have an account?" : "Already have an account?"}
                        <button
                            type="button"
                            onClick={() => setState(prev => prev === "login" ? "register" : "login")}
                            className="font-semibold text-black hover:text-neutral-600 ml-1.5 transition"
                        >
                            {state === "login" ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login