import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const AddNewProductApi = createAsyncThunk("products/addNewProduct", async (data) => {
    try {
        const response = await axios.post(`/api/v1/users/add-new-product`, data)
        return response.data
    } catch (err) {
        console.log("error in the addproduct section :", err)
        throw err;
    }
})

type initialStateType = {
    isProductAdded: boolean,
    errorInAddProduct: boolean,
    newProductInformation: {
        productName: string,
        productDescription: string,
        productRating: string,
        productPrice: string,
        productDiscount: string,
        productStockQuantity: string,
        productBrand: string,
        productCategory: string,
    } | null
}

const initialState: initialStateType = {
    isProductAdded: false,
    errorInAddProduct: false,
    newProductInformation: null
}

export const createNewAddProductSlice = createSlice({
    name: "AddNewProductIntoTheSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder.addCase(AddNewProductApi.pending,(state)=>{
            state.isProductAdded=false
        })
        builder.addCase(AddNewProductApi.fulfilled,(state,action)=>{
            state.isProductAdded=true
            state.newProductInformation=action.payload
        })
        builder.addCase(AddNewProductApi.rejected,(state)=>{
            state.isProductAdded=false
            state.errorInAddProduct=true
        })
    }
})