import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_DATA } from "../../BASE_URL";


export const APICall = async ({endpoint, method = "GET", data = null}) => {
    try {
        const response = await axios({
            method,
            url: `${BASE_DATA.API_URL}/${endpoint}`,
            data: data
        })
        return response.data
    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
}


export const LoadingCase = (state) => {
    state.loading = true
    state.error = null
    state.successMessage = null
}
export const Order_SuccessCase = (state, action) => {
    state.loading = false
    state.successMessage = action.payload.message || "Operation successful"
    state.orders = action.payload.data
}
export const Login_SuccessCase = (state, action) => {
    state.loading = false
    state.successMessage = action.payload.message || "Login successful"
    state.user = action.payload.data
    state.token = localStorage.setItem("token", action.payload.data.id)
}
export const Restaraunt_SuccessCase = (state, action) => {
    state.loading = false
    state.successMessage = action.payload.message || "Restaraunt created successfully"
    state.restaraunts = action.payload.data
}
export const FailedCase = (state, action) => {
    state.loading = false
    state.successMessage = null
    state.error = action.payload.message || "An error occurred"
    console.error("Error:", action.payload.message || action.payload)
}
