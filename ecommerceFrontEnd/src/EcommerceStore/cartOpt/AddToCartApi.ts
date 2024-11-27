import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { product } from "../../utils/types";

type catInfoType={
    productID:string,
    quantity:number,
    AuthID:string
  }

export const addToCartApi=createAsyncThunk("cart/addToCart",async(cartInfo:catInfoType)=>{
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
        builder.addCase(addToCartApi.fulfilled,(state)=>{
            state.isAdded=true;
        })
        builder.addCase(addToCartApi.rejected,(state)=>{
            state.isAdded=false;
            state.isError=true;
        })
    }
})




