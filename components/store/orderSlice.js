import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { APICall, Order_SuccessCase, FailedCase, LoadingCase, Login_SuccessCase, Restaraunt_SuccessCase } from "./funcs"



export const initialState = {
    orders: [],
    restaraunts: [],
    error: null,
    loading: false,
    successMessage: null // New state property for success messages (temporary, will be erased after showing to user)
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
            console.log(OrderData)
            const response = await APICall({endpoint: `orders/update/${OrderData.id}`, method: "POST", data: OrderData})
            
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
            const response = await APICall({endpoint: `orders/delete/${id}`, method: "DELETE"})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const CreateRestaraunt = createAsyncThunk(
    "restaraunts/create",
    async (RestarauntData, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: "restaraunts/create", method: "POST", data: RestarauntData})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const LoadRestaraunts = createAsyncThunk(
    "restaraunts/load",
    async (_, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: "restaraunts/load", method: "GET"})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const UpdateRestaraunt = createAsyncThunk(
    "restaraunts/update",
    async ({id, RestarauntData}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: `restaraunts/update/${id}`, method: "PUT", data: RestarauntData})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const DeleteRestaraunt = createAsyncThunk(
    "restaraunts/delete",
    async ({id}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: `restaraunts/delete/${id}`, method: "DELETE"})
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
        
    },
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
        builder
        .addCase(DeleteOrder.pending, LoadingCase)
        .addCase(DeleteOrder.fulfilled, Order_SuccessCase)
        .addCase(DeleteOrder.rejected, FailedCase)
        builder
        .addCase(CreateRestaraunt.pending, LoadingCase)
        .addCase(CreateRestaraunt.fulfilled, Restaraunt_SuccessCase)
        .addCase(CreateRestaraunt.rejected, FailedCase)
        builder
        .addCase(LoadRestaraunts.pending, LoadingCase)
        .addCase(LoadRestaraunts.fulfilled, Restaraunt_SuccessCase)
        .addCase(LoadRestaraunts.rejected, FailedCase)
        builder
        .addCase(UpdateRestaraunt.pending, LoadingCase)
        .addCase(UpdateRestaraunt.fulfilled, Restaraunt_SuccessCase)
        .addCase(UpdateRestaraunt.rejected, FailedCase)
        builder
        .addCase(DeleteRestaraunt.pending, LoadingCase)
        .addCase(DeleteRestaraunt.fulfilled, Restaraunt_SuccessCase)
        .addCase(DeleteRestaraunt.rejected, FailedCase)
    }
})

export default OrdersSlice.reducer