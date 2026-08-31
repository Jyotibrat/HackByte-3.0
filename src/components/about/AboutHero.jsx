import heroImg from "../../assets/about/about_hero_img_2.png";

function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero-graphic">
        <img 
          src={heroImg} 
          alt="Abstract architectural lines with glowing AI core" 
          style={{ borderRadius: '12px' }}
        />
        <h1 className="hero-overlay-text">Architecture Begins With an Idea</h1>
      </div>
      {/* <p className="about-hero-subtext">An architectural AI research project.</p> */}
    </section>
  );
}
export default AboutHero;
