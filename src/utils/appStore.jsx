import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice.jsx"

const appStore=configureStore({
    reducer:{
        cart:cartReducer,
    }
});

export default appStore