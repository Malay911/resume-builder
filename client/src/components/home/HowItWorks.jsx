import React from 'react';
import { motion } from 'framer-motion';
import { FileEdit, Palette, Download, ArrowRight, Sparkles, CheckCircle2, Palette as ThemeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            icon: FileEdit,
            title: "Add your details",
            description: "Fill in your experience, education, and skills. Use our AI assistant to enhance your bullet points instantly.",
            gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            glowColor: 'rgba(59,130,246,0.15)',
            highlights: ['Personal info & contact', 'Work experience with AI assist', 'Education & certifications', 'Skills & achievements'],
        },
        {
            number: "02",
            icon: Palette,
            title: "Choose a design",
            description: "Pick from multiple recruiter-approved templates. Customize the layout and colors to match your personal brand.",
            gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            glowColor: 'rgba(139,92,246,0.15)',
            highlights: ['4 professional templates', 'Custom accent colors', 'Real-time live preview', 'ATS-safe layouts'],
        },
        {
            number: "03",
            icon: Download,
            title: "Download & Apply",
            description: "Export your polished resume in a single click. Our PDFs are guaranteed to be 100% ATS-friendly and print-ready.",
            gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
            glowColor: 'rgba(16,185,129,0.15)',
            highlights: ['One-click PDF export', 'ATS-optimized formatting', 'Share public link', 'Print-ready quality'],
        }
    ];

    return (
        <div id="how-it-works" className="py-24 bg-neutral-50/60 relative overflow-hidden border-y border-neutral-100">

            {/* Soft color glow top-right */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-50"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)' }}
            />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-20"
                >
                    <span className="badge-accent mb-4">How It Works</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight mb-6 mt-4">
                        From empty page to{' '}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>
                            hired in 5 minutes.
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-500 leading-relaxed font-medium">
                        Building a professional resume shouldn't take all weekend. Three simple steps is all it takes.
                    </p>
                </motion.div>

                {/* Vertical Timeline */}
                <div className="relative max-w-4xl mx-auto">

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isLast = index === steps.length - 1;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className="relative flex gap-6 md:gap-10"
                            >
                                {/* Left: Number + Connector */}
                                <div className="flex flex-col items-center flex-shrink-0">
                                    {/* Gradient step circle */}
                                    <div
                                        className="relative z-10 flex items-center justify-center size-14 rounded-2xl text-white font-extrabold text-lg shadow-lg flex-shrink-0"
                                        style={{ background: step.gradient }}
                                    >
                                        {/* Glow effect */}
                                        <div className="absolute inset-0 rounded-2xl blur-md -z-10"
                                            style={{ background: step.gradient, opacity: 0.4 }}
                                        />
                                        {step.number}
                                    </div>

                                    {/* Vertical connecting line */}
                                    {!isLast && (
                                        <motion.div
                                            initial={{ scaleY: 0 }}
                                            whileInView={{ scaleY: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: index * 0.2 + 0.3, ease: "easeOut" }}
                                            className="w-0.5 flex-1 mt-3 mb-3 origin-top rounded-full"
                                            style={{ background: `linear-gradient(to bottom, ${step.gradient.includes('#3b82f6') ? '#3b82f6' : step.gradient.includes('#8b5cf6,#ec4899') ? '#8b5cf6' : '#10b981'}, transparent)`, minHeight: '60px' }}
                                        />
                                    )}
                                </div>

                                {/* Right: Card content */}
                                <div className={`flex-1 pb-12 ${isLast ? 'pb-0' : ''}`}>
                                    <div className="group bg-white rounded-2xl border border-neutral-100 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">

                                        {/* Soft glow on hover */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                            style={{ background: `radial-gradient(circle at top left, ${step.glowColor} 0%, transparent 60%)` }}
                                        />

                                        {/* Top row: Icon + Title */}
                                        <div className="flex items-start gap-4 mb-4 relative z-10">
                                            <div className="flex items-center justify-center size-12 rounded-xl flex-shrink-0"
                                                style={{ background: step.glowColor.replace('0.15', '0.12') }}>
                                                <div style={{ background: step.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                                    <Icon className="size-6" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-extrabold text-black leading-tight">{step.title}</h3>
                                                <p className="text-sm text-neutral-500 mt-1 leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>

                                        {/* Highlight chips */}
                                        <div className="flex flex-wrap gap-2 relative z-10">
                                            {step.highlights.map((item, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-50 border border-neutral-100 text-neutral-600"
                                                >
                                                    <span className="size-1.5 rounded-full flex-shrink-0"
                                                        style={{ background: step.gradient }}
                                                    />
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <Link
                        to="/app?state=register"
                        className="btn-primary px-8 py-4 text-sm md:text-base inline-flex items-center justify-center gap-2 hover:-translate-y-1 transition-all"
                    >
                        Build your resume now <ArrowRight className="size-4" />
                    </Link>
                    <p className="text-xs text-neutral-400 mt-3 font-medium">Free forever · No credit card required</p>
                </motion.div>
            </div>
        </div>
    );
};

export default HowItWorks;
