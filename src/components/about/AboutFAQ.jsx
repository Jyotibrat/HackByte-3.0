import { useState } from "react";
import faqData from "../../data/faq.json";

function AboutFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="about-faq-section" style={{ maxWidth: '900px', margin: '100px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', 'Josefin Sans', serif", marginBottom: '10px' }}>
          Frequently Asked Questions
        </h2>
      </div>

      <div className="faq-accordion" style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div className={`faq-item ${isOpen ? 'open' : ''}`} key={index}>
              <div 
                className="faq-summary" 
                onClick={() => toggleFAQ(index)}
                style={{ padding: '24px 0', fontSize: '1.1rem', fontWeight: '500' }}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12" style={{ transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transformOrigin: 'center' }}></line>
                  </svg>
                </span>
              </div>
              <div className={`faq-content-wrapper ${isOpen ? 'open' : ''}`}>
                <div className="faq-content-inner">
                  <div className="faq-content" style={{ padding: '0 0 24px 0', fontSize: '1rem', lineHeight: '1.6' }}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default AboutFAQ;
