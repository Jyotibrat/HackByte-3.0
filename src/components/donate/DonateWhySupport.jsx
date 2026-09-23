import React from "react";

export default function DonateWhySupport() {
  return (
    <section className="section" id="why" aria-labelledby="why-title">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <span className="sh-index mono">02</span>
          <span className="sh-label mono" id="why-title">Why support</span>
          <span className="sh-rule"></span>
          <span className="sh-note mono">The case for contributing</span>
        </header>

        <div className="section-grid">
          <aside className="section-side" data-reveal>
            <p className="mono" style={{ color: "var(--accent)" }}>A note on independence</p>
            <p>
              Flanora answers to its users — not to an ad market, and not to a roadmap set elsewhere.
            </p>
          </aside>

          <div>
            <p className="why-statement" data-reveal>
              Flanora isn't carried by advertisers, investors, or a platform it answers to.
              It moves as fast as the people building it can — and as far as the people
              using it are willing to <em>go</em>.
            </p>

            <ul className="why-list" data-reveal-group>
              <li className="why-row">
                <span className="wr-index mono">01</span>
                <h3 className="wr-title">Independent by design</h3>
                <p className="wr-copy">
                  No ad model, no resale of data, no investor-mandated roadmap. Product decisions stay with the people who ship it.
                </p>
              </li>
              <li className="why-row">
                <span className="wr-index mono">02</span>
                <h3 className="wr-title">Development over marketing</h3>
                <p className="wr-copy">
                  Contributions convert directly into engineering and research time — not acquisition spend.
                </p>
              </li>
              <li className="why-row">
                <span className="wr-index mono">03</span>
                <h3 className="wr-title">Compounding output</h3>
                <p className="wr-copy">
                  Sustained support shortens the distance between an idea and a release. Every funded cycle makes the next one faster.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
