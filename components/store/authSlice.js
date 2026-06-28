import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APICall, FailedCase, LoadingCase, Login_SuccessCase, Order_SuccessCase } from "./funcs";


export const initialState = {
    user: null,
    error: null,
    loading: false,
    token: null,
    successMessage: null, // New state property for success messages (temporary, will be erased after showing to user)
    recentUsers: [],
    allUsers: [],
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
export const GetCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async(_, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("No token found");
            }
            const response = await APICall({endpoint: `auth/getUser/${token}`, method: "GET"});
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);
export const GetAllUsers = createAsyncThunk(
    "auth/getAllUsers",
    async(_, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: `auth/getAllUsers`, method: "GET"});
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
            localStorage.removeItem("token")
        },
        addUser: (state, action) => {
            const users = new Set([action.payload, ...state.recentUsers])
            state.recentUsers = Array.from(users)
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
        builder
        .addCase(GetCurrentUser.pending, LoadingCase)
        .addCase(GetCurrentUser.fulfilled, Login_SuccessCase)
        .addCase(GetCurrentUser.rejected, FailedCase)
        builder
        .addCase(GetAllUsers.pending, LoadingCase)
        .addCase(GetAllUsers.fulfilled, (state, action) => {
            state.allUsers = action.payload.data;
            state.loading = false;
            state.error = null;
        })
        .addCase(GetAllUsers.rejected, FailedCase)
    }

})
export const {logout, addUser} = authSlice.actions
export default authSlice.reducer