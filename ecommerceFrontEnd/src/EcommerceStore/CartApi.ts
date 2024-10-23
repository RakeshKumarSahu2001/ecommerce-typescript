import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { product } from "../utils/types";


export const CartApi=createAsyncThunk("cart/addToCart",async(itemData:(product & {quantity : number,userId : string}))=>{
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
    userSelectedProduct:(product & {quantity : number,userId : string})[]
}

const initialState:initialStateType={
    isAdded:false,
    isError:false,
    userSelectedProduct:[]
}

export const cartSlice=createSlice({
    name:"addToCart",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(CartApi.pending,(state)=>{
            state.isAdded=false;
        })
        builder.addCase(CartApi.fulfilled,(state,action)=>{
            console.log("on line no 38",action.payload)
            state.isAdded=true;
            // state.userSelectedProduct.push()
        })
        builder.addCase(CartApi.rejected,(state)=>{
            state.isAdded=false;
            state.isError=true;
        })
    }
})




