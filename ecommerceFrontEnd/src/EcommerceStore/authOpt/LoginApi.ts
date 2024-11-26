import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAuthData } from "../../utils/types";
import axios from "axios";

type userDataType = {
    id: string;
    email: string;
    Role:string
}

export const loginApi = createAsyncThunk("user/loginUser", async (data: userAuthData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`/api/v1/users/login`, data)

        const userData: userDataType = {
            id: response.data.data.id,
            email: response.data.data.email,
            Role:response.data.data.Role
        }
        if (response.data) {
            return userData;
        } else {
            return rejectWithValue("User doesn't exist")
        }
    } catch (err) {
        throw (err);
    }
})


export const logoutApi = createAsyncThunk("user/logoutUser", async () => {
    try {
        await axios.post("/api/v1/users/logout")
        return true
    } catch (error) {
        throw error
    }
})
type loggedInUserType = {
    id: string;
    email: string;
    
}

type initialStateType = {
    isUserExist: boolean,
    loggedInUser: loggedInUserType | null
}

const initialState: initialStateType = {
    isUserExist: false,
    loggedInUser: null
}

export const loginSlice = createSlice({
    name: "loginSlice",
    initialState,
    reducers: {
        clearLoginUserInfoFromLocalStorage:()=>{
             localStorage.clear()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginApi.fulfilled, (state, action) => {
            state.isUserExist = true;
            state.loggedInUser = action.payload;
            localStorage.setItem("Id", action.payload.id);
            localStorage.setItem("Email", action.payload.email);
            localStorage.setItem("Role", action.payload.Role);
        })
        builder.addCase(loginApi.rejected, (state) => {
            state.isUserExist = false
        })
        builder.addCase(logoutApi.fulfilled, (state) => {
            state.isUserExist = false
            state.loggedInUser = null
            localStorage.removeItem("loginUserInfo")
        })
        builder.addCase(logoutApi.rejected, () => {
            console.log("Logout failed");
        });
    }
})