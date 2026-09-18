import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FlanoraV2Section from './FlanoraV2Section';
import './FlanoraV2.scss';

const bgImage = "https://images.unsplash.com/photo-1589848315097-ba7b903cc1cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const frontImage = "https://assets-global.website-files.com/63ec206c5542613e2e5aa784/643312a6bc4ac122fc4e3afa_main%20home.webp";

const sectionsData = [
  { id: 1, title: 'The Beginning', content: 'The Beginning', bgImage, frontImage, hash: 'introduction' },
  { id: 2, title: 'Inside the Architecture', content: 'Inside the Architecture', bgImage, frontImage, hash: 'architecture' },
  { id: 3, title: 'From Input to Inference', content: 'From Input to Inference', bgImage, frontImage, hash: 'inference' },
  { id: 4, title: 'A Measure of Architecture', content: 'A Measure of Architecture', bgImage, frontImage, hash: 'evaluation' },
  { id: 5, title: 'Explore Further', content: 'Explore Further', bgImage, frontImage, hash: 'learn-more' },
];

const FlanoraV2Layout = () => {
  const [isInactive, setIsInactive] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Handle URL hash mapping to active section on mount and hash change
  useEffect(() => {
    const currentHash = location.hash.replace('#', '');
    if (currentHash) {
      const section = sectionsData.find((s) => s.hash === currentHash);
      if (section) {
        setActiveSection(section.id);
      }
    } else {
      setActiveSection(null);
    }
  }, [location.hash]);

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInactive(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionClick = (id) => {
    if (activeSection === id) return;
    const section = sectionsData.find((s) => s.id === id);
    if (section) {
      navigate(`#${section.hash}`, { replace: true });
    }
  };

  const handleSectionClose = () => {
    navigate('', { replace: true });
  };

  return (
    <div className="flanora-v2-container blueprint-bg flanora-research-page">
      <div
        className={`cont ${isInactive ? 's--inactive' : ''} ${
          activeSection !== null ? 's--el-active' : ''
        }`}
      >
        <div className="cont__inner">
          {sectionsData.map((section) => (
            <FlanoraV2Section
              key={section.id}
              index={section.id}
              title={section.title}
              content={section.content}
              bgImage={section.bgImage}
              frontImage={section.frontImage}
              isActive={activeSection === section.id}
              onClick={() => handleSectionClick(section.id)}
              onClose={handleSectionClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlanoraV2Layout;
