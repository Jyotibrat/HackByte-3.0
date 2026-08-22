import { Link } from "react-router-dom";

const values = [
  {
    title: "Accessibility",
    description:
      "Professional floor planning should not require expensive software or years of training. We make it available to everyone.",
  },
  {
    title: "Precision",
    description:
      "Our multi-model approach ensures you get the right output for your stage, whether that is a concept sketch or a technical plan.",
  },
  {
    title: "Innovation",
    description:
      "We combine the latest advances in generative AI, computer vision, and natural language processing for architectural design.",
  },
];

function AboutPage() {
  return (
    <div className="bg-gradient-animated">
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <p
            className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-4"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            About
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Redefining how spaces are designed
          </h1>
          <p
            className="text-lg text-white/70 leading-relaxed mb-6"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Flanora AI was built at HackByte 3.0 with a simple mission: make
            architectural floor planning as intuitive as having a conversation.
            We believe the gap between an idea and a visual plan should be
            measured in seconds, not days.
          </p>
          <p
            className="text-lg text-white/70 leading-relaxed"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Our platform integrates three specialized AI models behind a single
            conversational interface. Users describe their requirements in
            natural language, and the system generates professional floor plan
            visualizations tailored to their needs.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-10">
          <p
            className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-3"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Publication
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            A State-of-Art Survey on Generative AI Techniques for Floor Planning
          </h2>
          <p
            className="text-white/70 leading-relaxed mb-6 max-w-3xl"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Published at the Generative AI and HCI workshop at CHI 2025 in
            Yokohama, Japan. The paper surveys generative AI approaches for
            floor planning, including their applications, limitations, and
            research opportunities.
          </p>
          <a
            href="https://doi.org/10.13140/RG.2.2.22225.08807"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium border border-cyan-400/50 text-cyan-300 px-6 py-3 rounded-full hover:bg-cyan-400/10 transition-colors"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            View publication
          </a>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <h2
          className="text-3xl font-bold text-white mb-10"
          style={{ fontFamily: "Josefin Sans, sans-serif" }}
        >
          What we stand for
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-white/10 p-6"
            >
              <h3
                className="text-lg font-semibold text-white mb-3"
                style={{ fontFamily: "Josefin Sans, sans-serif" }}
              >
                {value.title}
              </h3>
              <p
                className="text-sm text-white/70 leading-relaxed"
                style={{ fontFamily: "Martel Sans, sans-serif" }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-white/10 p-10 md:p-14">
          <div className="max-w-2xl">
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              The team behind Flanora AI
            </h2>
            <p
              className="text-white/70 mb-8 leading-relaxed"
              style={{ fontFamily: "Martel Sans, sans-serif" }}
            >
              We are a team of developers, designers, and ML engineers who came
              together at HackByte 3.0 to solve a problem we had all experienced:
              turning spatial ideas into shareable visual plans is too slow and
              too expensive.
            </p>
            <Link
              to="/team"
              className="inline-block text-sm font-medium border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/5 transition-colors"
              style={{ fontFamily: "Martel Sans, sans-serif" }}
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Start designing today
          </h2>
          <p
            className="text-white/70 mb-8"
            style={{ fontFamily: "Martel Sans, sans-serif" }}
          >
            Try Flanora AI for free and see how fast you can go from concept
            to visualization.
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

export default AboutPage;
