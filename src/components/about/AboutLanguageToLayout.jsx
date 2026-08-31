function AboutLanguageToLayout() {
  return (
    <section className="language-layout">
      <h2 className="language-layout-title">Language to Layout</h2>
      <div className="flow-container">
        <div className="flow-step">
          <div className="flow-input">
            A sunny villa with a central courtyard and two bedrooms
          </div>
        </div>
        <div className="flow-step">
          <div className="flow-core">
            Flanora<br />Core
          </div>
        </div>
        <div className="flow-step">
          <div className="flow-output">
            <img 
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/variants/df48517c-b34b-4aa2-b653-96984538305d/3840w.jpg" 
              alt="Generated floor plan layout" 
              style={{ filter: 'grayscale(1)', opacity: 0.8 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutLanguageToLayout;
