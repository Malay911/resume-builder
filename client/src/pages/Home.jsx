import React from 'react';
import Banner from '../components/home/Banner';
import Hero from '../components/home/Hero';
import TrustedBy from '../components/home/TrustedBy';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Testimonial from '../components/home/Testomonial';
import CallToAction from '../components/home/CallToAction';
import Footer from '../components/home/Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 transition-colors duration-300 antialiased selection:bg-indigo-500/30">
      <Banner />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;