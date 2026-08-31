import faqData from "../../data/faq.json";

function AboutFAQ() {
  return (
    <section className="about-faq-section" style={{ maxWidth: '900px', margin: '100px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', 'Josefin Sans', serif", marginBottom: '10px' }}>
          Frequently Asked Questions
        </h2>
      </div>

      <div className="faq-accordion" style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        {faqData.map((faq, index) => (
          <details className="faq-item" key={index}>
            <summary className="faq-summary" style={{ padding: '24px 0', fontSize: '1.1rem', fontWeight: '500' }}>
              <span>{faq.question}</span>
              <span className="faq-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </span>
            </summary>
            <div className="faq-content" style={{ padding: '0 0 24px 0', fontSize: '1rem', color: '#666', lineHeight: '1.6' }}>
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
export default AboutFAQ;
