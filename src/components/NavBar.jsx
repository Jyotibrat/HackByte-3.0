import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import MegaMenuPanel from "./MegaMenuPanel";

// =============================================================================
// Menu data — single source of truth for both MODELS and RESEARCH panels
// =============================================================================

const MENU_CONFIGS = {
  models: {
    id: "models-mega-panel",
    col1: {
      heading: "OUR MODELS",
      description:
        "The Flanora model family converts natural language descriptions into detailed residential floor plans. Each generation raises the bar on accuracy, layout coherence, and architectural realism—making professional-grade design accessible to everyone.",
      cta: { label: "EXPLORE", to: "/models" },
    },
    col2: [
      { label: "FLANORA-V1", to: "/models/flanora-v1" },
      { label: "FLANORA-V2", to: "/models/flanora-v2" },
    ],
    col3: {
      heading: "FLANORA-V3 IN DEVELOPMENT",
      description:
        "The next generation of Flanora is being built for greater precision and multi-room reasoning. Coming soon.",
      cta: null,
    },
  },
  research: {
    id: "research-mega-panel",
    col1: {
      heading: "RESEARCH",
      description:
        "We publish our methods, benchmarks, and evaluation datasets openly. Our work spans text-to-layout generation, spatial reasoning, and architectural metric design—grounded in reproducible experiments and peer review.",
      cta: { label: "EXPLORE", to: "/research" },
    },
    col2: [
      { label: "PUBLICATIONS", to: "/research/publications" },
      { label: "ARTICLES", to: "/research/articles" },
      { label: "TECHNICAL REPORTS", to: "/research/technical-reports" },
      { label: "RESOURCES", to: "/research/resources" },
    ],
    col3: {
      heading: "OPEN MODELS AND DATASETS",
      description:
        "Model weights and training datasets for Flanora-v1 are publicly available. Explore, fine-tune, and build on our open releases.",
      cta: {
        label: "EXPLORE",
        to: "/docs",
      },
    },
  },
};

const primaryLinks = [
  { label: "About", to: "/about" },
  { label: "Features", to: "/features" },
  { label: "Showcase", to: "/showcase" },
];

// =============================================================================
// Small helpers
// =============================================================================

