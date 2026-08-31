function AboutModelFamily() {
  return (
    <section className="model-family">
      <h2 className="model-family-title">Model Family</h2>
      <div className="model-showcase">
        <div className="model-card left">
          <img 
            src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80" 
            alt="Flanora v1 Concept" 
          />
          <div className="model-card-label">Flanora v1: Concept</div>
        </div>
        <div className="model-card center">
          <img 
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/611c8074-3c56-4810-a604-812a2791a1f9_800w.webp" 
            alt="Flanora v2 Precision" 
          />
          <div className="model-card-label" style={{ fontSize: '1.3rem', padding: '20px' }}>Flanora v2: Precision</div>
        </div>
        <div className="model-card right">
          <img 
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" 
            alt="Flanora v3 In Development" 
          />
          <div className="model-card-glass">Coming soon</div>
          <div className="model-card-label">Flanora v3: In Development</div>
        </div>
      </div>
    </section>
  );
}
export default AboutModelFamily;
