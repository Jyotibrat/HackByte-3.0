import React from "react";
import { Link } from "react-router-dom";

function KnowMorePage() {
  // Model data array for easier maintenance
  const models = [
    {
      id: "stable-diffusion",
      name: "Fused Stable Diffusion and ControlNet Model",
      description:
        "A hybrid model combining Stable Diffusion's generative capabilities with ControlNet's fine control over spatial geometry.",
      features: [
        "High-quality floor plan generation",
        "Realistic texture and material rendering",
        "Accurate spatial awareness",
      ],
      bestFor: "Realistic designs",
      path: "/models/stable-diffusion",
      image:
        "../../public/logos/stable diffusion and controlnet model logo.jpeg",
    },
    {
      id: "dall-e",
      name: "Multi Modal Text to Image Generator",
      description:
        "An advanced AI model that interprets complex requirements with multiple constraints to generate detailed floor plans.",
      features: [
        "Creative interpretation of requirements",
        "Strong understanding of design concepts",
        "Excellent for unique, non-standard layouts",
      ],
      bestFor: "Creative concepts",
      path: "/models/dall-e",
      image: "../../public/logos/multi modal logo.jpeg",
    },
    {
      id: "midjourney",
      name: "Gemini with Matplotlib Floor Planner",
      description:
        "Google's Gemini model combined with Matplotlib to create programmatically precise 2D floor plans with exact measurements.",
      features: [
        "Highly aesthetic visual representations",
        "Excellent lighting and atmospheric quality",
        "Creative interpretation of spaces",
      ],
      bestFor: "Artistic visualizations",
      path: "/models/midjourney",
      image:
        "../../public/logos/gemini matplotlib model logo.jpeg",
    },
  ];

  return (
    <div class="flex h-screen bg-gradient-animated text-white overflow-y-auto">
      <div class="container mx-auto px-4 py-12 mb-20">
        <h1
          class="text-4xl font-bold mb-6 text-center"
          style={{ fontFamily: "Josefin Sans, sans-serif" }}
        >
          Know More About Our Models
        </h1>

        <p class="text-center max-w-3xl mx-auto mb-12 text-white/80">
          Explore our different AI models for floor plan generation, each with
          unique strengths and capabilities
        </p>

        {/* Models Grid - Using Card Design */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {models.map((model) => (
            <div
              key={model.id}
              class="bg-gray-900/50 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all hover:shadow-cyan-500/10 group hover:-translate-y-1 duration-300"
            >
              {/* Card Image */}
              <div class="aspect-video w-full overflow-hidden">
                <img
                  src={model.image}
                  alt={model.name}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Content */}
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-2 text-white">{model.name}</h2>
                <p class="text-white/80 mb-4 line-clamp-2">
                  {model.description}
                </p>

                <div class="mb-4">
                  <h3 class="font-semibold mb-2 text-white/90 text-sm uppercase tracking-wider">
                    Key Features:
                  </h3>
                  <ul class="list-disc list-inside text-white/80 space-y-1 ml-2 text-sm">
                    {model.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div class="flex items-center justify-between mt-4">
                  <span class="text-sm text-cyan-300 font-medium">
                    Best for: {model.bestFor}
                  </span>

                  <Link
                    to={model.path}
                    class="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center gap-1 text-sm"
                  >
                    <span>Learn more</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KnowMorePage;
