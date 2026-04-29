import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { APICall, Order_SuccessCase, FailedCase, LoadingCase } from "./funcs"



export const initialState = {
    orders: []
}


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
    async({OrderData}, {rejectWithValue}) => {
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
    reducers: {},
    extraReducers: (builder) => {
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