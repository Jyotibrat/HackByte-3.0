import contributors from "../data/contributors";

function GitHubIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.08 1.83 2.82 1.3 3.51.99.11-.78.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.94 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 4.8c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.62-2.82 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 24 12C24 5.37 18.63 0 12 0Z" /></svg>;
}

function LinkedInIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.29ZM5.34 7.41a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm-1.78 13.04h3.56V8.98H3.56v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" /></svg>;
}

function ContributorsPage() {
  return (
    <main className="flanora-team-page">
      <section className="flanora-team-header">
        <p>Our team</p>
        <h1>Meet the minds building <em>Flanora.</em></h1>
        <span>Developers, designers, and researchers working to make architectural ideation more accessible.</span>
      </section>

      <section className="flanora-team-grid" aria-label="Flanora AI team">
        {contributors.map((contributor) => (
          <article className="flanora-team-card" key={contributor.id} tabIndex="0">
            <img
              src={contributor.profileImage || "https://placehold.co/800x1000/102326/f5ffff?text=Flanora"}
              alt={`${contributor.name}'s profile`}
              loading="lazy"
              onError={(event) => { event.currentTarget.src = "https://placehold.co/800x1000/102326/f5ffff?text=Flanora"; }}
            />
            <div className="flanora-team-card-wash" aria-hidden="true" />
            <div className="flanora-team-card-content">
              <h2>{contributor.name}</h2>
              <p>{contributor.role}</p>
              <div className="flanora-team-socials">
                <a href={contributor.github} target="_blank" rel="noreferrer" aria-label={`Visit ${contributor.name}'s GitHub profile`}><GitHubIcon /></a>
                <a href={contributor.linkedin} target="_blank" rel="noreferrer" aria-label={`Visit ${contributor.name}'s LinkedIn profile`}><LinkedInIcon /></a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default ContributorsPage;