function Chevron({ open }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 20 20"
      fill="currentColor"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 220ms ease" }}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.1 1.02l-4.25 4.5a.75.75 0 0 1-1.1 0l-4.25-4.5a.75.75 0 0 1 .02-1.04Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Mobile accordion for a single menu key
function MobileMenuSection({ label, menuKey, onLinkClick }) {
  const config = MENU_CONFIGS[menuKey];
  return (
    <details className="mega-mobile-details">
      <summary className="mega-mobile-summary">
        {label}
        <Chevron />
      </summary>
      <div className="mega-mobile-body">
        <p className="mega-mobile-heading">{config.col1.heading}</p>
        <p className="mega-mobile-desc">{config.col1.description}</p>
        {config.col1.cta && !config.col1.cta.disabled && (
          <Link className="mega-mobile-explore" to={config.col1.cta.to} onClick={onLinkClick}>
            {config.col1.cta.label}
          </Link>
        )}
        <div className="mega-mobile-list" role="list">
          {config.col2.map((item) => {
            if (item.disabled) {
              return (
                <div key={item.label} className="mega-mobile-item mega-mobile-item--disabled" role="listitem">
                  {item.label}
                </div>
              );
            }
            if (item.external) {
              return (
                <a key={item.label} className="mega-mobile-item" role="listitem" href={item.href} target="_blank" rel="noopener noreferrer" onClick={onLinkClick}>
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.label} className="mega-mobile-item" role="listitem" to={item.to} onClick={onLinkClick}>
                {item.label}
              </Link>
            );
          })}
        </div>
        {config.col3.cta && !config.col3.cta.disabled && (
          config.col3.cta.external ? (
            <a className="mega-mobile-explore" href={config.col3.cta.href} target="_blank" rel="noopener noreferrer" onClick={onLinkClick}>
              {config.col3.heading}: {config.col3.cta.label} ↗
            </a>
          ) : (
            <Link className="mega-mobile-explore" to={config.col3.cta.to} onClick={onLinkClick}>
              {config.col3.heading}: {config.col3.cta.label}
            </Link>
          )
        )}
      </div>
    </details>
  );
}

// =============================================================================
// Navbar
// =============================================================================

function Navbar({ variant = "marketing", scrollState }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);       // "models" | "research" | "profile" | null
  const [isScrolled, setIsScrolled] = useState(false);

  const progressRef = useRef(null);
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  // Trigger refs for returning focus on Escape
  const modelsTriggerRef = useRef(null);
  const researchTriggerRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Scroll listener + progress bar
  useEffect(() => {
    if (typeof scrollState === "boolean") {
      setIsScrolled(scrollState);
      return undefined;
    }
    const update = () => {
      setIsScrolled(window.scrollY > 28);
      const el = progressRef.current;
      if (el) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        el.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [scrollState, pathname]);

  // Close mega panel on route change
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Escape key global handler
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && openMenu && openMenu !== "profile") {
        setOpenMenu(null);
        // Return focus to the trigger that opened the panel
        if (openMenu === "models") modelsTriggerRef.current?.focus();
        if (openMenu === "research") researchTriggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu]);

  // Click-outside to close
  useEffect(() => {
    if (!openMenu || openMenu === "profile") return;
    const onClickOutside = (e) => {
      if (!e.target.closest(".flanora-navbar")) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [openMenu]);

  // ── Hover open/close with delays ──────────────────────────────────────────
  const scheduleOpen = useCallback((key) => {
    clearTimeout(closeTimerRef.current);
    openTimerRef.current = setTimeout(() => setOpenMenu(key), 100);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu((prev) => (prev !== "profile" ? null : prev));
    }, 200);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimerRef.current);
  }, []);

  const closeWhenLeaving = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setOpenMenu(null);
  };

  // ── Derived state ──────────────────────────────────────────────────────────
  const lightThemePaths = ["/about", "/features", "/models", "/models/flanora-v2", "/showcase/flanora-v1", "/showcase/flanora-v2", "/team"];
  const isLightTheme = lightThemePaths.includes(pathname) || pathname.startsWith("/research") || pathname.startsWith("/policies");

  const allowedScrollProgressPaths = [
    "/", "/about", "/features", "/models", "/models/flanora-v2",
    "/research", "/showcase", "/research/publications/survey-paper-2025",
  ];
  const showScrollProgress = allowedScrollProgressPaths.includes(pathname) || pathname.startsWith("/policies");

  const hasMegaPanel = openMenu === "models" || openMenu === "research";

  // ── App variant ────────────────────────────────────────────────────────────
  if (variant === "app") {
    return (
      <header className="flanora-app-navbar">
        <Link to="/" className="flanora-app-wordmark">Flanora</Link>
        <nav aria-label="Application navigation">
          <Link to="/">Home</Link>
          <Link to="/models">Models</Link>
        </nav>
        <div className="flanora-app-navbar-session" aria-label="Session">
          {isAuthenticated && (
            <>
              <span className="flanora-app-session-email" title={user.email}>{user.email}</span>
              <button type="button" className="flanora-app-logout" onClick={handleLogout}>Log out</button>
            </>
          )}
        </div>
      </header>
    );
  }

  // ── Desktop trigger helper ─────────────────────────────────────────────────
  const makeTrigger = (key, label, ref) => (
    <div
      className="flanora-nav-menu"
      onMouseEnter={() => scheduleOpen(key)}
    >
      <button
        ref={ref}
        type="button"
        id={`${key}-trigger`}
        className={openMenu === key ? "is-active" : ""}
        aria-haspopup="true"
        aria-expanded={openMenu === key}
        aria-controls={MENU_CONFIGS[key].id}
        onClick={() => setOpenMenu(openMenu === key ? null : key)}
        onKeyDown={(e) => e.key === "Escape" && setOpenMenu(null)}
      >
        {label}
        <Chevron open={openMenu === key} />
      </button>
    </div>
  );

  return (
    <>
      {showScrollProgress && <div ref={progressRef} className="scroll-progress" aria-hidden="true" />}

      {/* Dim overlay behind the panel */}
      {hasMegaPanel && (
        <div
          className="mega-panel-overlay"
          aria-hidden="true"
          onClick={() => setOpenMenu(null)}
        />
      )}

      <header
        className={`flanora-navbar${isScrolled ? " is-scrolled" : ""}${isLightTheme ? " flanora-navbar-light" : ""}${hasMegaPanel ? " mega-panel-open" : ""}`}
        onMouseLeave={scheduleClose}
      >
        <div className="flanora-navbar-inner">
          {/* Wordmark */}
          <Link to="/" className="flanora-wordmark" onClick={() => setMobileOpen(false)}>
            <b>Flanora</b> <b>AI</b>
          </Link>

          {/* Desktop nav */}
          <nav className="flanora-desktop-nav" aria-label="Primary navigation">
            {primaryLinks.slice(0, 2).map((link) => (
              <Link
                key={link.to}
                className={pathname === link.to ? "is-active" : ""}
                to={link.to}
              >
                {link.label}
              </Link>
            ))}
            {makeTrigger("models", "Models", modelsTriggerRef)}
            {makeTrigger("research", "Research", researchTriggerRef)}
            <Link className={pathname.startsWith("/showcase") ? "is-active" : ""} to="/showcase">
              Showcase
            </Link>
          </nav>

          {/* Actions */}
          <div className="flanora-navbar-actions">
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
                  className={`flanora-nav-avatar${openMenu === "profile" ? " is-active" : ""}`}
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

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flanora-mobile-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span />
            <span />
          </button>
        </div>

        {/* ── Mega panel — rendered inside <header> as fixed panel ── */}
        {hasMegaPanel && (
          <MegaMenuPanel
            menuConfig={MENU_CONFIGS[openMenu]}
            onClose={() => setOpenMenu(null)}
            triggerId={`${openMenu}-trigger`}
          />
        )}

        {/* ── Mobile nav ── */}
        {mobileOpen && (
          <nav className="flanora-mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
            {primaryLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <MobileMenuSection label="Models" menuKey="models" onLinkClick={() => setMobileOpen(false)} />
            <MobileMenuSection label="Research" menuKey="research" onLinkClick={() => setMobileOpen(false)} />
            {isAuthenticated && (
              <Link to="/profile" onClick={() => setMobileOpen(false)}>My Profile</Link>
            )}
            <Link className="flanora-cta" to="/chat" onClick={() => setMobileOpen(false)}>Try Flanora</Link>
          </nav>
        )}
      </header>
    </>
  );
}

export default Navbar;
