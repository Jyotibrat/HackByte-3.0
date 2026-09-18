import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./AboutPage.scss"; // Using AboutPage styles temporarily or creating a generic one

const DocsPage = () => {
  useEffect(() => {
    document.title = "Documentation - Flanora AI";
  }, []);

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Documentation</h1>
          <p className="about-subtitle">
            Comprehensive guides and documentation for Flanora AI models and APIs.
          </p>
          <div className="about-stats">
            <Link to="/" className="flanora-cta">
              Return Home
            </Link>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="story-content">
          <h2>Getting Started</h2>
          <p>
            This section is currently under development. Detailed API references, model architecture guides, and tutorial documentation will be available soon.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DocsPage;
