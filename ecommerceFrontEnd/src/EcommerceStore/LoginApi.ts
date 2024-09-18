import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAuthData } from "../utils/types";
import axios from "axios";

export const loginApi = createAsyncThunk("user/loginUser", async (data: userAuthData, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:3000/users?email=${data.email}`)
        if (response.data) {
            // const res = response.data[0];
            // console.log(res)
            return response.data[0];
        } else {
            return rejectWithValue("User doesn't exist")
        }
    } catch (err) {
        throw (err);
    }
})

type initialStateType = {
    isUserExist: boolean,
    loggedInUser: userAuthData | null
}

const initialState: initialStateType = {
    isUserExist: false,
    loggedInUser: null
}

export const checkLoginUser = createSlice({
    name: "authenticateUser",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loginApi.fulfilled, (state, action) => {
            state.isUserExist = true,
                state.loggedInUser = action.payload
        })

        builder.addCase(loginApi.rejected, (state) => {
            state.isUserExist = false
        })
    }
})