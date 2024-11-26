import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { product } from "../../utils/types";


export const addToCartApi=createAsyncThunk("cart/addToCart",async(cartInfo)=>{
    console.log("cart item",cartInfo);
    try{
        const response=await axios.post(`/api/v1/users/add-product-to-cart`,cartInfo);
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

export const addToCartSlice=createSlice({
    name:"addToCart",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addToCartApi.pending,(state)=>{
            state.isAdded=false;
        })
        builder.addCase(addToCartApi.fulfilled,(state,action)=>{
            console.log("on line no 38",action.payload)
            state.isAdded=true;
            // state.userSelectedProduct.push()
        })
        builder.addCase(addToCartApi.rejected,(state)=>{
            state.isAdded=false;
            state.isError=true;
        })
    }
})




