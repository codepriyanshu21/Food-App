import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard.jsx";
import Shimmer from "./Shimmer.jsx";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.jsx";
import HeroSection from "./HeroSection.jsx";
import SortOptions from "./SortOptions.jsx";
import { sortByRating, sortByDeliveryTime, sortByCostForTwo, sortByRelevance } from "../utils/sortHelper.jsx";
import { RESTAURANTS_LIST } from '../utils/constants.jsx'

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurant, setFilterRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("relevance"); // Default sort option
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchedData();
  }, []);

  const fetchedData = async () => {
    try {
      const data = await fetch(RESTAURANTS_LIST);
      const json = await data.json();

      const allRestaurants = [];
      const cards = json?.data?.cards || [];

      cards.forEach((card) => {
        if (card?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
          allRestaurants.push(
            ...card.card.card.gridElements.infoWithStyle.restaurants
          );
        }
      });

      // Remove duplicate restaurants based on their unique id
      const uniqueRestaurants = allRestaurants.filter((value, index, self) => {
        return index === self.findIndex((t) => (
          t.info.id === value.info.id
        ));
      });

      setRestaurants(uniqueRestaurants);
      setFilterRestaurant(uniqueRestaurants); // Set initial filtered data to the full list
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const scrollToRestaurants = () => {
    document.getElementById("restaurant-section").scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    switch (option) {
      case "rating":
        setFilterRestaurant(sortByRating(filteredRestaurant));
        break;
      case "deliveryTime":
        setFilterRestaurant(sortByDeliveryTime(filteredRestaurant));
        break;
      case "costForTwo":
        setFilterRestaurant(sortByCostForTwo(filteredRestaurant));
        break;
      default:
        setFilterRestaurant(sortByRelevance(restaurants));
        break;
    }
  };

  if (onlineStatus === false) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-sm">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Looks like you are offline!
          </h1>
          <p className="text-gray-600">
            Please check your internet connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return restaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div>
      {/* Hero section */}
      <div>
        <HeroSection scrollToRestaurants={scrollToRestaurants} />
      </div>
      <div className="max-w-6xl mx-auto mt-20 p-4">
        <div className="w-full h-[1px] bg-black my-4"></div>
        <div className="text-3xl text-black font-bold">What's on your mind</div>
        <div>
          {/* Search and Sort Section */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="flex items-center w-full md:w-auto">
              <input
                className="bg-white flex-grow md:w-[250px] h-10 p-3 text-slate-600 caret-black border-2 rounded-full outline-black placeholder:text-slate-600 placeholder:text-sm"
                placeholder="Search restaurant"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <div
                onClick={() => {
                  const filtered = restaurants.filter((res) =>
                    res.info.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  );
                  setFilterRestaurant(filtered);
                }}
                className="text-2xl -ml-9 text-black font-bold cursor-pointer"
              >
                <CiSearch />
              </div>
            </div>

            {/* Sort Options */}
            <SortOptions
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
          </div>

          <div className="w-full h-[1px] bg-black my-4"></div>

          {/* Restaurant Cards Section */}
          <div
            id="restaurant-section"
            className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10"
          >
            {Array.isArray(filteredRestaurant) &&
              filteredRestaurant.length > 0 ? (
              filteredRestaurant.map((restaurant, index) => (
                <Link
                  to={"/restaurants/" + restaurant?.info?.id}
                  key={`${restaurant.info.id}-${index}`}
                >
                  <RestaurantCard restaurant={restaurant} />
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No restaurants available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
