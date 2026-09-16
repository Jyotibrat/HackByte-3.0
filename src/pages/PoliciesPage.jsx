import { useParams, Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, ChevronRight } from "lucide-react";
import privacyPolicyMarkup from "../content/privacy-policy.html?raw";
import termsOfUseMarkup from "../content/terms-of-use.html?raw";

const titles = {
  "terms-of-use": "Terms of Use",
  "privacy-policy": "Privacy Policy",
};

import "./ResearchPage.css";

function PoliciesPage() {
  const { policy } = useParams();
  const title = titles[policy] ?? "Policies";

  if (policy === "privacy-policy" || policy === "terms-of-use") {
    const markup = policy === "privacy-policy" ? privacyPolicyMarkup : termsOfUseMarkup;
    return (
      <div className="flanora-research-page blueprint-bg min-h-screen flex flex-col pb-[150px]">
        <section className="flanora-policy-page">
          <article className="flanora-policy-content" dangerouslySetInnerHTML={{ __html: markup }} />
        </section>
      </div>
    );
  }

  return (
    <div className="flanora-research-page blueprint-bg min-h-screen flex flex-col pb-[150px]">
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-page py-16 md:py-24">
      <section className="max-w-4xl mx-auto mb-16 md:mb-20">
        <div className="flex items-center justify-between border-b border-hairline-border pb-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-label-caps text-label-caps text-ink-text tracking-widest">
              LEGAL &amp; COMPLIANCE // 01
            </span>
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="font-headline-lg text-headline-lg md:font-display-xl md:text-display-xl text-ink-text tracking-tight">
            Policies
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
            These policies outline our foundational commitments to data integrity, computational privacy, and the responsible governance of generative architectural intelligence across Flanora AI services.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <Link className="group group/btn relative block bg-surface-container-lowest border border-hairline-border p-8 md:p-10 transition-all duration-200 hover:border-ink-text hover:bg-paper-bg flex flex-col justify-between min-h-[380px]" to="/policies/privacy-policy">
            <div>
              <div className="flex justify-between items-start mb-10 pb-4 border-b border-hairline-border">
                <span className="font-label-caps text-label-caps text-on-surface-variant group-hover:text-primary transition-colors duration-150">
                  DATA INTEGRITY &amp; ARCHITECTURAL INTELLECT
                </span>
                <span className="font-caption text-caption text-outline">
                  01
                </span>
              </div>
              <div className="space-y-4 mb-8">
                <h2 className="font-headline-md text-headline-md text-ink-text group-hover:text-secondary transition-colors duration-150">
                  Privacy Policy
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  How Flanora AI collects, secures, and handles prompt inputs, spatial schematics, and project telemetry with uncompromising privacy standards.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-hairline-border flex items-center justify-between mt-auto">
              <span className="font-label-caps text-label-caps text-outline group-hover:text-ink-text transition-colors duration-150">
                UPDATED AUGUST 2026
              </span>
              <div
                className="inline-flex items-center gap-2 font-label-caps text-label-caps tracking-widest transition-colors text-primary group-hover/btn:text-secondary"
                style={{
                  '--default-color': '#000',
                  '--hover-color': '#085ac0',
                  '--default-border': '#000',
                  '--hover-border': '#085ac0',
                }}
              >
                <span className="btn-text-reveal btn-border-reveal pb-0.5 relative">EXPLORE</span>
                <svg
                  className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200 group-hover/btn:delay-300"
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>
            </div>
          </Link>

          <Link className="group group/btn relative block bg-surface-container-lowest border border-hairline-border p-8 md:p-10 transition-all duration-200 hover:border-ink-text hover:bg-paper-bg flex flex-col justify-between min-h-[380px]" to="/policies/terms-of-use">
            <div>
              <div className="flex justify-between items-start mb-10 pb-4 border-b border-hairline-border">
                <span className="font-label-caps text-label-caps text-on-surface-variant group-hover:text-primary transition-colors duration-150">
                  SERVICE GOVERNANCE &amp; MODEL LICENSING
                </span>
                <span className="font-caption text-caption text-outline">
                  02
                </span>
              </div>
              <div className="space-y-4 mb-8">
                <h2 className="font-headline-md text-headline-md text-ink-text group-hover:text-secondary transition-colors duration-150">
                  Terms of Use
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Rules, rights, computational quotas, and intellectual property ownership governing the use of Flanora AI's generative models and platform APIs.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-hairline-border flex items-center justify-between mt-auto">
              <span className="font-label-caps text-label-caps text-outline group-hover:text-ink-text transition-colors duration-150">
                UPDATED AUGUST 2026
              </span>
              <div
                className="inline-flex items-center gap-2 font-label-caps text-label-caps tracking-widest transition-colors text-primary group-hover/btn:text-secondary"
                style={{
                  '--default-color': '#000',
                  '--hover-color': '#085ac0',
                  '--default-border': '#000',
                  '--hover-border': '#085ac0',
                }}
              >
                <span className="btn-text-reveal btn-border-reveal pb-0.5 relative">EXPLORE</span>
                <svg
                  className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200 group-hover/btn:delay-300"
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 p-6 border border-hairline-border bg-paper-bg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-outline shrink-0" />
            <p className="font-caption text-caption text-on-surface-variant">
              All synthesis nodes operate under ISO/IEC 27001 computational security environments. Custom enterprise compliance frameworks are available via dedicated lab tenants.
            </p>
          </div>
          <Link
            className="group/btn inline-flex items-center gap-2 font-label-caps text-label-caps tracking-widest transition-colors text-primary hover:text-secondary"
            to="/contact"
            style={{
              '--default-color': '#000',
              '--hover-color': '#085ac0',
              '--default-border': '#000',
              '--hover-border': '#085ac0',
            }}
          >
            <span className="btn-text-reveal btn-border-reveal pb-0.5 relative">COMPLIANCE INQUIRY</span>
            <svg
              className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200 group-hover/btn:delay-300"
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
    </div>
  );
}

export default PoliciesPage;
