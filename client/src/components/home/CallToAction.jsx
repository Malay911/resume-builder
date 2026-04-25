import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="py-24 relative overflow-hidden bg-slate-900">
      {/* Very subtle colored orbs on dark surface */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '44px 44px'
        }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Gradient Sparkle badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md mb-8"
            style={{ background: 'rgba(59,130,246,0.12)' }}>
            <Sparkles className="size-4 text-blue-400" />
            <span className="text-sm font-semibold text-white/80">Start Your Journey Today</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
            Stop struggling with Word docs. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#60a5fa,#a78bfa,#34d399)' }}>
              Start landing interviews.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Join thousands of professionals who have successfully accelerated their careers using our AI-powered resume builder.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link to="/app?state=register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-auto px-10 py-5 bg-white text-black rounded-xl font-bold text-lg overflow-hidden transition-shadow"
                style={{ boxShadow: '0 0 40px 8px rgba(99,102,241,0.18)' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 60px 16px rgba(99,102,241,0.30)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 40px 8px rgba(99,102,241,0.18)'}
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-blue-50/50 to-transparent skew-x-12"></div>
                <span className="relative flex items-center justify-center gap-2">
                  Build My Resume Free <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-white/40">
            <div className="flex items-center gap-2"><CheckCircle2 className="size-5 text-emerald-400" /> No credit card required</div>
            <div className="hidden sm:block size-1.5 rounded-full bg-white/20"></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="size-5 text-blue-400" /> Free PDF downloads</div>
            <div className="hidden sm:block size-1.5 rounded-full bg-white/20"></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="size-5 text-violet-400" /> Cancel anytime</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;