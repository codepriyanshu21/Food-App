// src/utils/sortUtils.js

export const sortByRating = (restaurants) => {
    return [...restaurants].sort((a, b) => b.info.avgRating - a.info.avgRating);
  };
  
  export const sortByDeliveryTime = (restaurants) => {
    return [...restaurants].sort((a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime);
  };
  
  export const sortByCostForTwo = (restaurants) => {
    return [...restaurants].sort((a, b) => a.info.costForTwo - b.info.costForTwo);
  };
  
  export const sortByRelevance = (restaurants) => {
    return restaurants; // Return as is for relevance (default sort)
  };
  