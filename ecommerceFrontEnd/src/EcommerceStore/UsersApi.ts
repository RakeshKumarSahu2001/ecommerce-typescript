import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const UsersApi = createAsyncThunk("users", async () => {
    try {
        const response = await axios.get(`http://localhost:3000/users`)
        console.log("response:", response)
    } catch (err) {
        console.log(err)
    }

})

interface userAddress {
    name: string,
    email: string,
    phone: string,
    street: string,
    city: string,
    state: string,
    pinCode: string,
}

type user = {
    email: string,
    password: string,
    role: string,
    addresses: userAddress[]
    id: number
}

let initialState: user[] = []

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(UsersApi.fulfilled, (state, action) => {
            console.log("payload value :", action.payload)
        })
    }
})