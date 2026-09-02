import React from 'react';

function FeaturesExploration() {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-page bg-paper-bg">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-inner-gap items-center">
        <div className="order-2 lg:order-1 fade-in-up">
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline-border shadow-sm mix-blend-multiply">
            <img alt="Floor plan variations" className="w-full h-auto rounded-lg mix-blend-multiply object-cover" data-alt="A clean, technical four-panel grid showing different architectural floor plan variations derived from the same initial prompt." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC50kJpNnei55Lv7B-wX7TCAeS0vCEbgHkEWIr0wbiMMBAhlLP0Igwzuz3qsWIg2Oeqn3nUZ7OG9rhjeKtrTNF1hk5farlhh_3oaOfiJCNgjijbYuJlhUicMOkVkq8MdFLlhSgGVrHvNeHKiXRNeITt9enDqGv1pn95MgtDXZbe4kGt70rBHa3LIsbsG_zuofuPdlWl0YzuMy6-DsFe_UuTEQUVLeQ2OxazSaKX2yvpcNv5yxudgJZD"/>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:pl-12 fade-in-up stagger-1">
          <h2 className="font-headline-lg text-headline-lg text-ink-text mb-6">Explore <br/>Possibilities.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8" style={{ fontFamily: "'Martel Sans', sans-serif" }}>
            Architecture is iterative. Generate up to 4 distinct conceptual directions per prompt, allowing for rapid exploration of spatial typologies and structural arrangements before committing to a final path.
          </p>
          <ul className="space-y-4 font-body-md text-body-md text-ink-text border-t border-hairline-border pt-8">
            <li className="flex items-start gap-4">
              <span className="material-symbols-outlined text-outline mt-1" data-icon="layers">layers</span>
              <span>Simultaneous multi-concept generation.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="material-symbols-outlined text-outline mt-1" data-icon="tune">tune</span>
              <span>Parameter-driven variation control.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default FeaturesExploration;
