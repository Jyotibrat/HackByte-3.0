import React from "react";
import { Link } from "react-router-dom";

function MidjourneyPage() {
  return (
    <div class="flex h-screen bg-gradient-animated text-white overflow-y-auto">
      <div class="container mx-auto px-4 py-12 mb-20 max-w-4xl">
        <div class="flex items-center mb-8">
          <Link
            to="/models"
            class="bg-white/20 hover:bg-white/30 p-2 rounded-lg mr-4 transition-all flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            <span>Back to Models</span>
          </Link>
          <h1
            class="text-4xl font-bold"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Gemini with Matplotlib Floor Planner
          </h1>
        </div>

        {/* Overview Section */}
        <section class="mb-16 relative pl-5 border-l-4 border-cyan-500/30">
          <h2 class="text-3xl font-bold mb-6 text-cyan-300">Overview</h2>
          <p class="text-white/90 mb-6 text-lg">
            The Gemini with Matplotlib Floor Planner is a specialized AI system that combines Google's Gemini large language model with precise programmatic visualization capabilities. Unlike image diffusion models, this approach generates vector-based floor plans with exact measurements, properly labeled rooms, and architectural accuracy.
          </p>

          <h3 class="text-2xl font-semibold mb-4 text-cyan-100">
            Key Capabilities
          </h3>
          <ul class="list-disc list-outside ml-6 text-white/90 space-y-3 mb-6 text-lg">
            <li>Generates dimensionally accurate floor plans with precise measurements</li>
            <li>Creates clear, clean vector graphics with proper architectural annotations</li>
            <li>Adheres strictly to building codes and spatial requirements</li>
            <li>Provides detailed room labeling and dimensioning</li>
            <li>Offers both 2D blueprint-style outputs and simplified 3D visualizations</li>
          </ul>
        </section>

        {/* Model Architecture Section */}
        <section class="mb-16 relative pl-5 border-l-4 border-cyan-500/30">
          <h2 class="text-3xl font-bold mb-6 text-cyan-300">
            Model Architecture
          </h2>
          <p class="text-white/90 mb-6 text-lg">
            Our Gemini with Matplotlib Floor Planner uses a unique pipeline approach that leverages the power of Google's advanced Gemini multimodal model combined with the precision of programmatic drawing. This hybrid system translates natural language requirements into structured architectural specifications.
          </p>

          <div class="aspect-video w-full rounded-lg mb-8 overflow-hidden shadow-lg border border-white/10">
            <img
              src="../../public/ArchitectureImg/Gemini matplotlib model architecture.jpg"
              alt="Gemini with Matplotlib Architecture"
              class="w-full h-full object-contain"
            />
          </div>

          <p class="text-white/90 mb-6 text-lg">
            The architecture first uses Gemini to interpret user requirements and convert them into a detailed spatial program. This structured representation is then used to generate Python code that utilizes Matplotlib's precision drawing functions to create accurate, scalable, and fully annotated floor plans that adhere to architectural standards.
          </p>
        </section>

        {/* Technical Specifications Section */}
        <section class="mb-16 relative pl-5 border-l-4 border-cyan-500/30">
          <h2 class="text-3xl font-bold mb-6 text-cyan-300">
            Technical Specifications
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-black/20 p-4 rounded-lg">
              <h4 class="font-medium mb-2 text-cyan-100">Base Models</h4>
              <p class="text-white/90">
                Google Gemini 1.5 Pro with custom Matplotlib code generation module
              </p>
            </div>
            <div class="bg-black/20 p-4 rounded-lg">
              <h4 class="font-medium mb-2 text-cyan-100">Knowledge Base</h4>
              <p class="text-white/90">
                Architectural standards, building codes, and spatial planning principles
              </p>
            </div>
            <div class="bg-black/20 p-4 rounded-lg">
              <h4 class="font-medium mb-2 text-cyan-100">Output Format</h4>
              <p class="text-white/90">
                Scalable vector graphics with measurement annotations and room labels
              </p>
            </div>
            <div class="bg-black/20 p-4 rounded-lg">
              <h4 class="font-medium mb-2 text-cyan-100">Customization</h4>
              <p class="text-white/90">
                Fine-grained control over dimensions, room placement, and architectural detailing
              </p>
            </div>
          </div>
        </section>

        {/* Usage Guidelines Section */}
        <section class="mb-16 relative pl-5 border-l-4 border-cyan-500/30">
          <h2 class="text-3xl font-bold mb-6 text-cyan-300">
            Usage Guidelines
          </h2>

          <h3 class="text-2xl font-semibold mb-4 text-cyan-100">
            Best Practices
          </h3>
          <ul class="list-disc list-outside ml-6 text-white/90 space-y-3 mb-8 text-lg">
            <li>Be specific about exact dimensions and measurements when possible</li>
            <li>Indicate preferred wall thicknesses and construction standards</li>
            <li>Specify desired room sizes in square meters or square feet</li>
            <li>Include any building code requirements or accessibility needs</li>
            <li>Request specific annotation styles if needed (dimensions, labels, etc.)</li>
          </ul>

          <h3 class="text-2xl font-semibold mb-4 text-cyan-100">
            Sample Prompts
          </h3>
          <div class="space-y-4 mb-8">
            <div class="bg-black/30 p-4 rounded-lg">
              <p class="text-white/90 font-medium">
                "Create an ADA-compliant office floor plan for a 40' × 60' space with reception area (100 sq ft), 3 private offices (120 sq ft each), conference room (200 sq ft), break room (150 sq ft), and accessible restrooms. Include proper door swings and 5' turning radius in key areas."
              </p>
            </div>
            <div class="bg-black/30 p-4 rounded-lg">
              <p class="text-white/90 font-medium">
                "Design a 2000 sq ft single-family home with 3 bedrooms (one master with ensuite), 2 bathrooms, open kitchen/dining area, living room, and 2-car garage. Use standard 2×4 construction with 6" exterior walls. Include dimensions for all rooms and label appropriately."
              </p>
            </div>
          </div>

          <div class="p-6 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-400">
            <h4 class="font-bold mb-2 text-xl text-cyan-100">Pro Tip</h4>
            <p class="text-white/90">
              This model excels at technical precision. Provide specific dimensions, construction requirements, and code compliance needs for the most accurate and usable floor plans. You can request various output styles including blueprint-style plans, basic 3D views, or annotated technical drawings.
            </p>
          </div>
        </section>

        <div class="flex justify-center mb-8">
          <Link
            to="/chat"
            class="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-lg transition-colors transform hover:scale-105 flex items-center gap-2 text-lg font-semibold"
          >
            <span>Try Gemini Floor Planner Now</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
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
  );
}

export default MidjourneyPage;
