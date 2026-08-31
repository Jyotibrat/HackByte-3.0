import { Link } from "react-router-dom";

function AboutFooterCTA() {
  return (
    <section className="about-footer">
      <div className="about-footer-content">
        <h2>The next plan starts here</h2>
        <Link to="/chat" className="btn-solid">
          Start Generating Plans
        </Link>
      </div>
    </section>
  );
}
export default AboutFooterCTA;
