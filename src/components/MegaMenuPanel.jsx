import { Link } from "react-router-dom";

// ---------------------------------------------------------------------------
// Icon helpers
// ---------------------------------------------------------------------------

function ExternalLinkIcon() {
  return (
    <svg
      className="mega-external-icon"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M10 0 9 1l2.293 2.293-5 5 1.414 1.414 5-5L15 7l1-1V0h-6Z"
        fill="currentColor"
      />
      <path d="M1 2h5v2H3v9h9v-3h2v5H1V2Z" fill="currentColor" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// CtaButton — renders an EXPLORE button; handles internal, external, disabled
// ---------------------------------------------------------------------------
function CtaButton({ cta, onClose }) {
  if (!cta) return null;

  if (cta.disabled) {
    return (
      <span className="mega-explore-btn mega-explore-btn--disabled" aria-disabled="true">
        {cta.label}
      </span>
    );
  }

  if (cta.external) {
    return (
      <a
        href={cta.href}
        className="mega-explore-btn mega-explore-btn--external"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
      >
        {cta.label}
      </a>
    );
  }

  return (
    <Link className="mega-explore-btn" to={cta.to} onClick={onClose}>
      {cta.label}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// MegaMenuPanel
//
// menuConfig shape:
// {
//   id: string,
//   col1: { heading, description, cta },
//   col2: [{ label, to?, href?, external?, disabled? }],
//   col3: { heading, description, cta },
// }
// ---------------------------------------------------------------------------
function MegaMenuPanel({ menuConfig, onClose, triggerId }) {
  const { id, col1, col2, col3 } = menuConfig;

  return (
    <div
      id={id}
      className="mega-panel"
      role="region"
      aria-labelledby={triggerId}
    >
      <div className="mega-panel__inner">

        {/* ── Column 1 ──────────────────────────────── */}
        <div className="mega-panel__col mega-panel__col--left">
          <p className="mega-col-heading">{col1.heading}</p>
          <p className="mega-col-desc">{col1.description}</p>
          <CtaButton cta={col1.cta} onClose={onClose} />
        </div>

        {/* ── Column 2: numbered list ────────────────── */}
        <div className="mega-panel__col mega-panel__col--mid" role="list">
          {col2.map((item, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            const itemContent = (
              <>
                <span className="mega-item-num" aria-hidden="true">{num}</span>
                <span className="mega-item-label">{item.label}</span>
                {item.external && <ExternalLinkIcon />}
              </>
            );

            if (item.disabled) {
              return (
                <div
                  key={item.label}
                  className="mega-item mega-item--disabled"
                  role="listitem"
                  aria-label={`${item.label} (coming soon)`}
                >
                  {itemContent}
                </div>
              );
            }

            if (item.external) {
              return (
                <a
                  key={item.label}
                  className="mega-item"
                  role="listitem"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  {itemContent}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                className="mega-item"
                role="listitem"
                to={item.to}
                onClick={onClose}
              >
                {itemContent}
              </Link>
            );
          })}
        </div>

        {/* ── Column 3: featured ────────────────────── */}
        <div className="mega-panel__col mega-panel__col--right">
          <p className="mega-col-heading mega-col-heading--featured">{col3.heading}</p>
          <p className="mega-col-desc">{col3.description}</p>
          <CtaButton cta={col3.cta} onClose={onClose} />
        </div>

      </div>
    </div>
  );
}

export default MegaMenuPanel;
