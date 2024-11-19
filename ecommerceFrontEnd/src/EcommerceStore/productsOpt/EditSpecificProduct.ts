import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


export const EditSpecificProductApi = createAsyncThunk("products/EditSpecificProduct", async (id) => {
    try {
        const response = await axios.put("/api/v1/admin/edit-product-by-id", id);
        return response.data;
    } catch (error) {
        throw error;
    }
})

type initialStateType = {
    isError: boolean,
    isupdated: boolean,
    updatedProdcuctInfo: {
        productName: string,
        productDescription: string,
        productRating: string,
        productPrice: string,
        discount: string,
        stock: string,
        brand: string,
        productCategory: string
    } | null
}

const initialState: initialStateType = {
    isError: false,
    isupdated: false,
    updatedProdcuctInfo: null
}

export const EditSpecificProductSlice=createSlice({
    name:"EditProductById",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(EditSpecificProductApi.pending,(state)=>{
            state.isError=false
            state.isupdated=false
            state.updatedProdcuctInfo=null
        })
        builder.addCase(EditSpecificProductApi.rejected,(state)=>{
            state.isError=true
            state.isupdated=false
            state.updatedProdcuctInfo=null
        })
        builder.addCase(EditSpecificProductApi.pending,(state,action)=>{
            state.isError=false
            state.isupdated=false
            state.updatedProdcuctInfo=action.payload
        })
    }
})