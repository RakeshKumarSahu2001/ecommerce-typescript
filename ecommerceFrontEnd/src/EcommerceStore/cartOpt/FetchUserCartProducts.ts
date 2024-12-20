import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//fetch product from cart by userid
export const fetchCartProductByUserId = createAsyncThunk("cart/fetchCartByUser", async (id:string) => {

    try {
        const response=await axios.get(`/api/v1/users/fetch-all-cart-products/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
})


type initialStateType={
    isRecordfetched:boolean,
    cartProducts:{
    CartID:string,
    Quantity:number,
    ProductName:string,
    Rating:string,
    Price:string,
    Category:string,
    Discount:string,
    Brand:string,
    ThumbnailImage:string
    }[] | null,
    isRecordFetchError:boolean
}

const initialState:initialStateType={
    isRecordfetched:false,
    cartProducts: null,
    isRecordFetchError:false
}

export const useraddToCartSlice = createSlice({
    name: "UserCartProducts",
    initialState,
    reducers: {
        incQuantity:(state,action)=>{
            const product=state.cartProducts?.find(prop=>prop.CartID===action.payload);
            if(product){
                product.Quantity+=1;
            }
        },
        decQuantity:(state,action)=>{
            const product=state.cartProducts?.find(prop=>prop.CartID===action.payload);
            if(product && product.Quantity>1){
                product.Quantity-=1;
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCartProductByUserId.pending,(state)=>{
            state.cartProducts=null,
            state.isRecordFetchError=false,
            state.isRecordfetched=false
        }),
        builder.addCase(fetchCartProductByUserId.fulfilled,(state,action)=>{
            state.cartProducts=action.payload,
            state.isRecordFetchError=false,
            state.isRecordfetched=true
        }),
        builder.addCase(fetchCartProductByUserId.rejected,(state)=>{
            state.cartProducts=null,
            state.isRecordFetchError=true,
            state.isRecordfetched=false
        })
    }
})