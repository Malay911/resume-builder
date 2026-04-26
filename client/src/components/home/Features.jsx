import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layout, MonitorSmartphone, Download, ShieldCheck, Zap, FileText, CheckCircle2, MousePointer2, Settings, FileCheck2 } from 'lucide-react';

const Features = () => {
    // Shared container variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { duration: 0.8, type: "spring", stiffness: 100, damping: 20 } 
        }
    };

    // Advanced pulsing glow effect for background
    const glowVariants = {
        animate: {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
    };

    return (
        <div id="features" className="py-24 relative overflow-hidden bg-[#FAFAFA]" 
             style={{ 
                 backgroundImage: 'radial-gradient(circle, #e2e8f0 1.5px, transparent 1.5px)', 
                 backgroundSize: '32px 32px'
             }}>
             
            {/* Animated Ambient Background Glows */}
            <motion.div variants={glowVariants} animate="animate" className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
            <motion.div variants={glowVariants} animate="animate" style={{ animationDelay: '4s' }} className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-transparent to-[#FAFAFA] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-sm tracking-wide mb-4 shadow-sm">
                        Features
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 mt-4">
                        Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">stand out.</span>
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed font-medium">
                        We've removed the formatting headaches so you can focus strictly on what matters: your actual experience and achievements.
                    </p>
                </motion.div>

                {/* BENTO GRID */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* CARD 1: One-Click Export (1 col) */}
                    <motion.div variants={cardVariants} className="col-span-1 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group flex flex-col p-7 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex items-center gap-3 mb-2 relative z-10">
                            <div className="size-10 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600 flex items-center justify-center border border-orange-200 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                <Download className="size-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-[15px]">One-Click Export</h3>
                        </div>
                        <p className="text-[13px] text-slate-500 mb-6 relative z-10">Download your pixel-perfect resume as a PDF instantly.</p>
                        
                        <div className="flex-1 flex items-center justify-center relative z-10">
                            <motion.div 
                                className="w-full max-w-[130px] bg-white border border-slate-100 rounded-2xl p-3 shadow-md relative overflow-hidden group-hover:border-orange-200 transition-colors"
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.div 
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-100 to-orange-50"
                                    animate={{ width: ["0%", "100%", "100%", "0%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <div className="flex items-center justify-between relative z-10">
                                    <FileText className="size-6 text-orange-500 drop-shadow-sm" />
                                    <span className="text-[11px] font-extrabold text-orange-600 tracking-wider">PDF</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* CARD 2: AI-Powered Suggestions (2 col) */}
                    <motion.div variants={cardVariants} className="col-span-1 md:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group flex flex-col p-7 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex items-center gap-3 mb-2 relative z-10">
                            <div className="size-10 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200 shadow-sm group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                                <Sparkles className="size-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-[15px]">AI-Powered Enhancements</h3>
                        </div>
                        <p className="text-[13px] text-slate-500 mb-4 max-w-sm relative z-10">Intelligently enhance your job descriptions with smart algorithms that highlight your specific accomplishments.</p>
                        
                        <div className="flex-1 relative mt-2 border border-slate-100 rounded-3xl bg-slate-50/50 overflow-hidden flex items-center justify-center shadow-inner z-10 group-hover:bg-indigo-50/30 transition-colors duration-500">
                            {/* Neural Network Graph */}
                            <div className="w-full max-w-[280px] relative h-32 flex items-center justify-between px-4">
                                {/* Left Nodes (Input) */}
                                <div className="space-y-4 relative z-10">
                                    {[0,1,2].map(i => (
                                        <motion.div 
                                            key={i} 
                                            className="h-2 w-10 bg-slate-200 rounded-full border border-slate-300"
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                                        />
                                    ))}
                                </div>

                                {/* Flowing Lines */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0px 0px 4px rgba(139,92,246,0.4))' }}>
                                    <motion.path d="M 50 35 Q 140 35 140 64" stroke="url(#gradient)" strokeWidth="2" fill="none" 
                                        strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                                    <motion.path d="M 50 64 Q 140 64 140 64" stroke="url(#gradient)" strokeWidth="2" fill="none" 
                                        strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                                    <motion.path d="M 50 93 Q 140 93 140 64" stroke="url(#gradient)" strokeWidth="2" fill="none" 
                                        strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#cbd5e1" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Center AI Node */}
                                <div className="relative z-20">
                                    <motion.div 
                                        animate={{ 
                                            scale: [1, 1.15, 1], 
                                            boxShadow: ["0px 0px 0px rgba(139,92,246,0)", "0px 0px 25px rgba(139,92,246,0.6)", "0px 0px 0px rgba(139,92,246,0)"] 
                                        }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="size-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl border border-white/20"
                                    >
                                        <Sparkles className="size-6 text-white drop-shadow-md" />
                                    </motion.div>
                                </div>

                                {/* Right Nodes (Output) */}
                                <div className="space-y-5 relative z-10">
                                    {[0,1].map(i => (
                                        <motion.div 
                                            key={i} 
                                            className="h-3.5 w-16 bg-indigo-100 rounded-full border border-indigo-200"
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 + 0.5, ease: "easeInOut" }}
                                        >
                                            <motion.div 
                                                className="h-full bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full"
                                                animate={{ width: ["0%", "100%", "100%", "0%"] }}
                                                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CARD 3: Premium Templates (1 col) */}
                    <motion.div variants={cardVariants} className="col-span-1 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group flex flex-col p-7 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex items-center gap-3 mb-2 relative z-10">
                            <div className="size-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-sm group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
                                <Layout className="size-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-[15px]">Premium Templates</h3>
                        </div>
                        <p className="text-[13px] text-slate-500 mb-6 relative z-10">Field-tested layouts by top recruiters.</p>
                        
                        <div className="flex-1 relative flex items-end justify-center pb-4 perspective-[1200px] z-10">
                            {/* Stacked Templates with 3D Effect */}
                            <motion.div 
                                className="absolute bottom-2 w-[120px] h-[150px] bg-white border border-slate-200 rounded-xl shadow-md origin-bottom flex flex-col p-2"
                                style={{ rotateZ: -8, rotateY: -15, translateX: -15, scale: 0.9 }}
                                whileHover={{ rotateZ: -20, translateX: -45, scale: 0.95, y: -10 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <div className="w-1/2 h-1.5 bg-slate-200 rounded-full mb-3" />
                                <div className="w-full h-1 bg-slate-100 rounded-full mb-1" />
                                <div className="w-3/4 h-1 bg-slate-100 rounded-full mb-3" />
                                <div className="w-full h-8 bg-slate-50 rounded-md" />
                            </motion.div>
                            
                            <motion.div 
                                className="absolute bottom-2 w-[120px] h-[150px] bg-white border border-slate-200 rounded-xl shadow-md origin-bottom flex flex-col p-2"
                                style={{ rotateZ: 8, rotateY: 15, translateX: 15, scale: 0.9 }}
                                whileHover={{ rotateZ: 20, translateX: 45, scale: 0.95, y: -10 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <div className="w-1/2 h-1.5 bg-slate-200 rounded-full mb-3 ml-auto" />
                                <div className="w-full h-1 bg-slate-100 rounded-full mb-1" />
                                <div className="w-3/4 h-1 bg-slate-100 rounded-full mb-3 ml-auto" />
                                <div className="w-full h-8 bg-slate-50 rounded-md" />
                            </motion.div>
                            
                            <motion.div 
                                className="absolute bottom-2 w-[120px] h-[150px] bg-white border-2 border-emerald-400 rounded-xl shadow-[0_10px_30px_rgba(16,185,129,0.2)] origin-bottom flex flex-col p-3 z-10"
                                whileHover={{ scale: 1.1, y: -15 }}
                                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                            >
                                <div className="w-1/2 h-2 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full mb-3" />
                                <div className="space-y-1.5 mb-3">
                                    <div className="w-full h-1 bg-slate-100 rounded-full" />
                                    <div className="w-4/5 h-1 bg-slate-100 rounded-full" />
                                </div>
                                <div className="flex gap-2 mb-2">
                                    <div className="size-5 bg-emerald-50 rounded-md border border-emerald-100" />
                                    <div className="flex-1 h-5 bg-slate-50 rounded-md" />
                                </div>
                                <div className="w-full h-1 bg-slate-100 rounded-full mt-auto" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* CARD 4: Real-Time Preview (2 col) */}
                    <motion.div variants={cardVariants} className="col-span-1 md:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group flex flex-col p-7 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-200 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                    <MonitorSmartphone className="size-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-[15px]">Real-Time Sync</h3>
                                    <p className="text-[13px] text-slate-500 mt-0.5">Watch your resume update instantly as you type.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex-1 grid grid-cols-2 gap-5 h-full relative z-10">
                            {/* Editor Window */}
                            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col shadow-inner relative overflow-hidden group-hover:border-cyan-200 transition-colors duration-500">
                                {/* Window dots */}
                                <div className="flex gap-1.5 mb-4">
                                    <div className="size-2.5 rounded-full bg-red-400" />
                                    <div className="size-2.5 rounded-full bg-amber-400" />
                                    <div className="size-2.5 rounded-full bg-green-400" />
                                </div>
                                <div className="space-y-3 flex-1">
                                    <div className="h-3 bg-slate-200 rounded-full w-2/5" />
                                    <div className="h-8 bg-white border border-slate-200 rounded-lg w-full relative overflow-hidden flex items-center px-3 shadow-sm">
                                        <motion.div 
                                            className="h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                                            animate={{ width: ["0%", "85%", "85%", "0%"] }}
                                            transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="h-8 bg-white border border-slate-200 rounded-lg w-1/2 relative overflow-hidden flex items-center px-3 shadow-sm">
                                            <motion.div 
                                                className="h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                                                animate={{ width: ["0%", "70%", "70%", "0%"] }}
                                                transition={{ duration: 4, repeat: Infinity, delay: 0.3, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
                                            />
                                        </div>
                                        <div className="h-8 bg-white border border-slate-200 rounded-lg w-1/2 shadow-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Preview Window */}
                            <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl border border-slate-200 p-4 flex items-center justify-center relative overflow-hidden shadow-inner group-hover:border-cyan-200 transition-colors duration-500">
                                <div className="w-[75%] aspect-[1/1.3] bg-white shadow-md border border-slate-200 p-4 rounded-md flex flex-col transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                                    <motion.div 
                                        className="h-2 bg-slate-800 rounded-full mb-3"
                                        animate={{ width: ["0%", "85%", "85%", "0%"] }}
                                        transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
                                    />
                                    <motion.div 
                                        className="h-1.5 bg-slate-300 rounded-full mb-1.5"
                                        animate={{ width: ["0%", "70%", "70%", "0%"] }}
                                        transition={{ duration: 4, repeat: Infinity, delay: 0.3, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
                                    />
                                    <div className="w-full h-px bg-slate-100 my-2" />
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full mb-1.5" />
                                    <div className="w-5/6 h-1.5 bg-slate-100 rounded-full" />
                                </div>
                            </div>

                            {/* Floating Cursor Animation */}
                            <motion.div 
                                className="absolute left-[30%] top-[40%] z-20 drop-shadow-md"
                                animate={{ 
                                    x: [0, 50, 0], 
                                    y: [0, 20, 0],
                                    scale: [1, 0.9, 1]
                                }}
                                transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 1], ease: "easeInOut" }}
                            >
                                <MousePointer2 className="size-5 text-slate-800 fill-slate-800" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* CARD 5: ATS-Optimized Parsing (1 col) */}
                    <motion.div variants={cardVariants} className="col-span-1 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group flex flex-col p-7 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex items-center gap-3 mb-2 relative z-10">
                            <div className="size-10 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                <ShieldCheck className="size-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-[15px]">ATS-Optimized</h3>
                        </div>
                        <p className="text-[13px] text-slate-500 mb-6 relative z-10">Guarantees your resume gets parsed perfectly by recruitment software.</p>
                        
                        <div className="flex-1 flex items-center justify-center relative z-10">
                            <div className="w-[100px] h-[130px] bg-white border border-slate-200 rounded-xl shadow-md p-3 relative overflow-hidden flex flex-col group-hover:border-blue-300 transition-colors duration-500">
                                <div className="space-y-2 mt-2">
                                    {[1,2,3,4,5,6].map(i => (
                                        <div key={i} className={`h-1.5 bg-slate-100 rounded-full relative overflow-hidden ${i%2===0?'w-4/5':'w-full'}`}>
                                            <motion.div 
                                                className="absolute inset-0 bg-blue-400"
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1, ease: "linear" }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* Advanced Scanning Laser */}
                                <motion.div 
                                    className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_15px_3px_rgba(59,130,246,0.8)] z-20"
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.div 
                                    className="absolute left-0 right-0 top-0 bg-gradient-to-b from-blue-500/20 to-transparent z-10"
                                    animate={{ height: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* CARD 6: Lightning Fast Editing (1 col) */}
                    <motion.div variants={cardVariants} className="col-span-1 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group flex flex-col p-7 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex items-center gap-3 mb-2 relative z-10">
                            <div className="size-10 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-50 text-pink-600 flex items-center justify-center border border-pink-200 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                <Zap className="size-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-[15px]">Lightning Fast</h3>
                        </div>
                        <p className="text-[13px] text-slate-500 mb-6 relative z-10">Skip formatting entirely. Build professional layouts automatically.</p>
                        
                        <div className="flex-1 flex items-center justify-center relative z-10">
                            <div className="relative group-hover:scale-110 transition-transform duration-500">
                                {/* Ambient glow behind circle */}
                                <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-xl scale-150" />
                                
                                {/* Speed Circle */}
                                <svg className="size-28 transform -rotate-90 relative z-10 filter drop-shadow-lg">
                                    <circle cx="56" cy="56" r="48" stroke="#f1f5f9" strokeWidth="10" fill="none" />
                                    <motion.circle 
                                        cx="56" cy="56" r="48" stroke="url(#pinkGradient)" strokeWidth="10" fill="none"
                                        strokeDasharray="301.5"
                                        strokeDashoffset="301.5"
                                        animate={{ strokeDashoffset: [301.5, 40, 301.5] }}
                                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#f43f5e" />
                                            <stop offset="100%" stopColor="#ec4899" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                
                                <div className="absolute inset-0 flex items-center justify-center flex-col z-20">
                                    <motion.span 
                                        className="text-3xl font-black text-slate-900"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        10x
                                    </motion.span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Faster</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

export default Features;