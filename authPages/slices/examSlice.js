import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../utils/BaseUrl"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const allMyExams = createAsyncThunk(
    'allMyExams',
    async ({ hit, name }, thunkAPI) => {
        console.log("hit..............................................", hit)
        console.log("name", name)
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("token", token)
            const config = {
                headers: {
                    'Content-Type': 'application/multipart/form-data',
                    'Authorization': token,
                }
            };


            const url = `https://quiz.metablocktechnologies.org/api/my-exam?name=${name}&type=${hit}`;
            const response = await axios.get(url, config);
            console.log("response...............................", response.data)
            return response.data.data.userGameList;
        } catch (error) {
            return console.log("error", error)
        }
    }
);

export const winnerPageAllExams = createAsyncThunk(
    'winnerPageAllExams',
    async ({ name }, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("token", token)
            const config = {
                headers: {
                    'Content-Type': 'application/multipart/form-data',
                    'Authorization': token,
                }
            };


            const url = `https://quiz.metablocktechnologies.org/api/winners-list?&name=${name}`;
            const response = await axios.get(url, config);
            console.log("response...............................", response.data)
            return response.data.data.joingGame;
        } catch (error) {
            return console.log("error", error)
        }
    }
);

export const winnerPageLeadersboard = createAsyncThunk(
    'winnerPageLeadersboard',
    async ({ name, gameId }, thunkAPI) => {
        console.log(name, "gameId....................................", gameId)
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("token", token)
            const config = {
                headers: {
                    'Content-Type': 'application/multipart/form-data',
                    'Authorization': token,
                }
            };

            const url = `https://quiz.metablocktechnologies.org/api/quiz-leadership?name=${name}`;
            const response = await axios.post(url, gameId, config);
            console.log("response...............................", response.data)
            return response.data.data.gameLeadership[0].UserGame;
        } catch (error) {
            return console.log("error", error.message)
        }
    }
);

export const winnersListPageAllDataOfAUserForParticularExam = createAsyncThunk(
    'winnersListPageAllDataOfAUserForParticularExam',
    async ({ que_no, gameId, userId }, thunkAPI) => {
        console.log(que_no, "gameIiid....................................", gameId)
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("token", token)
            const config = {
                headers: {
                    'Content-Type': 'application/multipart/form-data',
                    'Authorization': token,
                }
            };
            const que = 1
            const game = "659c3fdd9b22fdcebbdd7e88"
            // const url = `https://quiz.metablocktechnologies.org/api/quiz-result?gameId=${gameId}&q_no=${que_no}`;
            const url = `https://quiz.metablocktechnologies.org/api/quiz-result?gameId=${gameId}&q_no=${que_no}&userId=${userId}`;
            // const url = `https://quiz.metablocktechnologies.org/api/quiz-result?gameId=${gameId}&q_no=${que_no}`;
            const response = await axios.get(url, config);
            console.log("response...............................", response.data)
            return response.data.data.gameQuestion[0];
        } catch (error) {
            return console.log("error", error.message)
        }
    }
);

export const correctPercentPageAllExams = createAsyncThunk(
    'correctPercentPageAllExams',
    async ({ name }, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("token", token)
            const config = {
                headers: {
                    'Content-Type': 'application/multipart/form-data',
                    'Authorization': token,
                }
            };


            const url = `https://quiz.metablocktechnologies.org/api/correct-percent?name=${name}`;
            const response = await axios.get(url, config);
            console.log("response...............................", response.data)
            return response.data.data.joingGame;
        } catch (error) {
            return console.log("error", error)
        }
    }
);

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

