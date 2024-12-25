import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const FetchProductBrandApi=createAsyncThunk("products/productBrands",async(_,{rejectWithValue})=>{
    try {
        const response=await axios.get("/api/v1/users/all-brand");
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.error(error);
        rejectWithValue(error);
    }
})

type categoryType={
    Brand:string
}

type initialStateType={
    isProdBrandFetched: boolean,
    isErrOccure: boolean,
    productBrands: categoryType[] | null
}

const initialState:initialStateType={
    isProdBrandFetched: false,
    isErrOccure: false,
    productBrands: null
}


export const FetchProductBrandSlice=createSlice({
    name:"productBrands",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(FetchProductBrandApi.pending,(state)=>{
            state.isProdBrandFetched= false
            state.isErrOccure= false
            state.productBrands= null
        })

        builder.addCase(FetchProductBrandApi.fulfilled,(state,action)=>{
            state.isProdBrandFetched= true
            state.isErrOccure= false
            state.productBrands= action.payload
        })

        builder.addCase(FetchProductBrandApi.rejected,(state)=>{
            state.isProdBrandFetched= false
            state.isErrOccure= true
            state.productBrands= null
        })
    }
})