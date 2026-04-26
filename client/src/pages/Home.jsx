import React from 'react';
import Hero from '../components/home/Hero';
import TrustedBy from '../components/home/TrustedBy';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Testimonial from '../components/home/Testomonial';
import CallToAction from '../components/home/CallToAction';
import Footer from '../components/home/Footer';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-white antialiased selection:bg-indigo-500/30">
      {/* Persistent dotted grid background across the entire page */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cline x1='60' y1='0' x2='60' y2='60' stroke='rgba(0,0,0,0.12)' stroke-width='1' stroke-dasharray='3,4'/%3E%3Cline x1='0' y1='60' x2='60' y2='60' stroke='rgba(0,0,0,0.12)' stroke-width='1' stroke-dasharray='3,4'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Page content */}
      <div className="relative z-[1]">
        <Hero />
        <TrustedBy />
        <Features />
        <HowItWorks />
        <Testimonial />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
};

export default Home;