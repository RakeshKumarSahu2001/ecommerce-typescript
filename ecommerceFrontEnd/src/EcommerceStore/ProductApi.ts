import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { product } from "../utils/types";

//action
export const ProductApi = createAsyncThunk("products/fetchAllProducts", async () => {
    try {
        const response = await axios.get(`http://localhost:3000/products`);
        return response.data;
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
        reducers: {
            // addProduct: (state, action) => {

            //     //need to write the code if want to add n
            // }
        },
        extraReducers: (builder) => {
            builder.addCase(ProductApi.pending, (state) => {
                state.loadingStatus = true
            })
            builder.addCase(ProductApi.fulfilled, (state, action) => {
                // console.log("payload", action.payload)
                state.loadingStatus = false;
                state.allProducts = action.payload
            })
            builder.addCase(ProductApi.rejected, (state) => {
                state.loadingError = true
            })
        }
    }
)

