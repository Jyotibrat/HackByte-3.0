import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutModelFamily() {
  const pinRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sectionPin = scrollRef.current;
    
    let containerAnimation = gsap.to(sectionPin, {
      scrollTrigger: {
        trigger: pinRef.current,
        start: 'top top',
        end: () => "+=" + sectionPin.offsetWidth,
        pin: true,
        scrub: true,
      },
      x: () => -(sectionPin.scrollWidth - document.documentElement.clientWidth) + "px",
      ease: 'none'
    });
    
    return () => {
      if (containerAnimation.scrollTrigger) {
        containerAnimation.scrollTrigger.kill();
      }
      containerAnimation.kill();
    }
  }, []);

  return (
    <section ref={pinRef} className="model-family-pin">
      <div ref={scrollRef} className="model-family-scroll">
        
        <div className="model-family-intro">
          <h2>Model Family</h2>
        </div>
        
        <Link to="/models/flanora-v1" className="model-card horizontal cursor-pointer transition-transform hover:scale-[1.02]">
          <img 
            src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80" 
            alt="Flanora v1 Concept" 
          />
          <div className="model-card-label">Flanora v1: Concept</div>
        </Link>

        <Link to="/models/flanora-v2" className="model-card horizontal cursor-pointer transition-transform hover:scale-[1.02]">
          <img 
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/611c8074-3c56-4810-a604-812a2791a1f9_800w.webp" 
            alt="Flanora v2 Precision" 
          />
          <div className="model-card-label" style={{ fontSize: '1.3rem', padding: '20px' }}>Flanora v2: Precision</div>
        </Link>

        <div className="model-card horizontal">
          <img 
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" 
            alt="Flanora v3 In Development" 
          />
          <div className="model-card-glass">Coming soon</div>
          <div className="model-card-label">Flanora v3: In Development</div>
        </div>
      </div>
    </section>
  );
}