export const getGameLanguage = createAsyncThunk(
    'getGameLanguage',
    async ({ _id }, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("token", token)
            const config = {
                headers: {
                    'Content-Type': 'application/multipart/form-data',
                    'Authorization': token,
                }
            };
            const url = `https://quiz.metablocktechnologies.org/api/game-lang?_id=${_id}`;
            const response = await axios.get(url, config);
            console.log("response ...............................", response.data)
            return response.data.data.myGame;
        } catch (error) {
            return console.log("error", error)
        }
    }
);
export const getHowToPlayImage = createAsyncThunk(
    'getHowToPlayImage',
    async (_, thunkAPI) => {
        console.log("response img...............................")
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("token", token)
            const config = {
                headers: {
                    'Content-Type': 'application/multipart/form-data',
                    'Authorization': token,
                }
            };
            const url = `https://quiz.metablocktechnologies.org/api/how-to-play`;
            const response = await axios.get(url, config);
            console.log("response img...............................", response.data)
            return response.data.data.img;
        } catch (error) {
            return console.log("error", error)
        }
    }
);

export const examSlice = createSlice({
    name: "exam",
    initialState: {
        isLoading: false,
        error: null,
        allUsers: [],
        examData: null,
        winnerPageAllExamsData: null,
        winnerPageLeadersboardData: null,
        winnersListPageAllDataOfAUserForParticularExamData: null,
        correctPercentPageAllExamsData: null,
        getHowToPlayImageData: null,
        getGameLanguageData: null,
        updateGameLanguageData: null

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
            .addCase(winnerPageAllExams.pending, (state) => {
                state.isLoading = true
            })
            .addCase(winnerPageAllExams.fulfilled, (state, action) => {
                state.isLoading = false
                state.winnerPageAllExamsData = action.payload
            })
            .addCase(winnerPageAllExams.rejected, (state, action) => {
                state.isLoading = false
                state.winnerPageAllExamsData = null
            })
            .addCase(winnerPageLeadersboard.pending, (state) => {
                state.isLoading = true
            })
            .addCase(winnerPageLeadersboard.fulfilled, (state, action) => {
                state.isLoading = false
                state.winnerPageLeadersboardData = action.payload
            })
            .addCase(winnerPageLeadersboard.rejected, (state, action) => {
                state.isLoading = false
                state.winnerPageLeadersboardData = null
            })
            .addCase(winnersListPageAllDataOfAUserForParticularExam.pending, (state) => {
                state.isLoading = true
            })
            .addCase(winnersListPageAllDataOfAUserForParticularExam.fulfilled, (state, action) => {
                state.isLoading = false
                state.winnersListPageAllDataOfAUserForParticularExamData = action.payload
            })
            .addCase(winnersListPageAllDataOfAUserForParticularExam.rejected, (state, action) => {
                state.isLoading = false
                state.winnersListPageAllDataOfAUserForParticularExamData = null
            })
            .addCase(correctPercentPageAllExams.pending, (state) => {
                state.isLoading = true
            })
            .addCase(correctPercentPageAllExams.fulfilled, (state, action) => {
                state.isLoading = false
                state.correctPercentPageAllExamsData = action.payload
            })
            .addCase(correctPercentPageAllExams.rejected, (state, action) => {
                state.isLoading = false
                state.correctPercentPageAllExamsData = null
            })
            .addCase(getHowToPlayImage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getHowToPlayImage.fulfilled, (state, action) => {
                state.isLoading = false
                state.getHowToPlayImageData = action.payload
            })
            .addCase(getHowToPlayImage.rejected, (state, action) => {
                state.isLoading = false
                state.getHowToPlayImageData = null
            })
            .addCase(getGameLanguage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGameLanguage.fulfilled, (state, action) => {
                state.isLoading = false
                state.getGameLanguageData = action.payload
            })
            .addCase(getGameLanguage.rejected, (state, action) => {
                state.isLoading = false
                state.getGameLanguageData = null
            })
            .addCase(updateGameLanguage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateGameLanguage.fulfilled, (state, action) => {
                state.isLoading = false
                state.updateGameLanguageData = action.payload
            })
            .addCase(updateGameLanguage.rejected, (state, action) => {
                state.isLoading = false
                state.updateGameLanguageData = null
            })

    }
})


export default examSlice.reducer

