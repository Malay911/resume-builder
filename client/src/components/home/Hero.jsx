import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, LayoutTemplate, Menu, X, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.svg';

const Hero = () => {
    const { user } = useSelector(state => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-white">
            {/* Full-page grid background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '44px 44px'
                }}
            />

            {/* Radial center fade so text pops */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,255,255,0.95) 0%, transparent 80%)' }}
            />

            {/* Colored accent blobs — very subtle */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[130px]"
                    style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(139,92,246,0.06) 60%, transparent 100%)' }}
                />
                <motion.div
                    animate={{ x: [20, -20, 20], y: [20, -20, 20] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[20%] right-[0%] w-[40%] h-[60%] rounded-full blur-[140px]"
                    style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, rgba(139,92,246,0.05) 60%, transparent 100%)' }}
                />
                <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full blur-[120px]"
                    style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)' }}
                />
            </div>

            {/* Navbar */}
            <nav className="relative z-50 flex items-center justify-between w-full py-4 px-6 md:px-12 lg:px-20 xl:px-32 border-b border-black/[0.06] bg-white/60 backdrop-blur-xl">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="ResumeAI" className="h-7 w-auto" />
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-500">
                    <a href="#features" className="hover:text-black transition-colors">Features</a>
                    <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
                    <a href="#testimonials" className="hover:text-black transition-colors">Testimonials</a>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <Link to='/app' className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2">
                            Dashboard <ArrowRight className="size-3.5" />
                        </Link>
                    ) : (
                        <>
                            <Link to='/app?state=login' className="text-neutral-600 hover:text-black font-semibold px-4 py-2 text-sm transition-colors">Log in</Link>
                            <Link to="/app?state=register" className="btn-primary px-6 py-2.5 text-sm hover:-translate-y-0.5 transition-all">Get Started</Link>
                        </>
                    )}
                </div>

                <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 rounded-lg text-neutral-600 bg-white shadow-sm border border-neutral-200 hover:bg-neutral-50 transition">
                    <Menu className="size-5" />
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center gap-6 md:hidden"
                    >
                        <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-black bg-neutral-50 rounded-full transition">
                            <X className="size-6" />
                        </button>
                        <a href="#features" className="text-xl font-semibold text-black" onClick={() => setMenuOpen(false)}>Features</a>
                        <a href="#how-it-works" className="text-xl font-semibold text-black" onClick={() => setMenuOpen(false)}>How it works</a>
                        <a href="#testimonials" className="text-xl font-semibold text-black" onClick={() => setMenuOpen(false)}>Testimonials</a>
                        <div className="flex flex-col gap-3 w-4/5 mt-4">
                            {user ? (
                                <Link to="/app" className="btn-primary py-3.5 text-center text-sm" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                            ) : (
                                <>
                                    <Link to="/app?state=login" className="btn-secondary py-3.5 text-center text-sm" onClick={() => setMenuOpen(false)}>Log in</Link>
                                    <Link to="/app?state=register" className="btn-primary py-3.5 text-center text-sm" onClick={() => setMenuOpen(false)}>Get Started</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 lg:pt-32 pb-24 flex flex-col lg:flex-row items-center gap-16">

                {/* Left column */}
                <motion.div
                    className="flex-1 text-center lg:text-left pt-10"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Gradient accent badge */}
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm mb-6">
                        <span className="flex size-2 rounded-full animate-pulse" style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}></span>
                        <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">✨ Welcome to ResumeAI</span>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-black leading-[1.05] tracking-tight">
                        Build Resumes That <br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>Get You Hired.</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="mt-6 text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                        Create a pristine, ATS-friendly resume in exactly 5 minutes. Powered by beautiful design, smart AI, and proven templates accepted at top companies.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Link to='/app' className="btn-primary w-full sm:w-auto px-8 py-4 text-sm md:text-base flex items-center justify-center gap-2 hover:-translate-y-1 transition-all">
                            Create Resume <ArrowRight className="size-4" />
                        </Link>
                        <a href="#templates" className="btn-secondary w-full sm:w-auto px-8 py-4 text-sm md:text-base flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors">
                            <LayoutTemplate className="size-4 text-blue-500" />
                            View Templates
                        </a>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-semibold text-neutral-400">
                        <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-500" /> Free to use</span>
                        <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-500" /> No credit card</span>
                    </motion.div>
                </motion.div>

                {/* Right column: Animated Mockup */}
                <motion.div
                    className="flex-1 w-full max-w-lg lg:max-w-none relative"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <div className="relative rounded-2xl bg-white border border-neutral-200 shadow-2xl shadow-black/10 overflow-hidden" style={{ aspectRatio: '3/4', maxHeight: '600px', margin: '0 auto' }}>

                        {/* Top Toolbar */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 bg-neutral-50/60">
                            <div className="flex gap-1.5">
                                <div className="size-3 rounded-full bg-neutral-200"></div>
                                <div className="size-3 rounded-full bg-neutral-200"></div>
                                <div className="size-3 rounded-full bg-neutral-200"></div>
                            </div>
                            {/* Accent badge in mockup */}
                            <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-md shadow-sm border border-neutral-100 text-[10px] font-bold text-neutral-500">
                                <Sparkles className="size-3 text-violet-500" /> AI Analyzing...
                            </div>
                        </div>

                        {/* Resume Content Area */}
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-5">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                                    className="size-16 rounded-full flex items-center justify-center"
                                    style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.10), rgba(139,92,246,0.10))' }}
                                >
                                    <UserIcon className="size-8 text-blue-400" />
                                </motion.div>
                                <div className="space-y-2 flex-1">
                                    <motion.div initial={{ width: 0 }} animate={{ width: "60%" }} transition={{ delay: 0.8, duration: 0.5 }} className="h-6 bg-neutral-200 rounded" />
                                    <motion.div initial={{ width: 0 }} animate={{ width: "40%" }} transition={{ delay: 0.9, duration: 0.5 }} className="h-3 bg-neutral-100 rounded" />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                {[1, 2, 3].map((item, i) => (
                                    <div key={item} className="space-y-3">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.2 + (i * 0.4), duration: 0.4 }}
                                            className="flex items-center gap-2 pb-2 border-b border-neutral-100"
                                        >
                                            <div className="size-5 rounded flex items-center justify-center"
                                                style={{ background: i === 0 ? 'rgba(59,130,246,0.10)' : i === 1 ? 'rgba(139,92,246,0.10)' : 'rgba(6,182,212,0.10)' }}>
                                                <div className="size-2.5 rounded-sm"
                                                    style={{ background: i === 0 ? '#3b82f6' : i === 1 ? '#8b5cf6' : '#06b6d4', opacity: 0.7 }}></div>
                                            </div>
                                            <div className="h-4 w-24 bg-neutral-200 rounded"></div>
                                        </motion.div>
                                        <div className="space-y-2 pl-7">
                                            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.4 + (i * 0.4), duration: 0.6 }} className="h-3 bg-neutral-100 rounded origin-left w-full" />
                                            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.5 + (i * 0.4), duration: 0.6 }} className="h-3 bg-neutral-100 rounded origin-left w-5/6" />
                                            {i !== 2 && <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.6 + (i * 0.4), duration: 0.6 }} className="h-3 bg-neutral-100 rounded origin-left w-4/6" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Animated Scanning Line — gradient blue */}
                        <motion.div
                            animate={{ top: ['10%', '90%', '10%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-0.5 z-10"
                            style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent)', boxShadow: '0 0 12px 3px rgba(99,102,241,0.35)' }}
                        />
                    </div>

                    {/* Floating UI Elements */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2, type: "spring" }}
                        className="absolute -right-6 top-1/4 bg-white p-3 rounded-xl shadow-xl border border-neutral-100 flex items-center gap-3 backdrop-blur-md"
                    >
                        <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg,#10b981,#06b6d4)' }}>
                            <CheckCircle2 className="size-4 text-white" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-black">ATS Optimized</p>
                            <p className="text-[10px] text-neutral-400">Score: 98/100</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.3, type: "spring" }}
                        className="absolute -left-8 bottom-1/4 bg-white p-3 rounded-xl shadow-xl border border-neutral-100 flex items-center gap-3 backdrop-blur-md"
                    >
                        <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)' }}>
                            <Sparkles className="size-4 text-white" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-black">AI Grammar Fix</p>
                            <p className="text-[10px] text-neutral-400">Enhanced 4 sentences</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
)

export default Hero;