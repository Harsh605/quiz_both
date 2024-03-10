import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../utils/BaseUrl"
import AsyncStorage from '@react-native-async-storage/async-storage';



export const myProfile = createAsyncThunk(
    'myProfile',
    async (_, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/multipart/form-data',
                    'Authorization': token,
                }
            };

            const url = 'https://quiz.metablocktechnologies.org/api/getProfile';
            const response = await axios.get(url, config);
            console.log(response.data)
            return response.data.data;
        } catch (error) {
            return console.log(error)
        }
    }
);


export const sideBarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isLoading: false,
        isAuthenticated: false,
        error: null,
        userData: null,

    },
    extraReducers: (builder) => {
        builder
            .addCase(myProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(myProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                state.userData = action.payload.user
            })
            .addCase(myProfile.rejected, (state, action) => {
                state.error = action.payload
                state.isAuthenticated = false
                state.isLoading = false
                state.userData = null
            })

    }
})


export default sideBarSlice.reducer

