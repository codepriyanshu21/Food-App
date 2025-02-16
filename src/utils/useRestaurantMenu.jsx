import { useState, useEffect } from "react";
import { MENU_API } from "./constants.jsx";


const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);
    const fetchMenu = async () => {
        try {
            const data = await fetch(`${MENU_API}?page-type=REGULAR_MENU&complete-menu=true&lat=28.2014149&lng=76.8275503&restaurantId=${resId}`,{
                headers:{
                    'x-cors-api-key':'temp_4e47944241be61658064b64717ccfed0'
                }
            });
            const json = await data.json();
            console.log("API Response:", json); 
            setResInfo(json.data);
        } catch (error) {
            console.error("Error fetching menu:", error);
        }
    };

    useEffect(() => {
        if (resId) {
            fetchMenu(); 
            window.scrollTo(0,0)
        }
    }, [resId]);

    return resInfo;


}

export default useRestaurantMenu;