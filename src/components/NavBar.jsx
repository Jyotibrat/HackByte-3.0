import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const primaryLinks = [
  { label: "About", to: "/about" },
  { label: "Features", to: "/features" },
  { label: "Showcase", to: "/showcase" },
];

const modelGroups = [
  {
    name: "Flanora-v1",
    sections: [
      { label: "Explore", items: ["Architecture", "Capabilities", "Showcase"] },
      { label: "Use", items: ["Playground", { label: "Google Colab", external: "https://colab.research.google.com/github/Jyotibrat/Flanora-AI/blob/main/Notebooks/Flanora_AI_v1.ipynb" }] },
      { label: "Develop", items: ["Documentation", "Local Development", { label: "Hugging Face", external: "https://huggingface.co/BJyotibrat/Flanora-AI-v1" }] },
    ],
  },
  {
    name: "Flanora-v2",
    sections: [
      { label: "Explore", items: ["Architecture", "Capabilities", "Showcase"] },
      { label: "Use", items: ["Playground", { label: "Google Colab", external: "https://colab.research.google.com/" }] },
      { label: "Develop", items: ["Documentation", "Local Development", { label: "Hugging Face", external: "https://huggingface.co/" }] },
    ],
  },
];

function Chevron() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.1 1.02l-4.25 4.5a.75.75 0 0 1-1.1 0l-4.25-4.5a.75.75 0 0 1 .02-1.04Z" clipRule="evenodd" /></svg>;
}

function ExternalLinkIcon() {
  return <svg className="flanora-external-icon" aria-hidden="true" viewBox="0 0 16 16" fill="none"><path d="M10 0 9 1l2.2929 2.29289-5 5 1.41421 1.41422 5-5L15 7l1-1V0h-6Z" fill="currentColor" /><path d="M1 2h5v2H3v9h9v-3h2v5H1V2Z" fill="currentColor" /></svg>;
}

function ModelMenu() {
  return (
    <div className="flanora-mega-menu flanora-model-menu" id="models-menu">
      {modelGroups.map((group) => (
        <section className="flanora-menu-column" key={group.name}>
          <Link className="flanora-menu-title" to="/models">{group.name}</Link>
          {group.sections.map((section) => (
            <div className="flanora-menu-section" key={section.label}>
              <span className="flanora-eyebrow">{section.label}</span>
              <div className="flanora-menu-links">
                {section.items.map((item) => {
                  const label = typeof item === "string" ? item : item.label;
                  return item.external ? (
                    <a key={label} href={item.external} target="_blank" rel="noreferrer">
                      {label}<ExternalLinkIcon />
                    </a>
                  ) : <Link key={label} to="/models">{label}</Link>;
                })}
              </div>
            </div>
          ))}
        </section>
      ))}
      <section className="flanora-menu-column flanora-coming-soon">
        <span className="flanora-menu-title">Flanora-v3</span>
        <p className="flanora-eyebrow">Coming soon</p>
        <p>The next generation of Flanora AI.</p>
      </section>
    </div>
  );
}

function ResearchMenu() {
  return (
    <div className="flanora-mega-menu flanora-research-menu" id="research-menu">
      <section className="flanora-menu-column">
        <span className="flanora-eyebrow">Explore</span>
        <div className="flanora-menu-links">
          <Link to="/research/publications">Publications</Link>
          <Link to="/research/articles">Articles</Link>
          <Link to="/research/technical-reports">Technical Reports</Link>
        </div>
      </section>
      <section className="flanora-menu-column">
        <span className="flanora-eyebrow">
          <Link to="/research/resources" style={{ color: 'inherit', textDecoration: 'none' }}>Resources</Link>
        </span>
        <div className="flanora-menu-links">
          <Link to="/research/resources/presentations">Presentations</Link>
          <Link to="/research/resources/datasets">Datasets</Link>
        </div>
      </section>
    </div>
  );
}

function Navbar({ variant = "marketing", scrollState }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    if (typeof scrollState === "boolean") {
      setIsScrolled(scrollState);
      return undefined;
    }

    const updateNavbar = () => {
      setIsScrolled(window.scrollY > 28);

      const progress = progressRef.current;
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        progress.style.transform = `scaleX(${ratio})`;
      }
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbar);
  }, [scrollState]);

  const closeWhenLeaving = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
  };

  if (variant === "app") {
    return (
      <header className="flanora-app-navbar">
        <Link to="/" className="flanora-app-wordmark">Flanora</Link>
        <nav aria-label="Application navigation"><Link to="/">Home</Link><Link to="/models">Models</Link></nav>
      </header>
    );
  }

  const menu = openMenu === "models" ? <ModelMenu /> : <ResearchMenu />;
  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <header className={`flanora-navbar ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="flanora-navbar-inner">
        <Link to="/" className="flanora-wordmark" onClick={() => setMobileOpen(false)}><b>Flanora</b> <b>AI</b></Link>
        <nav className="flanora-desktop-nav" aria-label="Primary navigation">
          {primaryLinks.slice(0, 2).map((link) => <Link className={pathname === link.to ? "is-active" : ""} key={link.to} to={link.to}>{link.label}</Link>)}
          {[["models", "Models", "models-menu"], ["research", "Research", "research-menu"]].map(([key, label, menuId]) => (
            <div className="flanora-nav-menu" key={key} onMouseEnter={() => setOpenMenu(key)} onMouseLeave={() => setOpenMenu(null)} onFocus={() => setOpenMenu(key)} onBlur={closeWhenLeaving}>
              <button className={openMenu === key ? "is-active" : ""} type="button" aria-expanded={openMenu === key} aria-controls={menuId} onClick={() => setOpenMenu(openMenu === key ? null : key)} onKeyDown={(event) => event.key === "Escape" && setOpenMenu(null)}>{label}<Chevron /></button>
              {openMenu === key && menu}
            </div>
          ))}
          <Link className={pathname.startsWith("/showcase") ? "is-active" : ""} to="/showcase">Showcase</Link>
        </nav>
        <div className="flanora-navbar-actions"><Link className="flanora-login-link" to="/login">Log in</Link><Link className="flanora-cta" to="/chat">Try Flanora ↗</Link></div>
        <button type="button" className="flanora-mobile-toggle" aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} onClick={() => setMobileOpen(!mobileOpen)}><span /><span /></button>
      </div>
      {mobileOpen && (
        <nav className="flanora-mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {primaryLinks.map((link) => <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>{link.label}</Link>)}
          <details><summary>Models<Chevron /></summary><ModelMenu /></details>
          <details><summary>Research<Chevron /></summary><ResearchMenu /></details>
          <Link to="/login" onClick={() => setMobileOpen(false)}>Log in</Link>
          <Link className="flanora-cta" to="/chat" onClick={() => setMobileOpen(false)}>Try Flanora</Link>
        </nav>
      )}
      </header>
    </>
  );
}

export default Navbar;