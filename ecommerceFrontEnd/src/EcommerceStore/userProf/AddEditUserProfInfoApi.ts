import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userProfileInfoType } from "../../utils/types";

interface FormDataType {
    id: string;
    data: {
        FullName: string;
        Phone: number;
        Street: string;
        PostalCode: number;
        City: string;
        State: string;
        Country: string;
        DateOfBirth: Date;
        Gender: "male" | "female" | "other";
    };
}

export const AddUserProfInfoById = createAsyncThunk(
    "user/addUserProfileInfo",
    async (formData: FormDataType) => {

        try {
            const response = await axios.post(
                `/api/v1/users/add-user-profile-info/${formData.id}`,
                formData.data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const EditUserProfInfoById = createAsyncThunk(
    "user/editUserProfileInfo",
    async (formData: FormDataType) => {

        try {
            const response = await axios.put(
                `/api/v1/users/edit-user-info-by-id/${formData.id}`,
                formData.data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

interface initialStateType {
    isProfData: boolean;
    userInfo: userProfileInfoType | null;
    profileDataError: boolean;
}

const initialState: initialStateType = {
    isProfData: false,
    userInfo: null,
    profileDataError: false,
};

export const manageUserProfInfoSlice = createSlice({
    name: "userInfoAddEditSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(AddUserProfInfoById.pending, (state) => {
            state.profileDataError = false;
            state.userInfo = null;
            state.isProfData = false;
        });
        builder.addCase(AddUserProfInfoById.fulfilled, (state, action) => {
            state.isProfData = true;
            state.userInfo = action.payload;
            state.profileDataError = false;
        });
        builder.addCase(AddUserProfInfoById.rejected, (state) => {
            state.isProfData = true;
            state.userInfo = null;
            state.profileDataError = false;
        });

        builder.addCase(EditUserProfInfoById.pending, (state) => {
            state.profileDataError = false;
            state.userInfo = null;
            state.isProfData = false;
        });
        builder.addCase(EditUserProfInfoById.fulfilled, (state, action) => {
            state.isProfData = true;
            state.userInfo = action.payload;
            state.profileDataError = false;
        });
        builder.addCase(EditUserProfInfoById.rejected, (state) => {
            state.isProfData = true;
            state.userInfo = null;
            state.profileDataError = false;
        });
    },
});
