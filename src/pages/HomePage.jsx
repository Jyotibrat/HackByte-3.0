import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Describe your space",
    description:
      "Tell the AI what you need: room count, dimensions, style, and layout preferences in plain language.",
  },
  {
    title: "Choose your model",
    description:
      "Pick from three specialized models for realistic renders, creative concepts, or technical floor plans.",
  },
  {
    title: "Generate and refine",
    description:
      "Receive your floor plan in seconds. Iterate with follow-up prompts until the design matches your vision.",
  },
];

const featureCards = [
  {
    title: "Natural language design",
    description:
      "No CAD software required. Describe your ideal space and let AI handle the visualization.",
  },
  {
    title: "Three AI models",
    description:
      "Stable Diffusion, multi-modal generation, and Gemini-powered technical plans in one platform.",
  },
  {
    title: "Instant results",
    description:
      "Go from prompt to floor plan in seconds. Perfect for early-stage concept exploration.",
  },
];

const models = [
  {
    name: "Multi Modal Generator",
    description: "Creative layouts from complex, multi-constraint prompts.",
    path: "/models/dall-e",
  },
  {
    name: "Stable Diffusion + ControlNet",
    description: "Photorealistic floor plans with accurate spatial geometry.",
    path: "/models/stable-diffusion",
  },
  {
    name: "Gemini Floor Planner",
    description: "Precise, dimensioned 2D plans with programmatic accuracy.",
    path: "/models/midjourney",
  },
];

function HomePage() {
  return (
    <div className="bg-gradient-animated">
      {/* Hero */}
      <section className="container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-6"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            AI-Powered Floor Planning
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Turn ideas into floor plans with AI
          </h1>
          <p
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Describe your dream space in natural language. Flanora AI
            generates professional layouts in seconds using state-of-the-art
            generative models.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/chat"
              className="text-sm font-medium bg-white text-gray-900 px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors"
              style={{ fontFamily: "Martel Sans, sans-serif" }}
            >
              Try it free
            </Link>
            <Link
              to="/features"
              className="text-sm font-medium text-white border border-white/20 px-8 py-3.5 rounded-full hover:bg-white/5 transition-colors"
              style={{ fontFamily: "Martel Sans, sans-serif" }}
            >
              See features
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 pb-24">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            How it works
          </h2>
          <p
            className="text-white/70 max-w-xl mx-auto"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Three steps from concept to visualization
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {highlights.map((step, index) => (
            <div key={step.title} className="text-center">
              <div
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-semibold text-sm mx-auto mb-5"
                style={{ fontFamily: "Josefin Sans, sans-serif" }}
              >
                {index + 1}
              </div>
              <h3
                className="text-lg font-semibold text-white mb-3"
                style={{ fontFamily: "Josefin Sans, sans-serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm text-white/70 leading-relaxed"
                style={{ fontFamily: "Martel Sans, sans-serif" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features preview */}
      <section className="container mx-auto px-4 pb-24">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Built for modern design workflows
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-cyan-500/30 transition-colors"
            >
              <h3
                className="text-lg font-semibold text-white mb-3"
                style={{ fontFamily: "Josefin Sans, sans-serif" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm text-white/70 leading-relaxed"
                style={{ fontFamily: "Martel Sans, sans-serif" }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/features"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            View all features
          </Link>
        </div>
      </section>

      {/* Models preview */}
      <section className="container mx-auto px-4 pb-24">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Three models, one platform
          </h2>
          <p
            className="text-white/70 max-w-xl mx-auto"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Each model is optimized for a different stage of the design process
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {models.map((model) => (
            <Link
              key={model.name}
              to={model.path}
              className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-cyan-500/30 transition-colors group"
            >
              <h3
                className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors"
                style={{ fontFamily: "Josefin Sans, sans-serif" }}
              >
                {model.name}
              </h3>
              <p
                className="text-sm text-white/70 leading-relaxed"
                style={{ fontFamily: "Martel Sans, sans-serif" }}
              >
                {model.description}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/models"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Compare all models
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24">
        <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-white/10 p-10 md:p-16 text-center max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Start designing in seconds
          </h2>
          <p
            className="text-white/70 mb-8 max-w-lg mx-auto"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            No account required. Open the app, describe your space, and
            generate your first floor plan today.
          </p>
          <Link
            to="/chat"
            className="inline-block text-sm font-medium bg-white text-gray-900 px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Open Flanora AI
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
