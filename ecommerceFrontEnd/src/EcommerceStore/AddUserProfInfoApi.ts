import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AddUserProfInfoApi = createAsyncThunk("user/addUserProfileInfo", async (data) => {
    try {
        const response = await axios.post("", data)
        return response.data;
    } catch (error) {
        console.log("error on line no 10 of add profile info", error)
    }
})

enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

interface initialStateType {
    isProfileDatainserted: boolean,
    userProfileInfo: {
        Fullname: string,
        Phone: number,
        Street: string,
        PostalCode: number,
        City: string,
        State: string,
        Country: string,
        DateOfBirth: Date,
        Gender: Gender
    } | null,
    profileDataInsertionError: boolean
}

const initialState: initialStateType = {
    isProfileDatainserted: false,
    userProfileInfo: null,
    profileDataInsertionError: false
}

export const AddUserProfInfoSlice = createSlice({
    name: "userInfoSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(AddUserProfInfoApi.pending, (state, action) => {
            state.profileDataInsertionError = false
            state.userProfileInfo = null
            state.isProfileDatainserted = false
        })
        builder.addCase(AddUserProfInfoApi.fulfilled, (state, action) => {
            state.isProfileDatainserted = true
            state.userProfileInfo = action.payload
            state.profileDataInsertionError = false
        })
        builder.addCase(AddUserProfInfoApi.rejected, (state, action) => {
            state.isProfileDatainserted = true
            state.userProfileInfo = null
            state.profileDataInsertionError = false
        })
    }
})
