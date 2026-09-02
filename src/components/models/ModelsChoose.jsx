import React from 'react';
import { Link } from 'react-router-dom';

function ModelsChoose() {
  return (
    <section className="py-32">
      <div className="max-w-5xl mx-auto px-6">
        <h3 className="font-playfair text-4xl mb-16 text-charcoal">Choose Your Approach</h3>
        <div className="flex flex-col border-t border-charcoal">
          
          {/* Row 1 */}
          <Link to="/models/flanora-v1" className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-hairline items-center hover:bg-white transition-colors duration-300 group cursor-pointer">
            <div className="font-playfair text-xl text-charcoal group-hover:pl-2 transition-all">Flanora-v1</div>
            <div className="font-martel text-sm text-charcoal-light">Controlled Generation</div>
            <div className="font-martel text-sm text-flanora-lime font-semibold tracking-wider uppercase">Available</div>
            <div className="text-right">
              <span className="link-arrow">
                Explore 
                <svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12">
                  <path d="M7 17l9.2-9.2M17 17V7H7"></path>
                </svg>
              </span>
            </div>
          </Link>
          
          {/* Row 2 */}
          <Link to="/models/flanora-v2" className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-hairline items-center hover:bg-white transition-colors duration-300 group cursor-pointer">
            <div className="font-playfair text-xl text-charcoal group-hover:pl-2 transition-all">Flanora-v2</div>
            <div className="font-martel text-sm text-charcoal-light">Multi-Model Generation</div>
            <div className="font-martel text-sm text-flanora-lime font-semibold tracking-wider uppercase">Available</div>
            <div className="text-right">
              <span className="link-arrow">
                Explore 
                <svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12">
                  <path d="M7 17l9.2-9.2M17 17V7H7"></path>
                </svg>
              </span>
            </div>
          </Link>
          
          {/* Row 3 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-hairline items-center text-outline">
            <div className="font-playfair text-xl">Flanora-v3</div>
            <div className="font-martel text-sm">Next Generation</div>
            <div className="font-martel text-sm tracking-wider uppercase">Coming Soon</div>
            <div className="text-right font-martel text-sm uppercase tracking-wider">
              Coming Soon
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default ModelsChoose;
