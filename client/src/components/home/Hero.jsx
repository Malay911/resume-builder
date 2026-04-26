import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, LayoutTemplate, Menu, X, CheckCircle2, Sparkles, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.svg';

const Hero = () => {
    const { user } = useSelector(state => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    // Track scroll position for navbar style + active section
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Determine active section
            const sections = ['features', 'how-it-works', 'testimonials', 'templates'];
            let current = '';
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120) current = id;
                }
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll to section with offset
    const scrollToSection = useCallback((e, sectionId) => {
        e.preventDefault();
        if (sectionId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const el = document.getElementById(sectionId);
        if (el) {
            const offset = 90;
            const y = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, []);

    const navLinks = [
        { id: 'features', label: 'Features' },
        { id: 'how-it-works', label: 'How it works' },
        { id: 'testimonials', label: 'Testimonials' },
    ];

    return (
        <div id="top" className="min-h-screen relative overflow-hidden">

            {/* Gradient color wash that bleeds through the grid */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top-center indigo glow */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[70%] h-[60%] rounded-full blur-[100px]"
                    style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)' }}
                />
                {/* Left blue blob */}
                <motion.div
                    animate={{ x: [-20, 20, -20], y: [0, 30, 0] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] -left-[10%] w-[40%] h-[50%] rounded-full blur-[90px]"
                    style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)' }}
                />
                {/* Right violet blob */}
                <motion.div
                    animate={{ x: [15, -25, 15], y: [-10, 20, -10] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[15%] -right-[8%] w-[45%] h-[55%] rounded-full blur-[100px]"
                    style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.05) 50%, transparent 70%)' }}
                />
                {/* Bottom cyan glow */}
                <motion.div
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] left-[25%] w-[50%] h-[35%] rounded-full blur-[90px]"
                    style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)' }}
                />
            </div>

            {/* Center fade — keeps text crisp and readable over the grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,255,255,0.85) 0%, transparent 70%)' }}
            />

            {/* ═══ Floating Navbar ═══ */}
            <motion.nav
                initial={{ y: 0 }}
                animate={scrolled ? { y: 0 } : { y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none"
            >
                <motion.div
                    layout
                    className="pointer-events-auto flex items-center justify-between w-full max-w-7xl px-5 md:px-8 py-4 rounded-2xl transition-all duration-500"
                    style={{
                        background: scrolled ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.60)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.04)',
                        boxShadow: scrolled
                            ? '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'
                            : '0 1px 4px rgba(0,0,0,0.02)',
                    }}
                >
                    {/* Logo */}
                    <a href="#top" onClick={(e) => scrollToSection(e, 'top')} className="flex items-center shrink-0">
                        <img src={logo} alt="ResumeForge" className="h-8 w-auto" />
                    </a>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1.5 bg-neutral-100/70 rounded-xl p-1.5">
                        <a
                            href="#top"
                            onClick={(e) => scrollToSection(e, 'top')}
                            className={`px-4 py-2 text-[15px] font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                                !activeSection
                                    ? 'bg-white text-black shadow-sm'
                                    : 'text-neutral-500 hover:text-black hover:bg-white/50'
                            }`}
                        >
                            <Home className="size-4" />
                            Home
                        </a>
                        {navLinks.map(link => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={(e) => scrollToSection(e, link.id)}
                                className={`px-4 py-2 text-[15px] font-semibold rounded-lg transition-all duration-200 ${
                                    activeSection === link.id
                                        ? 'bg-white text-black shadow-sm'
                                        : 'text-neutral-500 hover:text-black hover:bg-white/50'
                                }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3 shrink-0">
                        {user ? (
                            <Link to='/app' className="btn-primary px-6 py-2.5 text-[15px] flex items-center gap-2">
                                Dashboard <ArrowRight className="size-4" />
                            </Link>
                        ) : (
                            <>
                                <Link to='/app?state=login' className="text-neutral-600 hover:text-black font-semibold px-5 py-2.5 text-[15px] transition-colors">Log in</Link>
                                <Link to="/app?state=register" className="btn-primary px-6 py-2.5 text-[15px] hover:-translate-y-0.5 transition-all">Get Started</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 rounded-xl text-neutral-600 bg-white/80 shadow-sm border border-neutral-200/60 hover:bg-neutral-50 transition">
                        <Menu className="size-5" />
                    </button>
                </motion.div>
            </motion.nav>

            {/* ═══ Mobile Menu ═══ */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm md:hidden"
                        onClick={() => setMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            onClick={e => e.stopPropagation()}
                            className="mx-4 mt-4 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
                                <img src={logo} alt="ResumeForge" className="h-6 w-auto" />
                                <button onClick={() => setMenuOpen(false)} className="p-1.5 text-neutral-400 hover:text-black bg-neutral-50 rounded-lg transition">
                                    <X className="size-5" />
                                </button>
                            </div>
                            <div className="px-3 py-3 space-y-1">
                                <a href="#top" onClick={(e) => { scrollToSection(e, 'top'); setMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-black hover:bg-neutral-50 transition-colors">
                                    <Home className="size-4 text-neutral-400" /> Home
                                </a>
                                {navLinks.map(link => (
                                    <a key={link.id} href={`#${link.id}`} onClick={(e) => { scrollToSection(e, link.id); setMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-black hover:bg-neutral-50 transition-colors">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                            <div className="px-4 pb-4 pt-2 space-y-2 border-t border-neutral-100 mt-1">
                                {user ? (
                                    <Link to="/app" className="btn-primary py-3 text-center text-sm w-full block" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                                ) : (
                                    <>
                                        <Link to="/app?state=login" className="btn-secondary py-3 text-center text-sm w-full block" onClick={() => setMenuOpen(false)}>Log in</Link>
                                        <Link to="/app?state=register" className="btn-primary py-3 text-center text-sm w-full block" onClick={() => setMenuOpen(false)}>Get Started</Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 lg:pt-36 pb-24 flex flex-col lg:flex-row items-center gap-16">

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
                        <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">✨ Welcome to ResumeForge</span>
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