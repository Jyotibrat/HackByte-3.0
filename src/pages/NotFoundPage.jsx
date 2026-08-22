import { Link, useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="flanora-not-found">
      <svg className="flanora-not-found-code" aria-hidden="true" viewBox="0 0 800 400">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">404</text>
      </svg>
      <div className="flanora-not-found-content">
        <p>Flanora AI</p>
        <h1>That space does not exist.</h1>
        <span>The page you are looking for may have moved, been renamed, or is not available.</span>
        <div className="flanora-not-found-actions">
          <Link to="/">Return home</Link>
          <button type="button" onClick={() => navigate(-1)}>Go back</button>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
