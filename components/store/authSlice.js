import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APICall, FailedCase, LoadingCase, Login_SuccessCase, Order_SuccessCase } from "./funcs";


export const initialState = {
    user: null,
    error: null,
    loading: false,
    successMessage: null // New state property for success messages (temporary, will be erased after showing to user)
}

export const RegisterUser = createAsyncThunk(
    "auth/register",
    async({user}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: "auth/register", method: "POST", data: user});
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const LoginUser = createAsyncThunk(
    "auth/login",
    async({user}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: "auth/login", method: "POST", data: user});
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout : (state) => {
            state.user = null
            state.error = null
            state.loading = false
            state.successMessage = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(RegisterUser.pending, LoadingCase)
        .addCase(RegisterUser.fulfilled, Login_SuccessCase)
        .addCase(RegisterUser.rejected, FailedCase)
        builder
        .addCase(LoginUser.pending, LoadingCase)
        .addCase(LoginUser.fulfilled, Login_SuccessCase)
        .addCase(LoginUser.rejected, FailedCase)
    }

})
export const {logout} = authSlice.actions
export default authSlice.reducer