import React from 'react';
import { Link } from 'react-router-dom';
import modelsCtaImg from '../../assets/models/models_cta_img.png';

function ModelsCTA() {
  return (
    <section 
      className="py-32 relative overflow-hidden"
      style={{
        backgroundImage: `url(${modelsCtaImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'rgba(248, 247, 242, 0.65)',
          backdropFilter: 'contrast(1.2) saturate(1.2)',
          WebkitBackdropFilter: 'contrast(1.2) saturate(1.2)',
        }}
      />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-playfair text-5xl md:text-7xl mb-8 text-charcoal">Find the model for your next idea.</h2>
        <div className="flex justify-center">
          <Link 
            className="inline-flex items-center justify-center px-8 py-4 border border-black text-black font-martel text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300" 
            to="/models/flanora-v1"
          >
            Explore Flanora-v1
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
