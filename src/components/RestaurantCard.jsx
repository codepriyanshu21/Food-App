import React from 'react';
import { CDN_URL } from '../utils/constants.jsx';
import { IoStarSharp } from "react-icons/io5";

const RestaurantCard = ({ restaurant }) => {
    const {
        name,
        cuisines,
        cloudinaryImageId,
        costForTwo,
        avgRating,
        sla: { deliveryTime } = {},
    } = restaurant.info;

    return (
        <div className="w-[280px] h-[300px] bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-2xl transition-transform duration-300 hover:scale-105 cursor-pointer">
        {/* Image */}
        <img
          className="w-full h-[170px] object-cover rounded-t-lg loading-lazy"
          alt="restaurant-logo"
          src={CDN_URL + cloudinaryImageId}
        />
      
        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
          <p className="text-sm text-gray-600 truncate">{cuisines.join(", ")}</p>
          <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
            <span className="flex items-center">
              <div className="w-4 h-4 text-green-500 mr-1">
                <IoStarSharp />
              </div>
              {avgRating ||"NA"}
            </span>
            <span>{costForTwo}</span>
            <span>{deliveryTime} mins</span>
          </div>
        </div>
      </div>
      
    );
};

export default RestaurantCard;
