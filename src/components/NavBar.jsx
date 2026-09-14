import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

const primaryLinks = [
  { label: "About", to: "/about" },
  { label: "Features", to: "/features" },
  { label: "Showcase", to: "/showcase" },
];

const modelGroups = [
  {
    name: "Flanora-v1",
    path: "/models/flanora-v1",
    sections: [
      { label: "Explore", items: ["Architecture", "Capabilities", { label: "Showcase", to: "/showcase/flanora-v1" }] },
      { label: "Use", items: ["Playground", { label: "Google Colab", external: "https://colab.research.google.com/github/Jyotibrat/Flanora-AI/blob/main/Notebooks/Flanora_AI_v1.ipynb" }] },
      { label: "Develop", items: ["Documentation", "Local Development", { label: "Hugging Face", external: "https://huggingface.co/BJyotibrat/Flanora-AI-v1" }] },
    ],
  },
  {
    name: "Flanora-v2",
    path: "/models/flanora-v2",
    sections: [
      { label: "Explore", items: ["Architecture", "Capabilities", { label: "Showcase", to: "/showcase/flanora-v2" }] },
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
          <Link className="flanora-menu-title" to={group.path || "/models"}>{group.name}</Link>
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
                  ) : <Link key={label} to={item.to || group.path || "/models"}>{label}</Link>;
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
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const progressRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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
        <div className="flanora-app-navbar-session" aria-label="Session">
          {isAuthenticated ? (
            <>
              <span className="flanora-app-session-email" title={user.email}>{user.email}</span>
              <button type="button" className="flanora-app-logout" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <Link className="flanora-login-link" to="/login">Log in</Link>
          )}
        </div>
      </header>
    );
  }

  const lightThemePaths = ["/about", "/features", "/models", "/showcase/flanora-v1", "/showcase/flanora-v2"];
  const isLightTheme = lightThemePaths.includes(pathname) || pathname.startsWith("/research");
  const menu = openMenu === "models" ? <ModelMenu /> : <ResearchMenu />;

  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <header className={`flanora-navbar ${isScrolled ? "is-scrolled" : ""} ${isLightTheme ? "flanora-navbar-light" : ""}`}>
        <div className="flanora-navbar-inner">
          <Link to="/" className="flanora-wordmark" onClick={() => setMobileOpen(false)}><b>Flanora</b> <b>AI</b></Link>
          <nav className="flanora-desktop-nav" aria-label="Primary navigation">
            {primaryLinks.slice(0, 2).map((link) => <Link className={pathname === link.to ? "is-active" : ""} key={link.to} to={link.to}>{link.label}</Link>)}
            {[["models", "Models", "models-menu"], ["research", "Research", "research-menu"]].map(([key, label, menuId]) => (
              <div className="flanora-nav-menu" key={key} onMouseEnter={() => setOpenMenu(key)} onMouseLeave={() => setOpenMenu(null)} onFocus={() => setOpenMenu(key)} onBlur={closeWhenLeaving}>
                <Link to={`/${key}`} className={openMenu === key ? "is-active" : ""} aria-expanded={openMenu === key} aria-controls={menuId} onKeyDown={(event) => event.key === "Escape" && setOpenMenu(null)}>{label}<Chevron /></Link>
                {openMenu === key && menu}
              </div>
            ))}
            <Link className={pathname.startsWith("/showcase") ? "is-active" : ""} to="/showcase">Showcase</Link>
          </nav>
          <div className="flanora-navbar-actions">
            {!isAuthenticated && (
              <Link className="flanora-login-link" to="/login">Log in</Link>
            )}
            <Link className="flanora-cta" to="/chat">Try Flanora ↗</Link>
            {isAuthenticated && (
              <div
                className="flanora-nav-profile-container"
                onMouseEnter={() => setOpenMenu("profile")}
                onMouseLeave={() => setOpenMenu(null)}
                onFocus={() => setOpenMenu("profile")}
                onBlur={closeWhenLeaving}
              >
                <button
                  type="button"
                  className={`flanora-nav-avatar ${openMenu === "profile" ? "is-active" : ""}`}
                  aria-label="Your profile"
                  aria-expanded={openMenu === "profile"}
                  aria-controls="profile-menu"
                  title={`${user?.first_name ?? "Profile"}`}
                >
                  {user?.picture ? (
                    <img src={user.picture} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} referrerPolicy="no-referrer" />
                  ) : (
                    [user?.first_name?.[0], user?.last_name?.[0]].filter(Boolean).join("").toUpperCase() || "?"
                  )}
                </button>
                
                {openMenu === "profile" && (
                  <div className="flanora-profile-dropdown" id="profile-menu">
                    <div className="flanora-profile-header">
                      <span className="flanora-profile-name">{user?.first_name} {user?.last_name}</span>
                      <span className="flanora-profile-email">{user?.email}</span>
                    </div>
                    <div className="flanora-profile-actions">
                      <Link to="/profile" onClick={() => setOpenMenu(null)}>Profile</Link>
                      <button type="button" onClick={handleLogout}>Log out</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <button type="button" className="flanora-mobile-toggle" aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} onClick={() => setMobileOpen(!mobileOpen)}><span /><span /></button>
        </div>
        {mobileOpen && (
          <nav className="flanora-mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
            {primaryLinks.map((link) => <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>{link.label}</Link>)}
            <details><summary>Models<Chevron /></summary><ModelMenu /></details>
            <details><summary>Research<Chevron /></summary><ResearchMenu /></details>
            {isAuthenticated ? (
              <Link to="/profile" onClick={() => setMobileOpen(false)}>My Profile</Link>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>Log in</Link>
            )}
            <Link className="flanora-cta" to="/chat" onClick={() => setMobileOpen(false)}>Try Flanora</Link>
          </nav>
        )}
      </header>
    </>
  );
}

export default Navbar;