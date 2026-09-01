import React from 'react';
import { Link } from 'react-router-dom';
import ctaBg from '../../assets/about/about_cta_img.png';

function FeaturesCTA() {
  return (
    <section 
      className="py-section-gap-mobile md:py-section-gap-desktop px-margin-page text-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${ctaBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          background: 'rgba(248, 247, 242, 0.65)',
          backdropFilter: 'contrast(1.2) saturate(1.2)',
          WebkitBackdropFilter: 'contrast(1.2) saturate(1.2)'
        }}
      ></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-outline opacity-20"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-outline opacity-20"></div>
      <div className="max-w-3xl mx-auto relative z-10 fade-in-up text-ink-text">
        <h2 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl mb-12">
          The next plan starts here.
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link to="/models" className="inline-block w-60 text-center border border-black text-black py-[15px] text-[1rem] transition-all duration-200 hover:bg-black hover:text-white">
            EXPLORE MODELS
          </Link>
          <Link to="/chat" className="inline-block w-60 text-center bg-[#111] text-white py-[15px] text-[1rem] border border-[#111] transition-all duration-200 hover:bg-transparent hover:text-[#111]">
            TRY FLANORA ↗
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturesCTA;
