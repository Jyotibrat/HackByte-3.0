import React from 'react';

const ShowcaseFilter = ({ filterModel, setFilterModel }) => {
  return (
    <div className="flex justify-center mb-8 relative z-10">
      <div className="bg-gray-900/50 backdrop-blur-md rounded-xl py-3 px-6 inline-flex gap-3 shadow-lg">
        <span className="text-white/80 my-auto">Filter by Model:</span>
        <select
          className="bg-gray-800 text-white rounded-lg border border-white/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
          value={filterModel}
          onChange={(e) => setFilterModel(e.target.value)}
        >
          <option value="All">All Models</option>
          <option value="Flanora v1">Flanora v1</option>
          <option value="Flanora v2">Flanora v2</option>
          <option value="Flanora v3">Flanora v3</option>
        </select>
      </div>
    </div>
  );
};

export default ShowcaseFilter;
