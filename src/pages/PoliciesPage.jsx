import { useParams } from "react-router-dom";

const titles = {
  "terms-of-use": "Terms of Use",
  "privacy-policy": "Privacy Policy",
};

function PoliciesPage() {
  const { policy } = useParams();
  const title = titles[policy] ?? "Policies";

  return (
    <section className="flanora-research-placeholder">
      <p>Flanora AI</p>
      <h1>{title}</h1>
      <span>Policy content is coming soon.</span>
    </section>
  );
}

export default PoliciesPage;
