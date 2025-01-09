import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const SortOptions = ({ sortOption, onSortChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { value: "relevance", label: "Relevance" },
    { value: "rating", label: "Rating" },
    { value: "deliveryTime", label: "Delivery Time" },
    { value: "costForTwo", label: "Cost for Two" },
  ];

  const handleOptionClick = (option) => {
    onSortChange(option);
    setIsDropdownOpen(false); // Close dropdown on selection
  };

  return (
    <div className="relative inline-block text-left">
      {/* Sort Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-between px-4 py-2 bg-white text-gray-700 rounded-md shadow-md "
      >
        <span className="font-bold text-lg text-red-500">Sort</span>
        <span
          className={`ml-2 w-4 h-4 text-2xl transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          
        ><RiArrowDropDownLine/>
        </span>
      </button>

      {/* Dropdown Options */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className="flex items-center justify-between px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick(option.value)}
              >
                <span>{option.label}</span>
                <span
                  className={`w-4 h-4 border-2 rounded-full ${
                    sortOption === option.value
                      ? "bg-orange-500 border-orange-600"
                      : "border-gray-400"
                  }`}
                ></span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortOptions;
