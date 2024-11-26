import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { product } from "../../utils/types";

export const FetchProductDetailsApi = createAsyncThunk("products/fetchProductById", async (id:string) => {
    try {
        const productDetails = await axios.get(`/api/v1/users/fetch-product-by-id/${id}`)
        return productDetails.data.data.product;
    } catch (err) {
        throw err;
    }
})

// designing interface for ptoduct details 
// type dimension = {
//     width: number,
//     height: number,
//     depth: number,
// }
// type review = {
//     rating: number,
//     comment: string,
//     date: string,
//     reviewerName: string,
//     reviewerEmail: string
// }
// type meta = {
//     createdAt: string,
//     updatedAt: string,
//     barcode: string,
//     qrCode: string
// }

// interface productInfo {
//     id: string,
//     title: string,
//     description: string,
//     category: string,
//     price: number,
//     discountPercentage: number,
//     rating: number,
//     stock: number,
//     tags: string[],
//     brand: string,
//     sku: string,
//     weight: number,
//     dimensions: dimension,
//     warrantyInformation: string,
//     shippingInformation: string,
//     availabilityStatus: string,
//     reviews: review[],
//     returnPolicy: string,
//     minimumOrderQuantity: number,
//     meta: meta,
//     images: string[],
//     thumbnail: string
// }

type initialStateType = {
    loadingStatus: boolean,
    loadingError: boolean,
    productInfo :product |null
}

const initialState: initialStateType = {
    loadingStatus: false,
    loadingError: false,
    productInfo: null
};

export const ProductDetailsSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {

    },
    extraReducers:(builder)=>{
        builder.addCase(FetchProductDetailsApi.pending,(state)=>{
            state.loadingStatus=true
        }),
        builder.addCase(FetchProductDetailsApi.fulfilled,(state,action)=>{
            state.loadingStatus=false,
            state.productInfo=action.payload[0]
        }),
        builder.addCase(FetchProductDetailsApi.rejected,(state)=>{
            state.loadingError=true
        })
    }
})