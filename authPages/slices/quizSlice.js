import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../utils/BaseUrl"
import AsyncStorage from '@react-native-async-storage/async-storage';

//instruction page
export const updateGameLanguage = createAsyncThunk(
    'updateGameLanguage',
    async ({ _id, type }, thunkAPI) => {
        console.log("first..............");
        try {
            console.log(_id, type);
            const token = await AsyncStorage.getItem('token');
            console.log("token", token);

            const myHeaders = new Headers();
            myHeaders.append('Authorization', token);
            myHeaders.append('Content-Type', 'application/json');

            const raw = JSON.stringify({
                _id: _id,
                type: type,
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            const url = `https://quiz.metablocktechnologies.org/api/update-game`;
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("error", error);
            throw error; // Re-throw the error to let Redux Toolkit handle it properly
        }
    }
);

export const quizPageEachQuestionLeaderBoard = createAsyncThunk(
    'quizPageEachQuestionLeaderBoard',
    async ({ gameId }, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("token", token)
            const config = {
                headers: {
                    'Content-Type': 'application/multipart/form-data',
                    'Authorization': token,
                }
            };
            const url = `https://quiz.metablocktechnologies.org/api/quiz-leadership`;
            const response = await axios.post(url, gameId, config);
            console.log("response ...............................", response.data)
            return response.data.data;
        } catch (error) {
            return console.log("error", error)
        }
    }
);
// export const quizPageEachQuestionLeaderBoard = createAsyncThunk(
//     'quizPageEachQuestionLeaderBoard',
//     async ({ gameId }, thunkAPI) => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             console.log("token", token)
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/multipart/form-data',
//                     'Authorization': token,
//                 }
//             };
//             const url = `https://quiz.metablocktechnologies.org/api/quiz-leadership`;
//             const response = await axios.post(url, gameId, config);
//             console.log("response ...............................", response.data)
//             return response.data.data;
//         } catch (error) {
//             return console.log("error", error)
//         }
//     }
// );



export const quizSlice = createSlice({
    name: "quiz",
    initialState: {
        isLoading: false,
        error: null,
        allUsers: [],
        quizPageEachQuestionLeaderBoardData: null,


    },
    extraReducers: (builder) => {
        builder
            .addCase(quizPageEachQuestionLeaderBoard.pending, (state) => {
                state.isLoading = true
            })
            .addCase(quizPageEachQuestionLeaderBoard.fulfilled, (state, action) => {
                state.isLoading = false
                state.quizPageEachQuestionLeaderBoardData = action.payload
            })
            .addCase(quizPageEachQuestionLeaderBoard.rejected, (state, action) => {
                state.isLoading = false
                state.quizPageEachQuestionLeaderBoardData = null
            })

    }
})


export default quizSlice.reducer

