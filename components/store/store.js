import { configureStore } from "@reduxjs/toolkit";
import OrdersReducer from "./orderSlice"
import AuthReducer from "./authSlice"


export const store = configureStore({
    reducer: {
        orders: OrdersReducer,
        auth: AuthReducer
    }
})
export default store


