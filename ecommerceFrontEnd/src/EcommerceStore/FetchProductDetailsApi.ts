import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const FetchProductDetailsApi = createAsyncThunk("products/fetchProductById", async (id:number) => {
    // console.log("id",typeof(id))
    try {
        const productDetails = await axios.get("http://localhost:3000/products/"+id)
        // console.log(productDetails)
        return productDetails.data;
    } catch (err) {
        throw err;
    }
})

// designing interface for ptoduct details 
type dimension = {
    width: number,
    height: number,
    depth: number,
}
type review = {
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string
}
type meta = {
    createdAt: string,
    updatedAt: string,
    barcode: string,
    qrCode: string
}

interface productInfo {
    id: string,
    title: string,
    description: string,
    category: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    tags: string[],
    brand: string,
    sku: string,
    weight: number,
    dimensions: dimension,
    warrantyInformation: string,
    shippingInformation: string,
    availabilityStatus: string,
    reviews: review[],
    returnPolicy: string,
    minimumOrderQuantity: number,
    meta: meta,
    images: string[],
    thumbnail: string
}

type initialStateType = {
    loadingStatus: boolean,
    loadingError: boolean,
    productInfo :productInfo
}

const initialState: initialStateType = {
    loadingStatus: false,
    loadingError: false,
    productInfo: {
        id: 0,
        title: '',
        description: '',
        category: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        tags: [],
        brand: '',
        sku: '',
        weight: 0,
        dimensions: {
            width: 0,
            height: 0,
            depth: 0,
        },
        warrantyInformation: '',
        shippingInformation: '',
        availabilityStatus: '',
        reviews: [],
        returnPolicy: '',
        minimumOrderQuantity: 0,
        meta: {
            createdAt: '',
            updatedAt: '',
            barcode: '',
            qrCode: '',
        },
        images: [],
        thumbnail: ''
    }
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
            // console.log("payload",action.payload)
            state.productInfo={...action.payload}
        }),
        builder.addCase(FetchProductDetailsApi.rejected,(state)=>{
            state.loadingError=true
        })
    }
})