import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { APICall, Order_SuccessCase, FailedCase, LoadingCase, Login_SuccessCase } from "./funcs"



export const initialState = {
    orders: [],
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
export const LoadOrders = createAsyncThunk(
    "orders/load",
    async(_, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: "orders/load", method: "GET"})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const LoadOrderById = createAsyncThunk(
    "orders/loadById",
    async({id}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: `orders/${id}`, method: "GET"})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const CreateOrder = createAsyncThunk(
    "orders/create",
    async(OrderData, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: "orders/create", method: "POST", data: OrderData})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const UpdateOrder = createAsyncThunk(
    "orders/update",
    async({OrderData}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: `orders/update`, method: "POST", data: OrderData})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const DeleteOrder = createAsyncThunk(
    "orders/delete",
    async({id}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: `orders/delete`, method: "POST", data: {id}})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const OrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        eraseSuccessMessage: (state) => {
            state.error = null
            state.successMessage = null
        },
        logout : (state) => {
            state.user = null
            state.orders = []
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
        builder
        .addCase(LoadOrders.pending, LoadingCase)
        .addCase(LoadOrders.fulfilled, Order_SuccessCase)
        .addCase(LoadOrders.rejected, FailedCase)
        builder
        .addCase(LoadOrderById.pending, LoadingCase)
        .addCase(LoadOrderById.fulfilled, Order_SuccessCase)
        .addCase(LoadOrderById.rejected, FailedCase)
        builder
        .addCase(CreateOrder.pending, LoadingCase)
        .addCase(CreateOrder.fulfilled, Order_SuccessCase)
        .addCase(CreateOrder.rejected, FailedCase)
        builder
        .addCase(UpdateOrder.pending, LoadingCase)
        .addCase(UpdateOrder.fulfilled, Order_SuccessCase)
        .addCase(UpdateOrder.rejected, FailedCase)
    }
})

export default OrdersSlice.reducer