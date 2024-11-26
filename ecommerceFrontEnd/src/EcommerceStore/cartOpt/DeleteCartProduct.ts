import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteCartProductApi = createAsyncThunk("cart/deleteCartProduct", async (id: string) => {
    console.log("cartid to be deleted is", id);
    try {
        const response = await axios.delete(`/api/v1/users/delete-cart-product/${id}`);
        console.log("response", response.data);
        return response.data.data;
    } catch (error) {
        console.log("delete cart error", error)
        throw error;
    }
})

type initialStateType = {
    isDeleted: boolean,
    isError: boolean
}

const initialState: initialStateType = {
    isDeleted: false,
    isError: false
}

export const deleteCartProductSlice=createSlice({
    name:"DeleteCartProducts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(deleteCartProductApi.fulfilled,(state)=>{
            state.isDeleted=true
            state.isError=false
        })
        builder.addCase(deleteCartProductApi.rejected,(state)=>{
            state.isDeleted=false
            state.isError=false
        })
    }
})