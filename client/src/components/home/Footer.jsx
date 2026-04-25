import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-neutral-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <a href="/" className="flex items-center mb-6">
                            <img src={logo} alt="ResumeAI" className="h-7 w-auto" />
                        </a>
                        <p className="text-neutral-500 text-sm leading-relaxed mb-6 max-w-sm">
                            The modern way to build professional, ATS-optimized resumes that actually get read. Stop formatting and start applying.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="size-10 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-100 hover:border-black/20 transition-all">
                                <Github className="size-4.5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="size-10 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-100 hover:border-black/20 transition-all">
                                <Twitter className="size-4.5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="size-10 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-100 hover:border-black/20 transition-all">
                                <Linkedin className="size-4.5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-bold text-black mb-6 text-sm">Product</h4>
                        <ul className="space-y-4">
                            <li><a href="#templates" className="text-sm text-neutral-500 hover:text-black transition-colors">Resume Templates</a></li>
                            <li><a href="#features" className="text-sm text-neutral-500 hover:text-black transition-colors">Features</a></li>
                            <li><a href="#how-it-works" className="text-sm text-neutral-500 hover:text-black transition-colors">How it works</a></li>
                            <li><Link to="/app?state=register" className="text-sm text-neutral-500 hover:text-black transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-black mb-6 text-sm">Resources</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-sm text-neutral-500 hover:text-black transition-colors">Resume Examples</a></li>
                            <li><a href="#" className="text-sm text-neutral-500 hover:text-black transition-colors">Cover Letter Builder</a></li>
                            <li><a href="#" className="text-sm text-neutral-500 hover:text-black transition-colors">Blog</a></li>
                            <li><a href="#" className="text-sm text-neutral-500 hover:text-black transition-colors">Career Advice</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-black mb-6 text-sm">Legal</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-sm text-neutral-500 hover:text-black transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm text-neutral-500 hover:text-black transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-sm text-neutral-500 hover:text-black transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="text-sm text-neutral-500 hover:text-black transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-neutral-400">
                        © {new Date().getFullYear()} ResumeAI. All rights reserved.
                    </p>
                    <p className="text-sm text-neutral-400 flex items-center gap-1.5 focus:outline-none">
                        Built with <Heart className="size-4 text-neutral-400 fill-neutral-300" /> for job seekers
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;