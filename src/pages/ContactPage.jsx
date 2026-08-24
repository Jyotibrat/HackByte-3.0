import { useState } from "react";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="flanora-contact-page">
      <div className="flanora-contact-photo" aria-hidden="true" />
      <div className="flanora-contact-panel">
        <span className="flanora-contact-kicker">Flanora AI</span>
        <h1>Get in touch</h1>
        <p>Questions, feedback, or a research collaboration? We would love to hear from you.</p>
        <form className="flanora-contact-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          <label>First name<input name="firstName" autoComplete="given-name" required /></label>
          <label>Last name<input name="lastName" autoComplete="family-name" required /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
          <label>Phone number<input name="phone" type="tel" autoComplete="tel" /></label>
          <label className="flanora-contact-message">Message<textarea name="message" required /></label>
          <button type="submit">Send message <span aria-hidden="true">→</span></button>
          {submitted && <p className="flanora-contact-status" role="status">Thanks — your message is ready to be sent when contact delivery is connected.</p>}
        </form>
      </div>
      <aside className="flanora-contact-aside">
        <div><span>Contact</span><a href="mailto:bjyotibrat@gmail.com">bjyotibrat@gmail.com</a></div>
        <div className="flanora-contact-socials"><span>Follow us</span><a href="https://www.youtube.com/@bindupautrajyotibrat" target="_blank" rel="noreferrer" aria-label="Flanora AI on YouTube">▶</a><a href="https://x.com/B_Jyotibrat" target="_blank" rel="noreferrer" aria-label="Flanora AI on X">𝕏</a><span className="flanora-contact-instagram" aria-label="Instagram">◎</span></div>
      </aside>
    </section>
  );
}

export default ContactPage;
