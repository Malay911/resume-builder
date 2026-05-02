import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessAnimation = ({ show, onComplete }) => {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        fetch('https://fonts.gstatic.com/s/e/notoemoji/latest/2728/lottie.json')
            .then(res => res.json())
            .then(data => setAnimationData(data))
            .catch(() => console.error("Failed to load Lottie"));
    }, []);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onComplete && onComplete();
            }, 1800); // Auto-dismiss after 1.8s
            return () => clearTimeout(timer);
        }
    }, [show, onComplete]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/10 backdrop-blur-[2px]"
                    onClick={() => onComplete && onComplete()}
                >
                    <motion.div
                        initial={{ scale: 0.5, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="bg-white px-8 py-6 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col items-center border border-slate-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {animationData ? (
                            <div className="size-20 drop-shadow-sm">
                                <Lottie animationData={animationData} loop={false} />
                            </div>
                        ) : (
                            <div className="size-20 flex items-center justify-center">
                                <span className="text-4xl drop-shadow-sm">✨</span>
                            </div>
                        )}
                        <h3 className="text-lg font-bold text-slate-800 mt-1">Success!</h3>
                        <p className="text-xs text-slate-400 mt-1">Action completed</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SuccessAnimation;
