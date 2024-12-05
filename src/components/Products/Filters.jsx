import React from "react";

const Filters = ({ categories, onFilter }) => {
  return (
    <div className="flex flex-wrap justify-start space-x-4 overflow-x-auto">
      <button
        onClick={() => onFilter("All")}
        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 mb-2 sm:mb-0"
      >
        All
      </button>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onFilter(category)}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 mb-2 sm:mb-0"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filters;
