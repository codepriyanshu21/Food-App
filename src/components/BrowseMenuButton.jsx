import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const BrowseMenuButton = ({ menuCategories, scrollToSection }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleItemClick = (index) => {
    scrollToSection(index); // Scroll to the specific section
    setIsModalOpen(false); // Close the modal
  };

  const handleClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling when modal is closed
    }
  }, [isModalOpen]);

  return (
    <>
      {/* Browse Menu Button */}
      <button
        className="fixed bottom-8 right-24 w-16 h-16 bg-black text-white text-lg rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        onClick={toggleModal}
      >
        Menu
      </button>

      {/* Menu Modal */}
      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClickOutside}
        >
          <div className="bg-white max-w-xs w-full p-6 rounded-lg shadow-lg overflow-y-auto max-h-[80vh] relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={toggleModal}
            >
              <IoClose className="text-2xl" />
            </button>
            <h2 className="text-xl font-bold mb-4">Browse Menu</h2>
            <ul className="space-y-4">
              {menuCategories.map((category, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 rounded-md hover:bg-gray-100 transition"
                  onClick={() => handleItemClick(index)} // Use handleItemClick
                >
                  {category?.card?.card?.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default BrowseMenuButton;
