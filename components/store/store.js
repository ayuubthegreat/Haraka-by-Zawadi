import { configureStore } from "@reduxjs/toolkit";
import OrdersReducer from "./slice"


export const store = configureStore({
    reducer: {
        orders: OrdersReducer
    }
})
export default store


