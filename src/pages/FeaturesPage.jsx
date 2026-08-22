import { Link } from "react-router-dom";

const features = [
  {
    title: "Natural Language Input",
    description:
      "Describe rooms, dimensions, and layout preferences in plain English. No CAD experience required.",
  },
  {
    title: "Multi-Model Generation",
    description:
      "Choose from three specialized AI models optimized for realism, creativity, or technical precision.",
  },
  {
    title: "Instant Visualization",
    description:
      "Generate floor plan images in seconds. Iterate on designs with follow-up prompts in the chat interface.",
  },
  {
    title: "Prompt Validation",
    description:
      "Built-in validation ensures your requirements are clear and complete before generation begins.",
  },
  {
    title: "Flexible Output Styles",
    description:
      "From photorealistic renders to dimensioned technical drawings, match output to your project stage.",
  },
  {
    title: "Conversation History",
    description:
      "Save and revisit past conversations. Refine designs iteratively without starting from scratch.",
  },
];

const useCases = [
  {
    title: "Architects and Designers",
    description:
      "Rapidly explore layout options during early concept phases. Present clients with visual options before committing to detailed drawings.",
  },
  {
    title: "Real Estate Developers",
    description:
      "Visualize unit configurations and floor layouts for marketing materials and pre-construction planning.",
  },
  {
    title: "Homeowners",
    description:
      "Plan renovations, room additions, or new builds by describing your vision and seeing it rendered instantly.",
  },
];

function FeaturesPage() {
  return (
    <div className="bg-gradient-animated">
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <p
            className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-4"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Features
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Everything you need to go from idea to floor plan
          </h1>
          <p
            className="text-lg text-white/70 leading-relaxed"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Flanora AI combines conversational AI with specialized image
            generation models to deliver professional floor plans from simple
            text descriptions.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-cyan-500/30 transition-colors"
            >
              <h3
                className="text-lg font-semibold text-white mb-3"
                style={{ fontFamily: "Josefin Sans, sans-serif" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm text-white/70 leading-relaxed"
                style={{ fontFamily: "Martel Sans, sans-serif" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <h2
          className="text-3xl font-bold text-white mb-10 text-center"
          style={{ fontFamily: "Josefin Sans, sans-serif" }}
        >
          Built for every stage of design
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-white/10 p-6"
            >
              <h3
                className="text-lg font-semibold text-white mb-3"
                style={{ fontFamily: "Josefin Sans, sans-serif" }}
              >
                {useCase.title}
              </h3>
              <p
                className="text-sm text-white/70 leading-relaxed"
                style={{ fontFamily: "Martel Sans, sans-serif" }}
              >
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-white/10 p-10 md:p-14 text-center max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Ready to see it in action?
          </h2>
          <p
            className="text-white/70 mb-8"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Start generating floor plans in under a minute. No account required
            during beta.
          </p>
          <Link
            to="/chat"
            className="inline-block text-sm font-medium bg-white text-gray-900 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Open the app
          </Link>
        </div>
      </section>
    </div>
  );
}

export default FeaturesPage;
