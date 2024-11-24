import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { product } from "../../utils/types";

export const ProductApi = createAsyncThunk("products/fetchAllProducts", async () => {
    try {
        const response = await axios.get(`/api/v1/users/fetch-all-products`);
        return response.data.data.products;
    } catch (err) {
        console.log(err)
        throw err;
    }
})


type initialStateType = {
    loadingStatus: boolean,
    loadingError: boolean,
    allProducts: product[]
}
let initialState: initialStateType = {
    loadingStatus: false,
    loadingError: false,
    allProducts: [],
}

export const ProductSlice = createSlice(
    {
        name: "allStoreProducts",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(ProductApi.pending, (state) => {
                state.loadingStatus = true
            })
            builder.addCase(ProductApi.fulfilled, (state, action) => {
                // console.log("payload", action.payload)
                state.loadingStatus = false;
                state.allProducts = action.payload
                // console.log("allproduct",state.allProducts)
            })
            builder.addCase(ProductApi.rejected, (state) => {
                state.loadingError = true
            })
        }
    }
)

