import React from "react";

export default function DonateAllocations() {
  return (
    <section className="section" id="allocation" aria-labelledby="alloc-title">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <span className="sh-index mono">03</span>
          <span className="sh-label mono" id="alloc-title">Where contributions go</span>
          <span className="sh-rule"></span>
          <span className="sh-note mono">Five areas of investment</span>
        </header>

        <div className="alloc-wrap">
          <span className="alloc-rail" aria-hidden="true">
            <span className="rail-fill"></span>
          </span>

          <ol className="alloc-list" data-reveal-group>
            <li className="alloc-row">
              <span className="ar-index">01</span>
              <div className="ar-main">
                <h3 className="ar-title">AI inference &amp; infrastructure</h3>
                <p className="ar-copy">
                  Compute for every request — serving models, keeping latency low, and scaling capacity as usage grows.
                </p>
              </div>
              <span className="ar-tag">Infrastructure</span>
            </li>
            <li className="alloc-row">
              <span className="ar-index">02</span>
              <div className="ar-main">
                <h3 className="ar-title">Model development &amp; experimentation</h3>
                <p className="ar-copy">
                  Training runs, evaluations, and the experiments that move Flanora's models forward.
                </p>
              </div>
              <span className="ar-tag">Models</span>
            </li>
            <li className="alloc-row">
              <span className="ar-index">03</span>
              <div className="ar-main">
                <h3 className="ar-title">Datasets &amp; alignment research</h3>
                <p className="ar-copy">
                  Building the high-quality, architecturally-focused datasets required to train capable design agents.
                </p>
              </div>
              <span className="ar-tag">Data</span>
            </li>
            <li className="alloc-row">
              <span className="ar-index">04</span>
              <div className="ar-main">
                <h3 className="ar-title">Hosting &amp; product bandwidth</h3>
                <p className="ar-copy">
                  The foundational costs of keeping Flanora online and fast — servers, databases, and network ingress.
                </p>
              </div>
              <span className="ar-tag">Core</span>
            </li>
            <li className="alloc-row">
              <span className="ar-index">05</span>
              <div className="ar-main">
                <h3 className="ar-title">Future releases</h3>
                <p className="ar-copy">
                  Unlocking the next phases of development, expanding from text and analysis into spatial generation.
                </p>
              </div>
              <span className="ar-tag">R&amp;D</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
