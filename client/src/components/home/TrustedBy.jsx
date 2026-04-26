import React from 'react';
import { brandLogos } from './BrandLogos';

const TrustedBy = () => {
    return (
        <section className="py-16 bg-white/60 backdrop-blur-[1px] relative border-b border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 overflow-hidden relative z-10">
                <p className="text-center text-sm font-bold text-slate-400 tracking-widest uppercase mb-2">
                    Trusted by professionals hired at
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-primary-100 via-primary-300 to-primary-100 mx-auto rounded-full"></div>
            </div>

            {/* Logos marquee wrapper */}
            <div className="relative group flex items-center">
                {/* Fade effects on edges */}
                <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none"></div>

                {/* Marquee Track */}
                <div className="flex w-max animate-[marqueeScroll_35s_linear_infinite] group-hover:[animation-play-state:paused] will-change-transform">
                    {/* Render two identical sets of logos. 
                        Moving from 0% to -50% smoothly translates exactly one full set */}
                    {[0, 1].map((set) => (
                        <div key={set} className="flex shrink-0 items-center">
                            {brandLogos.map((logo, index) => (
                                <div
                                    key={`${logo.name}-${set}-${index}`}
                                    className="px-8 md:px-14 lg:px-16 flex items-center justify-center transition-all duration-300"
                                    title={logo.name}
                                >
                                    <div className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-110 hover:drop-shadow-md transition-all duration-400 ease-out cursor-pointer flex items-center justify-center h-16 w-32">
                                        {logo.svg}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
