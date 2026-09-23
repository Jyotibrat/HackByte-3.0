import React, { useState } from "react";
import gsap from "gsap";

const SUPPORT_CHANNELS = [
  {
    id: "stripe-one",
    cadence: "one-time",
    label: "One-time contribution",
    desc: "A direct contribution via Stripe to support ongoing development.",
    tag: "Card / Apple Pay",
    href: "https://buy.stripe.com/test_one",
    enabled: true,
  },
  {
    id: "stripe-sub",
    cadence: "recurring",
    label: "Monthly supporter",
    desc: "Sustain Flanora with a recurring monthly contribution.",
    tag: "Subscription",
    href: "https://buy.stripe.com/test_sub",
    enabled: true,
  },
  {
    id: "github",
    cadence: "recurring",
    label: "GitHub Sponsors",
    desc: "Support the open source tools and models through GitHub.",
    tag: "Sponsor",
    href: null,
    enabled: false,
  },
  {
    id: "compute",
    cadence: "other",
    label: "Compute partnership",
    desc: "Provide cloud credits or bare metal instances for model training.",
    tag: "In-kind",
    href: "mailto:flanora@example.com",
    enabled: true,
  },
];

const FILTERS = {
  all: ["one-time", "recurring", "other"],
  "one-time": ["one-time"],
  recurring: ["recurring"],
  other: ["other"],
};

export default function DonateSupportOptions({ setToastMessage }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const labels = {
    all: "Showing all channels",
    "one-time": "Showing one-time channels",
    recurring: "Showing recurring channels",
    other: "Showing partnership & in-kind channels",
  };

  const filteredChannels = SUPPORT_CHANNELS.filter((c) =>
    FILTERS[activeFilter].includes(c.cadence)
  );

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    
    // Refresh ScrollTrigger since layout changes
    if (window.ScrollTrigger) {
      setTimeout(() => {
        window.ScrollTrigger.refresh();
      }, 100);
    }
  };

  const handleAction = (channel) => {
    if (channel.enabled && channel.href) {
      // In a real implementation this would route to the payment processor
      // For now, since the user asked to not implement backend/payment, we use a toast
      // Or we can just use the provided mailto/href if they exist, but for Stripe links,
      // it's safer to just toast since they're test links.
      if (channel.href.startsWith("mailto:")) {
        window.location.href = channel.href;
      } else {
        setToastMessage(`Navigating to payment processor for ${channel.label}... (Placeholder)`);
      }
    } else {
      setToastMessage(
        `“${channel.label}” isn’t connected yet — the team is finalising payment setup. Check back soon.`
      );
    }
  };

  return (
    <section className="section" id="channels" aria-labelledby="channels-title">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <span className="sh-index mono">04</span>
          <span className="sh-label mono" id="channels-title">
            Support options
          </span>
          <span className="sh-rule"></span>
          <span className="sh-note mono">Select a channel</span>
        </header>

        <div className="section-grid">
          <aside className="section-side" data-reveal>
            <div className="filter" role="group" aria-label="Filter channels">
              <button
                type="button"
                data-filter="all"
                aria-pressed={activeFilter === "all"}
                onClick={() => handleFilterClick("all")}
              >
                All
              </button>
              <button
                type="button"
                data-filter="one-time"
                aria-pressed={activeFilter === "one-time"}
                onClick={() => handleFilterClick("one-time")}
              >
                One-time
              </button>
              <button
                type="button"
                data-filter="recurring"
                aria-pressed={activeFilter === "recurring"}
                onClick={() => handleFilterClick("recurring")}
              >
                Recurring
              </button>
              <button
                type="button"
                data-filter="other"
                aria-pressed={activeFilter === "other"}
                onClick={() => handleFilterClick("other")}
              >
                Other
              </button>
            </div>
            <p className="filter-note" id="filter-note" aria-live="polite">
              {labels[activeFilter]}
            </p>
          </aside>

          <div>
            <ul className="ledger" id="ledger">
              {filteredChannels.map((c, i) => (
                <li
                  key={c.id}
                  className="channel"
                  data-cadence={c.cadence}
                  data-reveal={i > 1 ? "true" : undefined}
                >
                  <div className="channel-head">
                    <span className="ch-index">
                      0{SUPPORT_CHANNELS.findIndex((item) => item.id === c.id) + 1}
                    </span>
                    <div className="ch-body">
                      <h3 className="ch-name">{c.label}</h3>
                      <p className="ch-desc">{c.desc}</p>
                    </div>
                    <div className="ch-side">
                      <span className="ch-tag">{c.tag}</span>
                      <button
                        className="btn btn-line ch-action"
                        type="button"
                        onClick={() => handleAction(c)}
                        aria-label={`Contribute via ${c.label}`}
                      >
                        Contribute<span className="btn-arrow">→</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <p className="ledger-foot">
              Processed securely via Stripe. No account required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
