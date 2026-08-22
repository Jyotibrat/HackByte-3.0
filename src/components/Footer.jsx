import { Link } from "react-router-dom";

const linkGroups = [
  { title: "Product", links: [["Features", "/features"], ["Models", "/models"], ["Showcase", "/showcase"], ["Try Flanora", "/chat"]] },
  { title: "Research", links: [["Research", "/research"], ["Articles", "/research/articles"], ["Publications", "/research/publications"], ["Technical Reports", "/research/technical-reports"]] },
  { title: "Company", links: [["About", "/about"], ["Team", "/team"]] },
  { title: "Legal", links: [["Terms of Use", "/policies/terms-of-use"], ["Privacy Policy", "/policies/privacy-policy"]] },
];

function Footer() {
  return (
    <footer className="flanora-footer">
      <div className="flanora-footer-glow" aria-hidden="true" />
      <div className="flanora-footer-content">
        <section className="flanora-footer-intro">
          <div>
            <h2>Ready to explore your next space?</h2>
            <p>Turn residential ideas into floor-plan concepts with Flanora AI.</p>
            <div className="flanora-footer-actions">
              <Link className="flanora-footer-secondary-action" to="/models">Explore models</Link>
              <Link className="flanora-footer-primary-action" to="/chat">Try Flanora</Link>
            </div>
          </div>
          <div className="flanora-footer-brand">
            <Link to="/">Flanora AI</Link>
            <div>
              <h3>Built for ideation</h3>
              <p>Generate concepts, compare models, and develop architectural ideas with confidence.</p>
            </div>
          </div>
        </section>

        <section className="flanora-footer-links" aria-label="Footer navigation">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.links.map(([label, to]) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul>
            </div>
          ))}
          <div>
            <h3>Develop</h3>
            <ul>
              <li><a href="https://huggingface.co/collections/BJyotibrat/flanora-ai" target="_blank" rel="noreferrer">Hugging Face <span aria-hidden="true">↗</span></a></li>
              <li><a href="https://colab.research.google.com/" target="_blank" rel="noreferrer">Google Colab <span aria-hidden="true">↗</span></a></li>
            </ul>
          </div>
        </section>

        <div className="flanora-footer-bottom">
          <p>© 2024-{new Date().getFullYear()} Flanora AI. All rights reserved.</p>
        </div>
      </div>
      <div className="flanora-footer-wordmark" aria-hidden="true">FLANORA</div>
    </footer>
  );
}

export default Footer;
