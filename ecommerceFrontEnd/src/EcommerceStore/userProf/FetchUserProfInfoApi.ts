import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userProfileInfoType } from "../../utils/types";


export const fetchUserProfInfoById = createAsyncThunk("user/fetchUserProfileInfo", async (id:string) => {
    try {
        const response = await axios.get(`/api/v1/users/fetch-user-profile-info/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
})


interface initialStateType {
    isProfileDataInserted: boolean,
    userProfileInfo: userProfileInfoType | null,
    profileDataInsertionError: boolean
}

const initialState: initialStateType = {
    isProfileDataInserted: false,
    userProfileInfo: null,
    profileDataInsertionError: false
}

export const FetchUserProfInfoSlice = createSlice({
    name: "userInfoSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfInfoById.pending,(state)=>{
            state.isProfileDataInserted=false,
            state.profileDataInsertionError=false,
            state.userProfileInfo=null
        })
        builder.addCase(fetchUserProfInfoById.rejected,(state)=>{
            state.isProfileDataInserted=false,
            state.userProfileInfo=null,
            state.profileDataInsertionError=false
        })
        builder.addCase(fetchUserProfInfoById.fulfilled,(state,action)=>{
            state.isProfileDataInserted=false,
            state.userProfileInfo=action.payload,
            state.profileDataInsertionError=false 
        })
    }
})
