import React, { useState } from "react";

// Sample results data - in a real app, these would come from an API
const resultsData = [
  {
    id: 1,
    title: "Modern Minimalist Living Space",
    description: "Open concept with natural lighting and sustainable materials",
    model: "StableDiffusion",
    imageUrl: "https://placehold.co/600x400/222/fff?text=Modern+Living+Space",
    date: "2023-10-15",
  },
  {
    id: 2,
    title: "Industrial Loft Office",
    description: "Converted warehouse with exposed brick and high ceilings",
    model: "DALL-E",
    imageUrl: "https://placehold.co/600x400/222/fff?text=Industrial+Office",
    date: "2023-09-28",
  },
  {
    id: 3,
    title: "Cozy Suburban Home",
    description: "Family-focused design with 3 bedrooms and spacious backyard",
    model: "Midjourney",
    imageUrl: "https://placehold.co/600x400/222/fff?text=Suburban+Home",
    date: "2023-11-05",
  },
  {
    id: 4,
    title: "Urban Micro Apartment",
    description: "Efficient use of space in 500sqft downtown unit",
    model: "Architectural GPT",
    imageUrl: "https://placehold.co/600x400/222/fff?text=Micro+Apartment",
    date: "2023-10-02",
  },
  {
    id: 5,
    title: "Coastal Vacation Home",
    description:
      "Beachfront property with panoramic ocean views and outdoor living",
    model: "StableDiffusion",
    imageUrl: "https://placehold.co/600x400/222/fff?text=Coastal+Home",
    date: "2023-08-17",
  },
  {
    id: 6,
    title: "Sustainable Green Office",
    description: "Net-zero energy commercial space with biophilic design",
    model: "DALL-E",
    imageUrl: "https://placehold.co/600x400/222/fff?text=Green+Office",
    date: "2023-11-12",
  },
];

function ResultsPage() {
  const [filterModel, setFilterModel] = useState("All");

  // Filter results based on selected model
  const filteredResults =
    filterModel === "All"
      ? resultsData
      : resultsData.filter((result) => result.model === filterModel);

  return (
    <div class="flex h-screen bg-gradient-animated text-white overflow-y-auto">
      <div class="container mx-auto px-4 py-12 mb-20">
        <h1
          class="text-4xl font-bold mb-4 text-center"
          style={{ fontFamily: "Josefin Sans, sans-serif" }}
        >
          Model Results Gallery
        </h1>
        <p class="text-xl text-center mb-8 max-w-3xl mx-auto">
          Explore floor plans and designs created by our AI models based on user
          requirements
        </p>

        {/* Filter Controls */}
        <div class="flex justify-center mb-8">
          <div class="bg-gray-900/50 backdrop-blur-md rounded-xl py-3 px-6 inline-flex gap-3 shadow-lg">
            <span class="text-white/80 my-auto">Filter by Model:</span>
            <select
              class="bg-gray-800 text-white rounded-lg border border-white/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
              value={filterModel}
              onChange={(e) => setFilterModel(e.target.value)}
            >
              <option value="All">All Models</option>
              <option value="StableDiffusion">StableDiffusion</option>
              <option value="DALL-E">DALL-E</option>
              <option value="Midjourney">Midjourney</option>
              <option value="Architectural GPT">Architectural GPT</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((result) => (
            <div
              key={result.id}
              class="bg-gray-900/50 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all hover:shadow-cyan-500/10 hover:scale-[1.02] duration-300"
            >
              <div class="aspect-video w-full overflow-hidden">
                <img
                  src={result.imageUrl}
                  alt={result.title}
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                  <h2 class="text-2xl font-bold">{result.title}</h2>
                  <span class="bg-cyan-900/50 text-cyan-100 text-xs px-2 py-1 rounded-full">
                    {result.model}
                  </span>
                </div>
                <p class="text-white/80 mb-4">{result.description}</p>
                <div class="flex justify-between items-center">
                  <span class="text-xs text-white/60">
                    Created: {result.date}
                  </span>
                  <button class="bg-white/20 hover:bg-white/30 text-white text-sm py-1.5 px-3 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredResults.length === 0 && (
          <div class="flex flex-col items-center justify-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              class="w-16 h-16 text-white/40 mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
              />
            </svg>
            <p class="text-xl text-white/70">
              No results found for this model
            </p>
          </div>
        )}

        {/* Information section */}
        <div class="mt-12 max-w-3xl mx-auto bg-gray-900/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 class="text-xl font-bold mb-4">About Our Results</h2>
          <p class="mb-4">
            These floor plans and designs are generated by our AI models based
            on textual descriptions provided by users. Each model has its own
            strengths and characteristics:
          </p>
          <ul class="list-disc list-inside text-white/80 space-y-2 ml-4 mb-4">
            <li>
              <span class="font-semibold">StableDiffusion</span> - Produces
              highly realistic and detailed floor plans
            </li>
            <li>
              <span class="font-semibold">DALL-E</span> - Creates innovative
              and creative interpretations of spatial requirements
            </li>
            <li>
              <span class="font-semibold">Midjourney</span> - Specializes in
              aesthetic visualizations with artistic flair
            </li>
            <li>
              <span class="font-semibold">Architectural GPT</span> - Focuses
              on technical accuracy and building code compliance
            </li>
          </ul>
          <p class="text-sm text-white/60 italic">
            Note: The gallery showcases examples of what our AI can generate.
            Actual results may vary based on the specificity of your
            requirements.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
