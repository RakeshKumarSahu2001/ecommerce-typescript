import axios from "axios";
import { userAuthData } from "../../utils/types.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const signUpApi = createAsyncThunk("users/createNewUser", async (data: userAuthData, { rejectWithValue }) => {
    console.log("data on line no 7 of signup api", data)
    try {
        const response = await axios.post("/api/v1/users/register", data)
        console.log("response in the signup api", response);
        return response.data;
    } catch (err) {
        throw err;
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

    },
    extraReducers: (builder) => {
        builder.addCase(signUpApi.pending, (state) => {
            state.isUserCreated = true
            state.userCreationError = false
        }),
            builder.addCase(signUpApi.fulfilled, (state, action) => {
                state.isUserCreated = false,
                    state.addUserInfo = action.payload;
            }),
            builder.addCase(signUpApi.rejected, (state) => {
                state.userCreationError = true
            })
    }
})


