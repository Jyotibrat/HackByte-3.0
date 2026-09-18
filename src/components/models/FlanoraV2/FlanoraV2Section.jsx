import React from 'react';

const FlanoraV2Section = ({
  index,
  title,
  content,
  bgImage,
  frontImage,
  isActive,
  onClick,
  onClose,
}) => {
  return (
    <div className={`el ${isActive ? 's--active' : ''}`} onClick={onClick}>
      <div className="el__overflow">
        <div className="el__inner">
          <div className="el__bg">
            <div className="el__bg-image-back" style={{ backgroundImage: `url(${bgImage})` }}></div>
            <div className="el__bg-image-front">
              <img src={frontImage} alt="front" />
            </div>
          </div>
          <div className="el__preview-cont">
            <h2 className="el__heading">{title}</h2>
          </div>
          <div className="el__content">
            <div className="el__text">{content}</div>
            <div
              className="el__close-btn"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="el__index">
        <div className="el__index-back">{index}</div>
        <div className="el__index-front">
          <div className="el__index-overlay" data-index={index}>
            {index}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlanoraV2Section;
