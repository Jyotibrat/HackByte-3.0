import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../utils/Reveal';
import Slider from '../utils/Slider';
import Transition from '../utils/Transition';
import './ShowcaseFlanoraV1.css';
import imagesLoaded from 'imagesloaded';

const imageModules = import.meta.glob('../assets/showcase/flanora-v1/*.png', { eager: true });

// Helper to get image URL by name
const getImageUrl = (name) => {
  const path = `../assets/showcase/flanora-v1/${name}`;
  return imageModules[path]?.default || imageModules[path];
};

const slidesData = [
  { img: 'test_0000.png', title: 'Inherited Light', desc: 'A subtle study in how illumination travels through history.' },
  { img: 'test_0001.png', title: 'Red Earth Theory', desc: 'Theoretical landscapes born of rust and dust.' },
  { img: 'test_0002.png', title: 'Soft Sovereignty', desc: 'The gentle power of nature reclaiming structure.' },
  { img: 'test_0003.png', title: 'Gathering Weather', desc: 'Storm clouds rendered in digital certainty.' },
  { img: 'test_0004.png', title: 'Worn Horizon', desc: 'The edges of the world, rubbed smooth by time.' },
  { img: 'test_0005.png', title: 'The Fifth Fire', desc: 'An exploration of warmth and destructive grace.' },
  { img: 'test_0006.png', title: 'Ancestor Season', desc: 'Generational echoes captured in static forms.' },
  { img: 'test_0007.png', title: 'A Field Listening', desc: 'Silent arrays waiting for a signal.' },
  { img: 'test_0008.png', title: 'Language of Dust', desc: 'What remains when the words are blown away.' },
  { img: 'test_0009.png', title: 'Between Sweetgrass', desc: 'A liminal space woven from organic threads.' },
  { img: 'test_0010.png', title: 'Silent Protocol', desc: 'Machine logic rendered as visual silence.' },
  { img: 'test_0011.png', title: 'Iron Memory', desc: 'Structures that refuse to forget.' },
  { img: 'test_0012.png', title: 'Broken Symmetry', desc: 'Finding beauty in the uneven collapse.' },
  { img: 'test_0013.png', title: 'The Long Arc', desc: 'Trajectories stretching beyond the frame.' },
  { img: 'test_0014.png', title: 'Neon Whispers', desc: 'Low-light transmissions in the dark.' },
  { img: 'test_0015.png', title: 'Hollow Center', desc: 'The gravity of what is missing.' },
  { img: 'test_0016.png', title: 'Final Blueprint', desc: 'The ultimate design before execution.' },
];

const ShowcaseFlanoraV1 = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Wait for all images to load before initializing GSAP to avoid height calculation issues
    const imgLoad = imagesLoaded(containerRef.current);
    
    imgLoad.on('always', () => {
      setIsLoaded(true);
      
      // Initialize Transition
      const transition = new Transition({ 
        onClose: () => {
          if (sliderRef.current) sliderRef.current.start();
        } 
      });

      // Initialize Reveal
      const reveal = new Reveal();

      // Initialize Slider
      const slider = new Slider({
        enabled: () => transition.state === "closed",
        onToggle: (changes) => reveal.toggle(changes),
      });
      sliderRef.current = slider;

      // Attach event listeners to slides
      const slides = Array.from(document.querySelectorAll(".gallery__slide"));
      
      slides.forEach((slide, index) => {
        slide.setAttribute("tabindex", "0");
        slide.setAttribute("role", "button");

        const openSlide = () => {
          if (transition.state !== "closed") return;
          slider.stop();
          transition.open(slide, index);
        };

        slide.addEventListener("click", openSlide);
        slide.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openSlide();
          }
        });
      });

      const backBtn = document.querySelector(".content__back");
      if (backBtn) {
        backBtn.addEventListener("click", () => transition.close());
      }

      const handleKeyDown = (e) => {
        if (e.key === "Escape") transition.close();
      };
      document.addEventListener("keydown", handleKeyDown);

      // Cleanup
      return () => {
        slides.forEach(slide => slide.replaceWith(slide.cloneNode(true))); // remove listeners
        if (backBtn) backBtn.replaceWith(backBtn.cloneNode(true));
        document.removeEventListener("keydown", handleKeyDown);
        if (sliderRef.current) sliderRef.current.destroy();
      };
    });
  }, []);

  return (
    <div className="showcase-v1-container" ref={containerRef}>
      {!isLoaded && (
        <div className="fixed inset-0 z-[10000] bg-[#f8f7f5] flex items-center justify-center">
          <div className="w-[100px] h-[1px] bg-[#9b9b9b] origin-left animate-[loaderAnim_1.5s_ease-in-out_infinite_alternate_forwards]" />
        </div>
      )}
      
      <main>
        <header className="frame">
          <h1 className="frame__title"></h1>

        </header>

        <div className="gallery">
          {slidesData.map((slide, i) => (
            <figure className="gallery__slide" key={i}>
              <div className="gallery__img-wrapper">
                <img
                  className="gallery__img"
                  src={getImageUrl(slide.img)}
                  alt={slide.title}
                  loading="eager"
                />
              </div>
              <figcaption>{slide.title}</figcaption>
            </figure>
          ))}
        </div>

        {/* Fixed popup overlay */}
        <div className="content">
          <div className="content__preview-img">
            <img src="" alt="preview" />
          </div>
          
          <div className="content__group-list">
            <button className="content__back">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            
            {slidesData.map((slide, i) => (
              <div className="content__group" data-index={i} key={i}>
                <h2 className="content__title">{slide.title}</h2>
                <p className="content__description">{slide.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShowcaseFlanoraV1;
