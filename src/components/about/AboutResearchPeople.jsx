import { Link } from "react-router-dom";

function AboutResearchPeople() {
  return (
    <section className="research-people">
      <div>
        <h2 className="rp-title">Research</h2>
        
        <div className="paper-item">
          <div className="paper-icon"></div>
          <div className="paper-info">
            <h4>A State-of-Art Survey on Generative AI Techniques for Floor Planning</h4>
            <p>Exploring generative AI approaches for intelligent floor-plan generation.</p>
          </div>
        </div>
        <div className="paper-item">
          <div className="paper-icon"></div>
          <div className="paper-info">
            <h4>Floor Planning Using Generative Artificial Intelligence Project Report</h4>
            <p>Documenting the development and evaluation of Flanora AI.</p>
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
            <img src="/profilePhotos/bindupautra.jpg" alt="Bindupautra Jyotibrat" />
            <h4>Bindupautra Jyotibrat</h4>
            <p>Founder & Lead Researcher</p>
          </div>
          <div className="person">
            <img src="/profilePhotos/rana-talukdar.jpg" alt="Rana Talukdar" />
            <h4>Rana Talukdar</h4>
            <p>Head of AI Strategy</p>
          </div>
          <div className="person">
            <img src="/profilePhotos/ansh.jpeg" alt="Ansh Gaur" />
            <h4>Ansh Gaur</h4>
            <p>Architecture Design Lead</p>
          </div>
        </div>

        <Link to="/team" className="btn-outline">
          Meet the Team ↗
        </Link>
      </div>
    </section>
  );
}
export default AboutResearchPeople;
