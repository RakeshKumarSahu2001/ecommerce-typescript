import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAuthData } from "../utils/types";
import axios from "axios";
// import { LogoutUser } from "./LogoutApi";

export const loginApi = createAsyncThunk("user/loginUser", async (data: userAuthData, { rejectWithValue }) => {
    // console.log(data)
    try {
        const response = await axios.post(`/api/v1/users/login`, data)
        console.log("response result=", response)
        if (response.data) {
            // const res = response.data[0];
            // console.log("response valuue  on line no 12",response.data.data)
            return response.data.data;
        } else {
            return rejectWithValue("User doesn't exist")
        }
    } catch (err) {
        // console.log("errors", err)
        throw (err);
    }
})


export const logoutApi = createAsyncThunk("user/logoutUser", async () => {
    try {
        await axios.post("/api/v1/users/logout")
        console.log("logout successfully")
        return true
    } catch (error) {
        console.log("errors=", error)
        throw error
    }
})

type initialStateType = {
    isUserExist: boolean,
    loggedInUser: { id: string, email: string } | null
}

const initialState: initialStateType = {
    isUserExist: false,
    loggedInUser: null
}

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setUserFromLocalStorage: (state, action) => {
            state.isUserExist = true;
            state.loggedInUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginApi.fulfilled, (state, action) => {
            state.isUserExist = true;
            state.loggedInUser = action.payload;
            localStorage.setItem("loginUserInfo", JSON.stringify(action.payload));
        })
        builder.addCase(loginApi.rejected, (state) => {
            state.isUserExist = false
        })
        builder.addCase(logoutApi.fulfilled, (state) => {
            state.isUserExist = false
            state.loggedInUser = null
            localStorage.removeItem("loginUserInfo")
        })
        builder.addCase(logoutApi.rejected, (state) => {
            console.log("Logout failed");
        });
    }
})