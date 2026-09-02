import React from 'react';
import { Link } from 'react-router-dom';
import modelsCtaImg from '../../assets/models/models_cta_img.png';

function ModelsCTA() {
  return (
    <section className="py-32 bg-charcoal text-paper-bg relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url(${modelsCtaImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-playfair text-5xl md:text-7xl mb-8 text-[#f8f7f5]">Find the model for your next idea.</h2>
        <p className="font-martel text-xl text-outline mb-12 font-light max-w-2xl mx-auto">
          Explore the Flanora model family or start generating your own floor-plan concepts today.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            className="inline-flex items-center justify-center px-8 py-4 bg-flanora-lime text-charcoal font-martel text-sm uppercase tracking-widest font-semibold hover:bg-[#f8f7f5] transition-colors duration-300" 
            to="/chat"
          >
            Try Flanora 
            <svg className="inline ml-2" fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12">
              <path d="M7 17l9.2-9.2M17 17V7H7"></path>
            </svg>
          </Link>
          <Link 
            className="inline-flex items-center justify-center px-8 py-4 border border-outline text-[#f8f7f5] font-martel text-sm uppercase tracking-widest hover:border-[#f8f7f5] transition-colors duration-300" 
            to="/models/flanora-v1"
          >
            Explore V1
            <svg className="inline ml-2" fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12">
              <path d="M7 17l9.2-9.2M17 17V7H7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ModelsCTA;
