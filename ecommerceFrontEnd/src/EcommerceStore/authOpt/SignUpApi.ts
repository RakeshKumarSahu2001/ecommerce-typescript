import axios from "axios";
import { userAuthData } from "../../utils/types.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const signUpApi = createAsyncThunk("users/createNewUser", async (data: userAuthData,{rejectWithValue}) => {
    try {
        const response = await axios.post("/api/v1/users/register", data);
        return response.data.data;
    } catch (err) {
        console.error(err)
        return rejectWithValue(err);
    }
})

type initialStateType = {
    isUserCreated: boolean,
    userCreationError: boolean,
    addUserInfo: userAuthData | null
}

const initialState: initialStateType = {
    isUserCreated: false,
    userCreationError: false,
    addUserInfo: null
}

export const createNewUserSlice = createSlice({
    name: "createUser",
    initialState,
    reducers: {
        resetUserCreationState: (state) => {
            state.isUserCreated = false;
          }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpApi.pending, (state) => {
            state.isUserCreated = false
            state.userCreationError = false
        })
        builder.addCase(signUpApi.fulfilled, (state, action) => {
            state.isUserCreated = true
            state.addUserInfo = action.payload
        })
        builder.addCase(signUpApi.rejected, (state) => {
            state.userCreationError = true
        })
    }
})


