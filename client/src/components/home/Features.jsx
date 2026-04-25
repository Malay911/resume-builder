import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layout, MonitorSmartphone, Download, ShieldCheck, Zap } from 'lucide-react';

const Features = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const features = [
        {
            icon: <Sparkles className="size-6" />,
            title: "AI-Powered Suggestions",
            description: "Instantly enhance your job descriptions with smart AI that highlights your specific accomplishments.",
            accent: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            glow: 'rgba(99,102,241,0.15)',
        },
        {
            icon: <MonitorSmartphone className="size-6" />,
            title: "Real-Time Preview",
            description: "Watch your resume update instantly as you type. What you see is exactly what recruiters will see.",
            accent: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            glow: 'rgba(6,182,212,0.15)',
        },
        {
            icon: <Layout className="size-6" />,
            title: "Premium Templates",
            description: "Choose from a curated selection of field-tested templates designed by actual technical recruiters.",
            accent: 'linear-gradient(135deg, #10b981, #06b6d4)',
            glow: 'rgba(16,185,129,0.12)',
        },
        {
            icon: <Download className="size-6" />,
            title: "One-Click Export",
            description: "Download your pixel-perfect resume as a PDF instantly, ready to bypass Applicant Tracking Systems.",
            accent: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            glow: 'rgba(245,158,11,0.12)',
        },
        {
            icon: <ShieldCheck className="size-6" />,
            title: "ATS-Optimized Parsing",
            description: "Our machine-readable layouts guarantee your resume gets parsed correctly by sorting algorithms.",
            accent: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            glow: 'rgba(59,130,246,0.12)',
        },
        {
            icon: <Zap className="size-6" />,
            title: "Lightning Fast Editing",
            description: "Skip the formatting struggles. Our form-based editor builds beautiful layouts automatically.",
            accent: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            glow: 'rgba(236,72,153,0.12)',
        }
    ];

    return (
        <div id="features" className="py-24 bg-white relative overflow-hidden">
            {/* Subtle grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
                    backgroundSize: '44px 44px'
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    {/* Gradient badge */}
                    <span className="badge-accent mb-4">Features</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight mb-6 mt-4">
                        Everything you need to <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>stand out.</span>
                    </h2>
                    <p className="text-lg text-neutral-500 leading-relaxed font-medium">
                        We've removed the formatting headaches so you can focus strictly on what matters: your actual experience and achievements.
                    </p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={cardVariants} className="group relative">
                            <div className="h-full p-8 rounded-2xl bg-white border border-neutral-100 shadow-sm transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl relative z-10 overflow-hidden"
                                style={{ '--glow': feature.glow }}
                            >
                                {/* Soft glow on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                                    style={{ background: `radial-gradient(circle at top left, ${feature.glow} 0%, transparent 60%)` }}
                                />
                                {/* Gradient icon container */}
                                <div className="size-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 relative z-10"
                                    style={{ background: `linear-gradient(135deg, ${feature.glow.replace('0.15', '0.10').replace('0.12', '0.08')}, rgba(0,0,0,0.03))`, border: '1px solid rgba(0,0,0,0.05)' }}
                                >
                                    <div style={{ background: feature.accent, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-black mb-3 relative z-10">{feature.title}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed font-medium relative z-10">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Features;