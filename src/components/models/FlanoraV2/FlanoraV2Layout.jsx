import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FlanoraV2Section from './FlanoraV2Section';
import './FlanoraV2.scss';

const sectionsData = [
  { id: 1, title: 'Section 1', content: 'Whatever' },
  { id: 2, title: 'Section 2', content: 'Whatever' },
  { id: 3, title: 'Section 3', content: 'Whatever' },
  { id: 4, title: 'Section 4', content: 'Whatever' },
  { id: 5, title: 'Section 5', content: 'Whatever' },
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
    <div className="flanora-v2-container">
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
