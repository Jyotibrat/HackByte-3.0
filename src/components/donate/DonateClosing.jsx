import React from "react";
import { Link } from "react-router-dom";

export default function DonateClosing() {
  const scrollToChannels = (e) => {
    e.preventDefault();
    const channelsEl = document.getElementById("channels");
    if (channelsEl) {
      channelsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section" id="closing" aria-labelledby="closing-title">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <span className="sh-index mono">05</span>
          <span className="sh-label mono" id="closing-title">
            Keep it independent
          </span>
          <span className="sh-rule"></span>
        </header>

        <div>
          <h2 className="closing-title" data-reveal>
            Help build the <em>models</em>, not the ad network.
          </h2>
          <p className="closing-copy" data-reveal>
            Flanora is built for the people who use it. If you rely on it for your
            research, design, or daily work, consider sustaining the infrastructure
            that keeps it online.
          </p>

          <div className="closing-cta" data-reveal>
            <a href="#channels" onClick={scrollToChannels} className="btn btn-solid">
              Support the build<span className="btn-arrow">→</span>
            </a>
            <Link to="/research" className="btn btn-line">
              View research<span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
