import { Link } from "react-router-dom";

function AboutResearchPeople() {
  return (
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
      </div>
    </section>
  );
}
export default AboutResearchPeople;
