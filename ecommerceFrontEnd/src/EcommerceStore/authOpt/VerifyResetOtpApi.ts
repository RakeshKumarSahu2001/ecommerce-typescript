import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type verifyResetOtpDataType={
    email:string;
    otp:string;
    password:string;
}
export const VerifyResetOtpApi = createAsyncThunk("users/verifyResetOtp", async (data:verifyResetOtpDataType, { rejectWithValue }) => {
    console.log("Data",data);
    try {
        const response = await axios.post("/api/v1/users/reset-password", data);
        return response.data.data;
    } catch (error) {
        console.error(error);
        rejectWithValue(error);
    }
})

type initialStateType={
    isReseted:boolean;
    isError:boolean;
}
const initialState:initialStateType={
    isReseted:false,
    isError:false
}

export const VerifyResetOtpSlice=createSlice({
    name:"verifyResetOtp",
    initialState,
    reducers:{
        setToInitValue:(state)=>{
            state.isError=false;
            state.isReseted=false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(VerifyResetOtpApi.pending,(state)=>{
            state.isReseted=false;
            state.isError=false;
        })
        builder.addCase(VerifyResetOtpApi.fulfilled,(state,action)=>{
            state.isReseted=action.payload.isReseted;
            state.isError=false;
        })
        builder.addCase(VerifyResetOtpApi.rejected,(state)=>{
            state.isReseted=false;
            state.isError=true;
        })
    }
})