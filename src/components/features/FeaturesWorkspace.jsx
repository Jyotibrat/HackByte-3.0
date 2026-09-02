import React from 'react';

function FeaturesWorkspace() {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-page bg-paper-bg overflow-hidden relative">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16 md:mb-24 fade-in-up">
          <h2 className="font-headline-lg text-headline-lg text-ink-text mb-6">The Workspace.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto" style={{ fontFamily: "'Martel Sans', sans-serif" }}>
            A seamless interface where conversation dictates form. Iterate on designs through natural dialogue, keeping a complete history of your architectural evolution.
          </p>
        </div>
        <div className="relative fade-in-up stagger-1 mx-auto max-w-5xl">
          <div className="bg-surface-container-lowest p-2 rounded-xl border border-hairline-border shadow-lg">
            <img alt="Flanora Workspace UI" className="w-full h-auto rounded-lg object-cover border border-hairline-border" data-alt="A screenshot of the Flanora AI web interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGP9XbJs_I3cFP23RU7CmxGKnLwpLXEIa8oyBfi8Quz4i6uWEtilOiVXEgyQVbGlF8fY70qh-bwBVbF4M9NuiD_tfkWWO22zI7yV0LUFhWwi-WieNx_zwWSVW-I7rWSpUWtYqHXXmdaSEV-dLhtzqbG5JErcW_K7-ekBO_gwBcpEzfEZyVyT1LFdSWc3ewKa2qTNJRtGk2rGiYt3qDthowjHI5nsq6wSnHdC-NimkfJ4DuRTqFlZDc"/>
          </div>
          <div className="absolute -right-8 top-1/4 p-4 bg-surface-container-lowest border border-hairline-border shadow-md rounded-lg hidden lg:block fade-in-up stagger-2">
            <span className="font-label-caps text-label-caps text-outline block mb-2">Active Parameter</span>
            <div className="flex items-center gap-2 font-body-md text-ink-text">
              <span className="material-symbols-outlined text-[16px]" data-icon="straighten">straighten</span>
              Scale: 1:100
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesWorkspace;
