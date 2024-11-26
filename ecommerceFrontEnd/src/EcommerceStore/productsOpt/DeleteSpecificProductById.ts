import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const DeleteSpecificProductApi = createAsyncThunk("products/deleteSpecificProduct", async (id: string) => {
    try {
        const response = await axios.delete("/api/v1/admin/delete-product/"+ id);
        return response.data
    } catch (error) {
        throw error
    }
})

type initialStateType = {
    isDeleted: boolean,
    isError: boolean
}

const initialState: initialStateType = {
    isDeleted: false,
    isError: false
}

export const deleteProductSlice = createSlice({
    name: "DeleteProductByIdSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(DeleteSpecificProductApi.pending, (state) => {
            state.isDeleted = false
            state.isError = false
        })
        builder.addCase(DeleteSpecificProductApi.rejected, (state) => {
            state.isDeleted = false
            state.isError = true
        })
        builder.addCase(DeleteSpecificProductApi.fulfilled, (state) => {
            state.isDeleted = true
            state.isError = false
        })
    }
})