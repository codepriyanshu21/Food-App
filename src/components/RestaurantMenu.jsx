import React, { useState, useRef } from "react";
import Shimmer from "./Shimmer";
import { CDN_URL } from "../utils/constants.jsx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu.jsx";
import { IoStarSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice.jsx";
import toast from "react-hot-toast";
import BrowseMenuButton from "./BrowseMenuButton.jsx";
import { BsFillStopwatchFill } from "react-icons/bs";

const RestaurantMenu = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const [vegOnly, setVegOnly] = useState(false);
  const { resId } = useParams();
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState({});
  const sectionRefs = useRef([]);

  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) {
    return <Shimmer />;
  }


  // Destructure restaurant info
  const {
    name,
    cloudinaryImageId,
    cuisines,
    areaName,
    costForTwoMessage,
    avgRatingString,
    totalRatingsString,
    sla: { slaString } = {},
  } = resInfo?.cards?.[2]?.card?.card?.info || {};

  // Extract menu categories
  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const filteredCategories = categories.filter((category) => {
    return category?.card?.card?.title !== "Top Picks";
  });

  const handleAddToCart = (item) => {
    const itemId = item.id;
    setCartItems((prev) => {
      const newQuantity = prev[itemId] ? prev[itemId] + 1 : 1;
      return { ...prev, [itemId]: newQuantity };
    });

    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        imageId: item.cloudinaryImageId || item.imageId,
        description: item.description || "No Description Available",
        price: item.price || item.defaultPrice || 0,
        quantity: 1,
      })
    );

    toast.success("Item is added to cart");
  };

  const handleRemoveFromCart = (item) => {
    const itemId = item.id;
    setCartItems((prev) => {
      const newQuantity = prev[itemId] ? prev[itemId] - 1 : 0;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
    toast.error("Item is removed from cart");
  };

  const toggleSectionVisibility = (index) => {
    setVisibleSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setVisibleSections((prev) => ({ ...prev, [index]: true }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mt-16 lg:mt-2 mb-8">
        <img
          src={CDN_URL + cloudinaryImageId}
          alt={name}
          className="w-32 h-32 object-cover rounded-lg shadow-lg loading-lazy"
        />
        <div className="flex-1 px-4 text-center">
          <h1 className="lg:text-2xl text-lg font-bold text-gray-800">{name}</h1>
          <p className="text-gray-500 mt-2">{cuisines?.join(", ")}</p>
          <p className="text-gray-600">{areaName}</p>
          <p className="mt-2 text-md hidden lg:block font-semibold text-gray-700">
            {costForTwoMessage}
          </p>
        </div>
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center gap-1">
            <div className="text-md text-green-500">
              <IoStarSharp />
            </div>
            <span className="text-sm font-bold text-green-500">
              {avgRatingString}
            </span>
          </div>
          <p className="text-sm text-gray-500">{totalRatingsString}</p>
        </div>
      </div>

      <div className="flex justify-between gap-4 mb-4">
        <div className="font-bold flex items-center gap-1"><BsFillStopwatchFill/> ({slaString})</div>
        <button
          className={`px-4 py-2 rounded-md ${
            vegOnly
              ? "hover:bg-green-400 bg-green-500 text-white"
              : "hover:bg-gray-300 bg-gray-200 text-gray-700"
          }`}
          onClick={() => setVegOnly(!vegOnly)}
        >
          {vegOnly ? "Show All" : "Veg Only"}
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        {filteredCategories.length === 0 ? (
          <p className="text-center text-gray-500">No categories available.</p>
        ) : (
          filteredCategories.map((category, index) => {
            const items = category?.card?.card?.itemCards || [];
            const title = category?.card?.card?.title;

            const filteredItems = vegOnly
              ? items.filter((item) => item?.card?.info?.isVeg)
              : items;

            return (
              <div
                key={index}
                className="mb-6"
                ref={(el) => (sectionRefs.current[index] = el)}
              >
                <div
                  className="flex items-center justify-between cursor-pointer bg-gray-100 px-4 py-2 rounded-md"
                  onClick={() => toggleSectionVisibility(index)}
                >
                  <h2 className="text-lg font-bold">
                    {title} ({filteredItems.length})
                  </h2>
                  {visibleSections[index] ? (
                    <IoIosArrowUp className="text-lg" />
                  ) : (
                    <IoIosArrowDown className="text-lg" />
                  )}
                </div>
                {visibleSections[index] && (
                  <ul className="mt-4 space-y-4">
                    {filteredItems.map((item) => {
                      const {
                        id,
                        name,
                        description,
                        price,
                        defaultPrice,
                        imageId,
                        isVeg,
                      } = item?.card?.info || {};

                      return (
                        <li
                          key={id}
                          className="flex items-center justify-between p-1 border-b relative"
                        >
                          <div>
                            <h3 className="font-semibold text-lg w-[200px] lg:w-auto text-gray-800">
                              {name}
                            </h3>
                            <p className="text-sm text-gray-500 w-[200px] lg:w-[500px]">
                              {description || "No description available"}
                            </p>
                            <p className="text-md font-medium text-gray-700 mt-1">
                              ₹{price ? price / 100 : defaultPrice / 100}
                            </p>
                            {isVeg !== undefined && (
                              <span
                                className={`inline-block mt-2 px-2 py-1 rounded text-xs font-bold ${
                                  isVeg
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {isVeg ? "Veg" : "Non-Veg"}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col items-center mb-2">
                            {imageId && (
                              <img
                                src={`${CDN_URL}${imageId}`}
                                alt={name}
                                className="w-32 h-32 object-cover rounded-lg mb-4 shadow-md"
                              />
                            )}
                            <div className="flex items-center">
                              {cartItems[id] ? (
                                <div className="-mt-10 border-2 bg-white rounded-lg ">
                                  <button
                                    className="px-3 py-2 -mt-10  text-blue-500 text-md font-bold  shadow"
                                    onClick={() =>
                                      handleRemoveFromCart(item?.card?.info)
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="px-4  -mt-10 text-blue-500">
                                    {cartItems[id]}
                                  </span>
                                  <button
                                    className="px-3 py-2 -mt-10  text-blue-500 text-md font-bold  shadow "
                                    onClick={() =>
                                      handleAddToCart(item?.card?.info)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="px-3 py-2 -mt-10 bg-blue-500 text-white text-sm font-semibold rounded-md shadow hover:bg-blue-600 transition"
                                  onClick={() =>
                                    handleAddToCart(item?.card?.info)
                                  }
                                >
                                  Add to Cart
                                </button>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Pass data to the BrowseMenuButton */}
      <BrowseMenuButton
        menuCategories={filteredCategories}
        scrollToSection={scrollToSection} // Pass scrollToSection
      />
    </div>
  );
};

export default RestaurantMenu;
