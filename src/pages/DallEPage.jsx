import React from "react";
import { Link } from "react-router-dom";

function DallEPage() {
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
            Multi Modal Text to Image Generator
          </h1>
        </div>

        {/* Overview Section */}
        <section class="mb-16 relative pl-5 border-l-4 border-cyan-500/30">
          <h2 class="text-3xl font-bold mb-6 text-cyan-300">Overview</h2>
          <p class="text-white/90 mb-6 text-lg">
            The Multi Modal Text to Image Generator is an advanced AI system
            that processes both textual descriptions and spatial constraints
            simultaneously. Unlike traditional text-to-image models, it can
            understand architectural concepts, spatial relationships, and design
            principles to generate floor plans that satisfy multiple
            requirements at once.
          </p>

          <h3 class="text-2xl font-semibold mb-4 text-cyan-100">
            Key Capabilities
          </h3>
          <ul class="list-disc list-outside ml-6 text-white/90 space-y-3 mb-6 text-lg">
            <li>
              Processes multiple input modalities including text, room
              relationships, and sizing constraints
            </li>
            <li>
              Resolves complex spatial requirements and optimizes floor space
              efficiency
            </li>
            <li>
              Balances aesthetic considerations with practical functionality
            </li>
            <li>
              Adapts to specific architectural styles while maintaining
              structural coherence
            </li>
            <li>
              Generates practical solutions for challenging spatial limitations
              and odd-shaped spaces
            </li>
          </ul>
        </section>

        {/* Model Architecture Section */}
        <section class="mb-16 relative pl-5 border-l-4 border-cyan-500/30">
          <h2 class="text-3xl font-bold mb-6 text-cyan-300">
            Model Architecture
          </h2>
          <p class="text-white/90 mb-6 text-lg">
            Our Multi Modal Text to Image Generator is built on a
            transformer-based architecture with specialized attention mechanisms
            for spatial reasoning. The model processes architectural
            requirements through parallel pathways, combining traditional image
            generation capabilities with structural understanding.
          </p>

          <div class="aspect-video w-full rounded-lg mb-8 overflow-hidden shadow-lg border border-white/10">
            <img
              src="../../public/ArchitectureImg/multi modal model architecture.jpg"
              alt="Multi Modal Generator Architecture"
              class="w-full h-full object-contain"
            />
          </div>

          <p class="text-white/90 mb-6 text-lg">
            The architecture features a multi-head cross-attention system that
            allows text prompts, spatial constraints, and design preferences to
            influence each stage of the diffusion process. This enables precise
            control over room placement, proportions, and adjacency while
            maintaining a holistic view of the entire floor plan.
          </p>
        </section>

        {/* Technical Specifications Section */}
        <section class="mb-16 relative pl-5 border-l-4 border-cyan-500/30">
          <h2 class="text-3xl font-bold mb-6 text-cyan-300">
            Technical Specifications
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-black/20 p-4 rounded-lg">
              <h4 class="font-medium mb-2 text-cyan-100">Base Architecture</h4>
              <p class="text-white/90">
                Extended latent diffusion model with multi-pathway
                cross-attention
              </p>
            </div>
            <div class="bg-black/20 p-4 rounded-lg">
              <h4 class="font-medium mb-2 text-cyan-100">Training Data</h4>
              <p class="text-white/90">
                Diverse dataset of 2.8M floor plans with architectural
                annotations and specifications
              </p>
            </div>
            <div class="bg-black/20 p-4 rounded-lg">
              <h4 class="font-medium mb-2 text-cyan-100">Output Resolution</h4>
              <p class="text-white/90">
                1024×1024 native with option for higher resolution outputs via
                tiling
              </p>
            </div>
            <div class="bg-black/20 p-4 rounded-lg">
              <h4 class="font-medium mb-2 text-cyan-100">
                Conditioning Control
              </h4>
              <p class="text-white/90">
                Multi-level conditioning for spatial geometry, style, materials,
                and dimensions
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
            <li>
              Describe both functional requirements and desired aesthetic
              qualities
            </li>
            <li>
              Specify crucial room adjacencies (e.g., "kitchen next to dining
              room")
            </li>
            <li>
              Include approximate dimensions or area constraints when applicable
            </li>
            <li>Mention any special features or architectural elements</li>
            <li>Use rich descriptive language for materials and finishes</li>
          </ul>

          <h3 class="text-2xl font-semibold mb-4 text-cyan-100">
            Sample Prompts
          </h3>
          <div class="space-y-4 mb-8">
            <div class="bg-black/30 p-4 rounded-lg">
              <p class="text-white/90 font-medium">
                "Design a modern open-concept apartment, approximately 75 square
                meters. Include one bedroom, one bathroom, a home office nook,
                and an open kitchen-living area. Maximize natural light with
                large windows, and use a minimalist aesthetic with concrete
                floors and white walls."
              </p>
            </div>
            <div class="bg-black/30 p-4 rounded-lg">
              <p class="text-white/90 font-medium">
                "Create a family home with 3 bedrooms, 2 bathrooms, a large
                kitchen with island connected to the dining area, a separate
                living room, and a mudroom entrance from the garage. The primary
                bedroom should have an ensuite bathroom and walk-in closet.
                Style should be transitional with warm neutral tones."
              </p>
            </div>
          </div>

          <div class="p-6 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-400">
            <h4 class="font-bold mb-2 text-xl text-cyan-100">Pro Tip</h4>
            <p class="text-white/90">
              This model excels when given a mix of specific spatial
              requirements and creative freedom. Try to balance structure (room
              counts, adjacencies) with stylistic guidance to get the most
              innovative yet practical floor plans.
            </p>
          </div>
        </section>

        <div class="flex justify-center mb-8">
          <Link
            to="/chat"
            class="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-lg transition-colors transform hover:scale-105 flex items-center gap-2 text-lg font-semibold"
          >
            <span>Try Multi Modal Generator Now</span>
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

export default DallEPage;
