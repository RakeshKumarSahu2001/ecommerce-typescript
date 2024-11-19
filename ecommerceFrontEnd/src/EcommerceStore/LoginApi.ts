import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAuthData } from "../utils/types";
import axios from "axios";
// import { LogoutUser } from "./LogoutApi";

type userDataType = {
    id: string;
    email: string;
    Role:string
}

export const loginApi = createAsyncThunk("user/loginUser", async (data: userAuthData, { rejectWithValue }) => {
    // console.log(data)
    try {
        const response = await axios.post(`/api/v1/users/login`, data)

        const userData: userDataType = {
            id: response.data.data.id,
            email: response.data.data.email,
            Role:response.data.data.Role
        }
        if (response.data) {
            // const res = response.data[0];
            // console.log("response valuue  on line no 12",response.data.data)
            return userData;
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

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setUserFromLocalStorage: (state, action) => {
            state.isUserExist = true;
            state.loggedInUser = action.payload;
        },
        clearLoginUserInfoFromLocalStorage:()=>{
            //  console.log(localStorage.getItem("loginUserInfo"))
             localStorage.clear()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginApi.fulfilled, (state, action) => {
            state.isUserExist = true;
            state.loggedInUser = action.payload;
            // console.log("before storing user into localstorage", state.loggedInUser);
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