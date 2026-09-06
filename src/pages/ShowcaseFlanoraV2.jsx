import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InfiniteCanvas } from '../components/showcase-v2/InfiniteCanvas.jsx';

const imageModules = import.meta.glob('../assets/showcase/flanora-v2/*.png', { eager: true });

const getImageUrl = (name) => {
  const path = `../assets/showcase/flanora-v2/${name}`;
  return imageModules[path]?.default || imageModules[path];
};

const ShowcaseFlanoraV2 = () => {
  const [media, setMedia] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Generate media array from the imports
    const mediaItems = [];
    for (let i = 0; i <= 66; i++) {
      const idx = i.toString().padStart(4, '0');
      const url = getImageUrl(`test_${idx}.png`);
      if (url) {
        mediaItems.push({
          id: `item_${i}`,
          url: url,
          title: `Item ${i}`,
        });
      }
    }
    setMedia(mediaItems);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: '#f8f7f5' }}>
      
      {progress < 100 && (
        <div className="fixed inset-0 z-[10000] bg-[#f8f7f5] flex flex-col items-center justify-center">
          <div className="text-xl font-light mb-4 text-black">Loading Textures... {progress}%</div>
          <div className="w-[100px] h-[1px] bg-[#9b9b9b] origin-left animate-[loaderAnim_1.5s_ease-in-out_infinite_alternate_forwards]" />
        </div>
      )}

      {media.length > 0 && (
        <InfiniteCanvas 
          media={media} 
          showControls={true} 
          backgroundColor="#f8f7f5" 
          fogColor="#f8f7f5"
          onTextureProgress={(p) => setProgress(p)}
        />
      )}
      
      {/* Back button fixed at the bottom right */}
      <div style={{ position: 'absolute', bottom: '24px', right: '24px', zIndex: 100 }}>
        <Link 
          to="/showcase"
          className="flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-3 rounded-full hover:bg-black transition-colors"
          style={{ fontFamily: 'inherit' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </Link>
      </div>
    </div>
  );
};

export default ShowcaseFlanoraV2;
