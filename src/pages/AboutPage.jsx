import { Link } from "react-router-dom";
import "./AboutPage.css";

const faqs = [
  {
    question: "How does Flanora ensure structural integrity?",
    answer: "Flanora focuses on conceptual architectural design. All generated plans must be reviewed and detailed by licensed professionals before construction.",
  },
  {
    question: "Can I use Flanora for commercial projects?",
    answer: "Yes, Flanora can be used to ideate and conceptualize commercial spatial layouts.",
  },
  {
    question: "What data is Flanora trained on?",
    answer: "Flanora is trained on a proprietary dataset of diverse floor plans, emphasizing spatial logic and layout efficiency.",
  },
];

function AboutPage() {
  return (
    <div className="about-page-wrapper">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>Flanora explores where artificial intelligence meets architectural thinking</h1>
        <div className="about-hero-graphic">
          <img 
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d1d195f0-17d7-4654-a1fc-c9e3192705c4_800w.webp" 
            alt="Abstract architectural lines with glowing AI core" 
            style={{ borderRadius: '12px', filter: 'hue-rotate(180deg) grayscale(0.5)' }}
          />
        </div>
        <p className="about-hero-subtext">An architectural AI research project.</p>
      </section>

      {/* Why Flanora Section */}
      <section className="why-flanora">
        <h2 className="why-flanora-title">Why Flanora</h2>
        <div className="why-grid">
          <div className="why-item">
            <h3>Ideation</h3>
            <p>
              Flanora begins with exploration, turning abstract thoughts and
              rough sketches into diverse conceptual possibilities. It
              bridges the gap between inspiration and the first form.
            </p>
          </div>
          <div className="why-item">
            <h3>Professional Planning</h3>
            <p>
              Going beyond concepts, Flanora refines and details, generating
              precise, buildable architectural plans with professional
              constraints and regulations in mind.
            </p>
          </div>
        </div>
      </section>

      {/* Language to Layout Section */}
      <section className="language-layout">
        <h2 className="language-layout-title">Language to Layout</h2>
        <div className="flow-container">
          <div className="flow-step">
            <div className="flow-input">
              A sunny villa with a central courtyard and two bedrooms
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-core">
              Flanora<br />Core
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-output">
              <img 
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/variants/df48517c-b34b-4aa2-b653-96984538305d/3840w.jpg" 
                alt="Generated floor plan layout" 
                style={{ filter: 'grayscale(1)', opacity: 0.8 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Model Family Section */}
      <section className="model-family">
        <h2 className="model-family-title">Model Family</h2>
        <div className="model-showcase">
          <div className="model-card left">
            <img 
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80" 
              alt="Flanora v1 Concept" 
            />
            <div className="model-card-label">Flanora v1: Concept</div>
          </div>
          <div className="model-card center">
            <img 
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/611c8074-3c56-4810-a604-812a2791a1f9_800w.webp" 
              alt="Flanora v2 Precision" 
            />
            <div className="model-card-label" style={{ fontSize: '1.3rem', padding: '20px' }}>Flanora v2: Precision</div>
          </div>
          <div className="model-card right">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" 
              alt="Flanora v3 In Development" 
            />
            <div className="model-card-glass">Coming soon</div>
            <div className="model-card-label">Flanora v3: In Development</div>
          </div>
        </div>
      </section>

      {/* Research & People Section */}
      <section className="research-people">
        <div>
          <h2 className="rp-title">Research</h2>
          
          <div className="paper-item">
            <div className="paper-icon"></div>
            <div className="paper-info">
              <h4>Generative AI for Sustainable Architecture</h4>
              <p>Exploring energy-efficient designs using deep learning.</p>
            </div>
          </div>
          
          <div className="paper-item">
            <div className="paper-icon"></div>
            <div className="paper-info">
              <h4>Plan Synthesis from Natural Language Requests</h4>
              <p>Bridging the gap between human intent and spatial configurations.</p>
            </div>
          </div>

          <Link to="/research" className="btn-outline">
            Explore Research ↗
          </Link>
        </div>

        <div>
          <h2 className="rp-title">People</h2>
          
          <div className="people-grid">
            <div className="person">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" alt="Dr. Aris Thorne" />
              <h4>Dr. Aris Thorne</h4>
              <p>Founder & Lead Researcher</p>
            </div>
            <div className="person">
              <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=200&q=80" alt="Elara Vance" />
              <h4>Elara Vance</h4>
              <p>Head of AI Strategy</p>
            </div>
            <div className="person">
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80" alt="Kaelen Reed" />
              <h4>Kaelen Reed</h4>
              <p>Architecture Design Lead</p>
            </div>
          </div>

          <div className="about-faq">
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>FAQ</h3>
            {faqs.map((faq, index) => (
              <details className="faq-item" key={index}>
                <summary className="faq-summary">
                  <span>{faq.question}</span>
                  <span className="faq-icon">+</span>
                </summary>
                <div className="faq-content">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="about-footer">
        <div className="about-footer-content">
          <h2>The next plan starts here</h2>
          <Link to="/chat" className="btn-solid">
            Start Generating Plans
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
