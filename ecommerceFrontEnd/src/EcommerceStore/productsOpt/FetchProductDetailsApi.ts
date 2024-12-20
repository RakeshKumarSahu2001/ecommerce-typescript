import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { product } from "../../utils/types";

export const FetchProductDetailsApi = createAsyncThunk("products/fetchProductById", async (id:string,{rejectWithValue}) => {
    try {
        const response = await axios.get(`/api/v1/users/fetch-product-by-id/${id}`)
        console.log(response)
        return response.data.data.product;
    } catch (err) {
        console.error(err);
        rejectWithValue(err)
    }
})


type initialStateType = {
    loadingStatus: boolean,
    loadingError: boolean,
    productInfo :product |null
}

const initialState: initialStateType = {
    loadingStatus: false,
    loadingError: false,
    productInfo: null
};

export const ProductDetailsSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {

    },
    extraReducers:(builder)=>{
        builder.addCase(FetchProductDetailsApi.pending,(state)=>{
            state.loadingStatus=true
        }),
        builder.addCase(FetchProductDetailsApi.fulfilled,(state,action)=>{
            state.loadingStatus=false,
            state.productInfo=action.payload[0]
        }),
        builder.addCase(FetchProductDetailsApi.rejected,(state)=>{
            state.loadingError=true
        })
    }
})