import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { product } from "../utils/types";

//fetch product from cart by userid
export const fetchCartProductByUserId = createAsyncThunk<product[], string>("cart/fetchCartByUser", async (id:string) => {

    // console.log("id on line no 8 of fetchproductuseruid",id)

    try {
        const allUserCartProducts = await axios.get(`http://localhost:3000/cart?userId=${id}`);
        // console.log("all cart product of user on line no 56", allUserCartProducts)
        return allUserCartProducts.data;
    } catch (err) {
        console.log(err);
        throw err
    }
})


type initialStateType = {
    loadingStatus: boolean,
    loadingError: boolean,
    userSelectedProduct: (product & { quantity: number, userId: string })[]
}

const initialState: initialStateType = {
    loadingStatus: false,
    loadingError: false,
    userSelectedProduct: []
}

export const userCartSlice = createSlice({
    name: "UserCartProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCartProductByUserId.pending, (state) => {
            state.loadingStatus = true
        })
        builder.addCase(fetchCartProductByUserId.fulfilled, (state, action) => {
            state.loadingStatus = false;
            state.userSelectedProduct = [action.payload];
        });
        builder.addCase(fetchCartProductByUserId.rejected, (state) => {
            state.loadingStatus = false;
            state.loadingError = true
        })
    }
})