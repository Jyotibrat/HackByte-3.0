import { useParams } from "react-router-dom";

const labels = {
  publications: "Publications",
  articles: "Articles",
  "technical-reports": "Technical Reports",
};

function ResearchPage() {
  const { category } = useParams();
  const title = labels[category] ?? "Research";

  return (
    <section className="flanora-research-placeholder">
      <p>Research</p>
      <h1>{title}</h1>
      <span>Research content is coming soon.</span>
    </section>
  );
}

export default ResearchPage;
