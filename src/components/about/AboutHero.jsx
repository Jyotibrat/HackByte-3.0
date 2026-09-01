import heroImg from "../../assets/about/about_hero_img.png";

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
    </section>
  );
}
export default AboutHero;
