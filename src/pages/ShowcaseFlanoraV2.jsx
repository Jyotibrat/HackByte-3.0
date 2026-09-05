import React from 'react';
import { Link } from 'react-router-dom';

const ShowcaseFlanoraV2 = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-black z-0 pointer-events-none" />
      
      <div className="z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl max-w-2xl text-center shadow-2xl relative overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
        
        <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
          <span className="text-2xl font-bold text-cyan-200">v2</span>
        </div>

        <h1 className="text-5xl font-light tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Flanora v2 Showcase
        </h1>
        
        <p className="text-xl text-white/50 mb-10 font-light leading-relaxed">
          Welcome to the dedicated showcase page for Flanora v2. This placeholder will soon be replaced with detailed generative capabilities, model parameters, and high-resolution examples.
        </p>

        <Link 
          to="/showcase" 
          className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 text-sm tracking-wide group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Main Showcase
        </Link>
      </div>
    </div>
  );
};

export default ShowcaseFlanoraV2;
