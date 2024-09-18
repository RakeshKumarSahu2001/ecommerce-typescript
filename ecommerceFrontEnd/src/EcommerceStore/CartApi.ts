import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { product } from "../utils/types";


export const CartApi=createAsyncThunk("cart/addToCart",async(itemData)=>{
    try{
        const response=await axios.post(`http://localhost:3000/cart`,itemData);
        return response.data;
    }catch(err){
        throw(err);
    }
})

type initialStateType={
    isAdded:boolean,
    isError:boolean,
    userSelectedProduct:product & {userId:string}
}

const initialState={
    isAdded:false,
    isError:false,
    userSelectedProduct:{
        
    }
}

export const cartSlice=createSlice({
    name:"addToCart",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase()
    }
})