import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FlanoraV2Section from './FlanoraV2Section';
import './FlanoraV2.scss';

const sectionsData = [
  { id: 1, title: 'The Beginning', content: 'The Beginning' },
  { id: 2, title: 'Inside the Architecture', content: 'Inside the Architecture' },
  { id: 3, title: 'From Input to Inference', content: 'From Input to Inference' },
  { id: 4, title: 'A Measure of Architecture', content: 'A Measure of Architecture' },
  { id: 5, title: 'Explore Further', content: 'Explore Further' },
];

const FlanoraV2Layout = () => {
  const [isInactive, setIsInactive] = useState(true);
  const [activeSection, setActiveSection] = useState(null);

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInactive(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionClick = (id) => {
    if (activeSection === id) return;
    setActiveSection(id);
  };

  const handleSectionClose = () => {
    setActiveSection(null);
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
