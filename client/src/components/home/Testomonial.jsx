import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonial = () => {
    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "Software Engineer at Google",
            avatar: "https://i.pravatar.cc/150?img=47",
            content: "I was struggling to get callbacks with my old resume. After using ResumeForge's suggestions and switching to the Modern template, I landed three interviews in one week.",
            rating: 5,
            accent: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            badge: 'rgba(59,130,246,0.12)',
        },
        {
            name: "Michael Chen",
            role: "Product Manager at Stripe",
            avatar: "https://i.pravatar.cc/150?img=11",
            content: "The AI parsing feature is incredible. It completely rewrote my bulky experience section into punchy, metric-driven bullet points that recruiters actually read.",
            rating: 5,
            accent: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            badge: 'rgba(139,92,246,0.12)',
        },
        {
            name: "Emily Rodriguez",
            role: "UX Designer at Canva",
            avatar: "https://i.pravatar.cc/150?img=5",
            content: "As a designer, I'm extremely picky about layouts. The templates here aren't just ATS-friendly; they're genuinely beautiful and perfectly spaced. Saved me hours.",
            rating: 5,
            accent: 'linear-gradient(135deg, #10b981, #06b6d4)',
            badge: 'rgba(16,185,129,0.12)',
        },
        {
            name: "David Kim",
            role: "Data Scientist at Amazon",
            avatar: "https://i.pravatar.cc/150?img=33",
            content: "The live preview makes editing so fast. I created tailored resumes for different roles in minutes instead of manually formatting Word documents.",
            rating: 4,
            accent: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            badge: 'rgba(6,182,212,0.12)',
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const current = testimonials[currentIndex];

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isHovered, testimonials.length]);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <div id="testimonials" className="py-24 bg-white/50 relative overflow-hidden">
            {/* Subtle colored blob */}
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full pointer-events-none blur-[120px]"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="badge-accent mb-4">Success Stories</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight mb-6 mt-4">
                        Don't just take <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#8b5cf6,#ec4899)' }}>our word for it.</span>
                    </h2>
                </motion.div>

                <div
                    className="relative max-w-4xl mx-auto"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Controls */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white border border-neutral-100 rounded-full shadow-md text-neutral-400 hover:text-black hover:border-black hover:scale-110 transition-all focus:outline-none"
                    >
                        <ChevronLeft className="size-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white border border-neutral-100 rounded-full shadow-md text-neutral-400 hover:text-black hover:border-black hover:scale-110 transition-all focus:outline-none"
                    >
                        <ChevronRight className="size-6" />
                    </button>

                    {/* Carousel */}
                    <div className="overflow-hidden px-4 md:px-12 py-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-neutral-100 relative group overflow-hidden"
                            >
                                {/* Accent glow top-right on current testimonial */}
                                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-60 pointer-events-none"
                                    style={{ background: current.badge.replace('0.12', '0.25') }}
                                />
                                <Quote className="absolute top-8 right-8 size-16 text-neutral-100 opacity-80" />

                                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                                    <div className="flex-shrink-0 relative">
                                        <img
                                            src={current.avatar}
                                            alt={current.name}
                                            className="size-20 md:size-24 rounded-full shadow-md object-cover border-4 border-transparent"
                                            style={{ boxShadow: `0 0 0 4px ${current.badge}` }}
                                        />
                                        {/* Gradient "Hired" badge */}
                                        <div className="absolute -bottom-2 -right-2 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1"
                                            style={{ background: current.accent }}>
                                            Hired
                                        </div>
                                    </div>

                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex justify-center md:justify-start gap-1 mb-4">
                                            {[...Array(current.rating)].map((_, i) => (
                                                <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                        <p className="text-xl md:text-2xl font-medium text-black leading-relaxed mb-6 italic">
                                            "{current.content}"
                                        </p>
                                        <div>
                                            <h4 className="text-lg font-bold text-black">{current.name}</h4>
                                            <p className="text-sm font-semibold text-transparent bg-clip-text"
                                                style={{ backgroundImage: current.accent }}>
                                                {current.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dots — gradient active */}
                    <div className="flex justify-center gap-2 mt-4">
                        {testimonials.map((t, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className="transition-all duration-300 rounded-full h-1.5"
                                style={{
                                    width: currentIndex === index ? '2rem' : '0.5rem',
                                    background: currentIndex === index ? t.accent : '#e5e5e5'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;