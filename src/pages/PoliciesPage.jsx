import { useParams } from "react-router-dom";
import privacyPolicyMarkup from "../content/privacy-policy.html?raw";
import termsOfUseMarkup from "../content/terms-of-use.html?raw";

const titles = {
  "terms-of-use": "Terms of Use",
  "privacy-policy": "Privacy Policy",
};

function PoliciesPage() {
  const { policy } = useParams();
  const title = titles[policy] ?? "Policies";

  if (policy === "privacy-policy") {
    return (
      <section className="flanora-policy-page">
        <article className="flanora-policy-content" dangerouslySetInnerHTML={{ __html: privacyPolicyMarkup }} />
      </section>
    );
  }

  if (policy === "terms-of-use") {
    return <section className="flanora-policy-page"><article className="flanora-policy-content" dangerouslySetInnerHTML={{ __html: termsOfUseMarkup }} /></section>;
  }

  return (
    <section className="flanora-research-placeholder">
      <p>Flanora AI</p>
      <h1>{title}</h1>
      <span>Policy content is coming soon.</span>
    </section>
  );
}

export default PoliciesPage;
