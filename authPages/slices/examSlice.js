import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../utils/BaseUrl"
import AsyncStorage from '@react-native-async-storage/async-storage';


// export const login = createAsyncThunk("login", async ({ email, password }, { rejectWithValue }) => {
//     let url = `${base_url}/log-in`
//     const config = {
//         headers: {
//             "Content-Type": "application/json"         //bina config ke cookie nhi set honi dhyan rakhna
//         },
//         withCredentials: true
//     }
//     try {
//         const response = await axios.post(url, { email, password }, config); // replace with your API endpoint and data
//         console.log("response", response.data.data)
//         return response.data.data;
//     }
//     catch (error) {
//         return rejectWithValue(error.response.data.message)
//     }
// })

export const allMyExams = createAsyncThunk(
    'allMyExams',
    async ({ hit, name }, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/multipart/form-data',
                    'Authorization': token,
                }
            };

            const url = `http://3.111.23.56:5059/api/my-exam?type=${hit}&name=${name}`;
            const response = await axios.get(url, config);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);




export const examSlice = createSlice({
    name: "exam",
    initialState: {
        isLoading: false,
        error: null,
        allUsers: [],
        examData: null

    },
    extraReducers: (builder) => {
        builder
            .addCase(allMyExams.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allMyExams.fulfilled, (state, action) => {
                state.isLoading = false
                state.examData = action.payload
            })
            .addCase(allMyExams.rejected, (state, action) => {
                state.isLoading = false
                state.examData = null
            })

    }
})


export default examSlice.reducer

