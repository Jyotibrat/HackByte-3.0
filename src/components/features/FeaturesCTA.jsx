import React from 'react';
import { Link } from 'react-router-dom';
import ctaBg from '../../assets/about/about_cta_img.png';

function FeaturesCTA() {
  return (
    <section 
      className="py-section-gap-mobile md:py-section-gap-desktop px-margin-page text-center relative overflow-hidden bg-[#1a1a1a] text-[#f8f7f5]"
    >
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url(${ctaBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="max-w-3xl mx-auto relative z-10 fade-in-up">
        <h2 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl mb-12 text-[#f8f7f5]">
          See what Flanora can create.
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link to="/models" className="inline-block w-60 text-center border border-[#f8f7f5] text-[#f8f7f5] py-[15px] text-[1rem] transition-all duration-200 hover:bg-[#f8f7f5] hover:text-[#1a1a1a]">
            EXPLORE MODELS
          </Link>
          <Link to="/chat" className="inline-block w-60 text-center bg-black text-white py-[15px] text-[1rem] border border-black transition-all duration-200 hover:bg-white hover:text-black hover:border-white">
            TRY FLANORA ↗
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturesCTA;
