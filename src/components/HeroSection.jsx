import React from 'react'
import { BACKGROUND_IMAGE } from '../utils/constants';

const HeroSection = ({ scrollToRestaurants }) => {
    return (
      <div className="relative w-full h-[500px] bg-cover bg-center">
      <img className='w-full h-full object-cover' src={BACKGROUND_IMAGE}></img>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Welcome to Foodie Haven
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mt-4 text-center">
            Discover the best restaurants in Bhiwadi !
          </p>
          <button
            onClick={scrollToRestaurants}
            className="mt-6 px-6 py-2 bg-red-600 text-white text-lg font-semibold rounded-full hover:bg-red-700 transition"
          >
            Explore Restaurants
          </button>
          
        </div>
        
      </div>
    );
  };

export default HeroSection