import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const AddNewProductApi = createAsyncThunk("products/addNewProduct",
    async (data: {
        productName: string,
        productDescription: string,
        productRating: number,
        productPrice: number,
        discount: number,
        stock: number,
        brand: string,
        productCategory: string,
        thumbNailImage: FileList,
        images: FileList
    }, { rejectWithValue }) => {

        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === "images" && value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        formData.append("images", value[i]);
                    }
                } else if (value instanceof FileList) {
                    formData.append(key, value[0]);
                } else {
                    formData.append(key, value.toString());
                }
            });

            console.log("product data", data);

            const response = await axios.post(`/api/v1/admin/add-new-product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data
        } catch (err) {
            console.error(err);
            return rejectWithValue(err);
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
        setProductParameterToInitialState: (state) => {
            state.isProductAdded = false
            state.errorInAddProduct = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(AddNewProductApi.pending, (state) => {
            state.isProductAdded = false
        })
        builder.addCase(AddNewProductApi.fulfilled, (state, action) => {
            state.isProductAdded = true
            state.newProductInformation = action.payload
        })
        builder.addCase(AddNewProductApi.rejected, (state) => {
            state.isProductAdded = false
            state.errorInAddProduct = true
        })
    }
})