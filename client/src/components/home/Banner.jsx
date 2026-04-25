import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black border-b border-white/10">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.08) 30%, rgba(139,92,246,0.08) 70%, transparent 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-2.5">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-2 sm:gap-3 text-sm font-medium"
          >
            {/* Gradient accent badge */}
            <span className="badge-accent">
              <Sparkles className="size-3" />
              New
            </span>
            <p className="text-white/80 flex items-center gap-1">
              <span className="hidden sm:inline">Experience our </span>
              <span className="font-bold relative inline-block text-white">
                AI-Powered Resume Enhancement
                <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)', bottom: '2px', opacity: 0.5 }}></span>
              </span>
            </p>
            <Link to="/app?state=register" className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold group ml-1 transition-colors">
              Try it free
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;