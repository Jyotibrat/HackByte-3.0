import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShowcaseCubeGallery from "../components/showcase/sections/ShowcaseCubeGallery";

// Import local assets
import bgImg1 from "../assets/showcase/bg_img_1.png";
import bgImg2 from "../assets/showcase/bg_img_2.png";
import bgImg3 from "../assets/showcase/bg_img_3.png";
import bgImg4 from "../assets/showcase/bg_img_4.png";
import bgImg5 from "../assets/showcase/bg_img_5.png";
import bgImg6 from "../assets/showcase/bg_img_6.png";

// Sample results data updated with new assets
const resultsData = [
  {
    id: 1,
    title: "Modern Minimalist Living Space",
    description: "Open concept with natural lighting and sustainable materials",
    model: "Flanora v1",
    imageUrl: bgImg1,
    date: "2023-10-15",
  },
  {
    id: 2,
    title: "Industrial Loft Office",
    description: "Converted warehouse with exposed brick and high ceilings",
    model: "Flanora v2",
    imageUrl: bgImg2,
    date: "2023-09-28",
  },
  {
    id: 3,
    title: "Cozy Suburban Home",
    description: "Family-focused design with 3 bedrooms and spacious backyard",
    model: "Flanora v3",
    imageUrl: bgImg3,
    date: "2023-11-05",
  },
  {
    id: 4,
    title: "Urban Micro Apartment",
    description: "Efficient use of space in 500sqft downtown unit",
    model: "Flanora v1",
    imageUrl: bgImg4,
    date: "2023-10-02",
  },
  {
    id: 5,
    title: "Coastal Vacation Home",
    description: "Beachfront property with panoramic ocean views and outdoor living",
    model: "Flanora v2",
    imageUrl: bgImg5,
    date: "2023-08-17",
  },
  {
    id: 6,
    title: "Sustainable Green Office",
    description: "Net-zero energy commercial space with biophilic design",
    model: "Flanora v3",
    imageUrl: bgImg6,
    date: "2023-11-12",
  },
];

function ResultsPage() {
  const location = useLocation();
  const path = location.pathname;

  let defaultFilter = "All";
  if (path === "/showcase/flanora-v1") defaultFilter = "Flanora v1";
  else if (path === "/showcase/flanora-v2") defaultFilter = "Flanora v2";
  else if (path === "/showcase/flanora-v3") defaultFilter = "Flanora v3";

  const [filterModel, setFilterModel] = useState(defaultFilter);

  // Sync state if URL changes while component is mounted
  useEffect(() => {
    if (path === "/showcase/flanora-v1") setFilterModel("Flanora v1");
    else if (path === "/showcase/flanora-v2") setFilterModel("Flanora v2");
    else if (path === "/showcase/flanora-v3") setFilterModel("Flanora v3");
    else if (path === "/showcase") setFilterModel("All");
  }, [path]);

  useEffect(() => {
    document.title = "Flanora AI | Showcase";
  }, []);

  // Filter results based on selected model
  const filteredResults =
    filterModel === "All"
      ? resultsData
      : resultsData.filter((result) => result.model === filterModel);

  return (
    <div style={{ background: '#0d0d0d' }}>
      {/* 3D GSAP Scroll Gallery Section */}
      <ShowcaseCubeGallery results={filteredResults} />
    </div>
  );
}

export default ResultsPage;
