import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "during beta",
    description: "Full access to explore Flanora AI while we refine the product.",
    features: [
      "Unlimited floor plan generations",
      "Access to all three AI models",
      "Conversation history",
      "Standard resolution output",
      "Community support",
    ],
    cta: "Get started",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "Coming soon",
    period: "",
    description: "Advanced tools for professionals who need more from every project.",
    features: [
      "High-resolution exports",
      "Priority generation queue",
      "Advanced prompt templates",
      "Project folders and organization",
      "Email support",
    ],
    cta: "Join waitlist",
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored deployments for firms and organizations at scale.",
    features: [
      "Dedicated model instances",
      "API access and integrations",
      "Custom branding options",
      "SLA and priority support",
      "Volume licensing",
    ],
    cta: "Contact us",
    highlighted: false,
  },
];

function PricingPage() {
  return (
    <div className="bg-gradient-animated">
      <section className="container mx-auto px-4 py-20 md:py-28 text-center">
        <p
          className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-4"
          style={{ fontFamily: "Martel Sans, sans-serif" }}
        >
          Pricing
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          style={{ fontFamily: "Josefin Sans, sans-serif" }}
        >
          Simple, transparent pricing
        </h1>
        <p
          className="text-lg text-white/70 max-w-2xl mx-auto"
          style={{ fontFamily: "Martel Sans, sans-serif" }}
        >
          Flanora AI is free during our beta period. Paid plans with advanced
          features are on the roadmap.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-white text-gray-900 border-white"
                  : "bg-gray-900/50 backdrop-blur-md border-white/10 text-white"
              }`}
            >
              <h3
                className="text-lg font-semibold mb-1"
                style={{ fontFamily: "Josefin Sans, sans-serif" }}
              >
                {plan.name}
              </h3>
              <div className="mb-4">
                <span
                  className="text-3xl font-bold"
                  style={{ fontFamily: "Josefin Sans, sans-serif" }}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className={`text-sm ml-2 ${
                      plan.highlighted ? "text-gray-500" : "text-white/50"
                    }`}
                    style={{ fontFamily: "Martel Sans, sans-serif" }}
                  >
                    {plan.period}
                  </span>
                )}
              </div>
              <p
                className={`text-sm mb-6 leading-relaxed ${
                  plan.highlighted ? "text-gray-600" : "text-white/70"
                }`}
                style={{ fontFamily: "Martel Sans, sans-serif" }}
              >
                {plan.description}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`text-sm flex items-start gap-2 ${
                      plan.highlighted ? "text-gray-700" : "text-white/70"
                    }`}
                    style={{ fontFamily: "Martel Sans, sans-serif" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-5 h-5 shrink-0 ${
                        plan.highlighted ? "text-gray-900" : "text-cyan-400"
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.highlighted ? (
                <Link
                  to="/chat"
                  className="block text-center text-sm font-medium bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
                  style={{ fontFamily: "Martel Sans, sans-serif" }}
                >
                  {plan.cta}
                </Link>
              ) : (
                <button
                  type="button"
                  className="text-sm font-medium border border-white/20 px-6 py-3 rounded-full hover:bg-white/5 transition-colors cursor-default"
                  style={{ fontFamily: "Martel Sans, sans-serif" }}
                >
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PricingPage;
