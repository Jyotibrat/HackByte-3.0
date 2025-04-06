import React from "react";
import { Link } from "react-router-dom";

function StableDiffusionPage() {
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
            Fused Stable Diffusion and ControlNet Model
          </h1>
        </div>

        {/* Overview Section */}
        <section class="mb-16 relative pl-5 border-l-4 border-cyan-500/30">
          <h2 class="text-3xl font-bold mb-6 text-cyan-300">Overview</h2>
          <p class="text-white/90 mb-6 text-lg">
            The Fused Stable Diffusion and ControlNet Model combines the
            creative power of latent diffusion with precise structural control
            mechanisms. This hybrid approach enables the generation of visually
            rich floor plans that balance aesthetic quality with architectural
            feasibility, providing both creative design elements and structural
            coherence.
          </p>

          <h3 class="text-2xl font-semibold mb-4 text-cyan-100">
            Key Capabilities
          </h3>
          <ul class="list-disc list-outside ml-6 text-white/90 space-y-3 mb-6 text-lg">
            <li>
              Creates visually detailed floor plans with photorealistic textures
              and materials
            </li>
            <li>
              Maintains structural integrity through ControlNet spatial
              conditioning
            </li>
            <li>
              Generates both 2D floor plans and 3D architectural visualizations
            </li>
            <li>
              Accurately represents complex architectural features and details
            </li>
            <li>
              Adapts to various architectural styles while maintaining
              structural feasibility
            </li>
          </ul>
        </section>

        {/* Model Architecture Section */}
        <section class="mb-16 relative pl-5 border-l-4 border-cyan-500/30">
          <h2 class="text-3xl font-bold mb-6 text-cyan-300">
            Model Architecture
          </h2>
          <p class="text-white/90 mb-6 text-lg">
            Our fused model architecture integrates a fine-tuned Stable
            Diffusion v2 backbone with multiple specialized ControlNet
            conditioning modules. This unique combination allows for granular
            spatial control while preserving the creative capabilities of the
            base diffusion model.
          </p>

          <div class="aspect-video w-full rounded-lg mb-8 overflow-hidden shadow-lg border border-white/10">
            <img
              src="../../public/ArchitectureImg/stable diffusion controlnet model architecture.jpg"
              alt="Stable Diffusion Model Architecture"
              class="w-full h-full object-contain"
            />
          </div>

          <p class="text-white/90 mb-6 text-lg">
            The system uses a multi-stage pipeline where textual descriptions
            are first processed by a specialized architectural tokenizer, then
            spatial layouts are generated and refined using the ControlNet
            modules. The Stable Diffusion component adds aesthetic details,
            materials, and lighting effects while respecting the underlying
            structural guidance from ControlNet.
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
                Stable Diffusion v2.1 with multiple architectural ControlNet
                modules
              </p>
            </div>
            <div class="bg-black/20 p-4 rounded-lg">
              <h4 class="font-medium mb-2 text-cyan-100">Training Dataset</h4>
              <p class="text-white/90">
                3.2M architectural images and floor plans with comprehensive
                style annotations
              </p>
            </div>
            <div class="bg-black/20 p-4 rounded-lg">
              <h4 class="font-medium mb-2 text-cyan-100">Output Resolution</h4>
              <p class="text-white/90">
                768×768 native with upscaling to 2048×2048 for detailed
                visualizations
              </p>
            </div>
            <div class="bg-black/20 p-4 rounded-lg">
              <h4 class="font-medium mb-2 text-cyan-100">Control Mechanisms</h4>
              <p class="text-white/90">
                Multi-level conditioning for structure, style, materials, and
                spatial arrangement
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
              Describe both spatial arrangements and desired visual aesthetics
            </li>
            <li>
              Specify preferred architectural style (Modern, Traditional,
              Industrial, etc.)
            </li>
            <li>Mention desired materials, textures, and finish qualities</li>
            <li>
              Indicate lighting preferences (natural light, ambient, accent
              lighting)
            </li>
            <li>
              Request specific visualization angle (top-down, isometric,
              eye-level)
            </li>
          </ul>

          <h3 class="text-2xl font-semibold mb-4 text-cyan-100">
            Sample Prompts
          </h3>
          <div class="space-y-4 mb-8">
            <div class="bg-black/30 p-4 rounded-lg">
              <p class="text-white/90 font-medium">
                "Design a modern Scandinavian-inspired open floor plan with
                light oak flooring, white walls, and abundant natural light.
                Include a kitchen with island that flows into the dining and
                living areas. Large windows should face the main living space.
                Show in isometric view with warm evening lighting."
              </p>
            </div>
            <div class="bg-black/30 p-4 rounded-lg">
              <p class="text-white/90 font-medium">
                "Create a traditional Japanese floor plan with tatami rooms,
                sliding shoji doors, and engawa corridor wrapping around a
                central courtyard garden. Use natural materials including
                cypress wood and stone. Show a top-down view with architectural
                detailing and precise room divisions."
              </p>
            </div>
          </div>

          <div class="p-6 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-400">
            <h4 class="font-bold mb-2 text-xl text-cyan-100">Pro Tip</h4>
            <p class="text-white/90">
              This model excels at visualizing the finished appearance of
              spaces. When writing prompts, divide your description between
              spatial arrangement (room layout, sizes, adjacencies) and visual
              aesthetics (materials, lighting, style). For the most visually
              striking results, include atmospheric details like time of day,
              lighting conditions, and material finishes.
            </p>
          </div>
        </section>

        <div class="flex justify-center mb-8">
          <Link
            to="/chat"
            class="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-lg transition-colors transform hover:scale-105 flex items-center gap-2 text-lg font-semibold"
          >
            <span>Try Fused Stable Diffusion Now</span>
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

export default StableDiffusionPage;
