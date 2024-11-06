import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AddUserProfInfoById = createAsyncThunk("user/addUserProfileInfo", async (formData) => {
    // console.log("user profile data", formData);

    try {
        const response = await axios.post(`/api/v1/users/add-user-profile-info/${formData?.id}`, formData?.data);
        return response.data;
    } catch (error) {
        console.log("error on line no 10 of add profile info", error);
        throw error;
    }
})

export const fetchUserProfInfoById= createAsyncThunk("user/fetchUserProfileInfo",async(id)=>{
    try {
        const response= await axios.get(`/api/v1/user/fetch-user-profile-info/${id}`);
        console.log("response =",response)
        return response.data.data;
    } catch (error) {
        console.log("error on line no 21 of manage user profile info",error);
        throw error;
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
        FullName: string,
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
        builder.addCase(AddUserProfInfoById.pending, (state) => {
            state.profileDataInsertionError = false
            state.userProfileInfo = null
            state.isProfileDatainserted = false
        })
        builder.addCase(AddUserProfInfoById.fulfilled, (state, action) => {
            state.isProfileDatainserted = true
            state.userProfileInfo = action.payload
            state.profileDataInsertionError = false
        })
        builder.addCase(AddUserProfInfoById.rejected, (state) => {
            state.isProfileDatainserted = true
            state.userProfileInfo = null
            state.profileDataInsertionError = false
        })
    }
})
