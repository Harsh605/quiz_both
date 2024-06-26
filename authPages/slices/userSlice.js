import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../utils/BaseUrl"
import AsyncStorage from '@react-native-async-storage/async-storage';


export const login = createAsyncThunk("login", async ({ email, password }, { rejectWithValue }) => {
    let url = `${base_url}/log-in`
    const config = {
        headers: {
            "Content-Type": "application/json"         //bina config ke cookie nhi set honi dhyan rakhna
        },
        withCredentials: true
    }
    try {
        const response = await axios.post(url, { email, password }, config); // replace with your API endpoint and data
        console.log("response", response.data.data)
        return response.data.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const register = createAsyncThunk("register", async ({ name, email, password, mobile, confirm_password }) => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        }
    }
    let url = `https://quiz.metablocktechnologies.org/api/signup`
    try {
        const response = await axios.post(url, { name, email, password, mobile }, config); // replace with your API endpoint and data
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.log(error)

    }
})

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
export const updateProfile = createAsyncThunk(
    'updateGameLanguage',
    async ({ formData }, thunkAPI) => {
        console.log("first..............");
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("token", token);

            const myHeaders = new Headers();
            myHeaders.append('Authorization', token);
            myHeaders.append('Content-Type', 'multipart/form-data');



            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formData,
                redirect: 'follow',
            };

            const url = `https://quiz.metablocktechnologies.org/api/edit-profile`;
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log("data.....................................................", data)
            return data;
        } catch (error) {
            console.error("error", error);
            throw error; // Re-throw the error to let Redux Toolkit handle it properly
        }
    }
);
export const updateKyc = createAsyncThunk(
    'updateKyc',
    async ({ formData }, thunkAPI) => {
        console.log("first..............");
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("token", token);

            const myHeaders = new Headers();
            myHeaders.append('Authorization', token);
            // myHeaders.append('Content-Type', 'multipart/form-data');




            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formData,
                redirect: 'follow',
            };

            const url = `https://quiz.metablocktechnologies.org/api/upload-kyc`;
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log("data.....................................................", data)
            return data;
        } catch (error) {
            console.error("error..................................", error);
            throw error; // Re-throw the error to let Redux Toolkit handle it properly
        }
    }
);



export const allOnGoingExams = createAsyncThunk(
    'allOnGoingExams',
    async (_, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/multipart/form-data',
                    'Authorization': token,
                }
            };

            const url = 'https://quiz.metablocktechnologies.org/api/home-page';
            const response = await axios.get(url, config);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const allSliders = createAsyncThunk("allSliders", async () => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        },
        withCredentials: true
    }
    let url = `https://quiz.metablocktechnologies.org/api/slide-list`
    try {
        const response = await axios.get(url, config); // replace with your API endpoint and data
        return response.data.data.slides;
    } catch (error) {
        return console.log(error)
    }
})
export const allSocialLinks = createAsyncThunk(
    'allSocialLinks',
    async (_, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/multipart/form-data',
                    'Authorization': token,
                }
            };

            const url = 'https://quiz.metablocktechnologies.org/api/social-links';
            const response = await axios.get(url, config);
            return response.data.data.links;
        } catch (error) {
            return console.log(error)
        }
    }
);
export const pdowinLogo = createAsyncThunk(
    'pdowinLogo',
    async (_, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/multipart/form-data',
                    'Authorization': token,
                }
            };

            const url = 'https://quiz.metablocktechnologies.org/api/get-logo';
            const response = await axios.get(url, config);
            return response.data.data.logo;
        } catch (error) {
            return console.log(error)
        }
    }
);

export const adminRegister = createAsyncThunk("adminRegister", async ({ email, password }, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        },
        withCredentials: true
    }
    let url = `${baseUrl}/api/v1/register/admin`
    try {
        const response = await axios.post(url, { email, password }, config); // replace with your API endpoint and data
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})

export const logout = createAsyncThunk(
    'logout',
    async (_, { rejectWithValue }) => {
        console.log(" ")
        try {
            const token = await AsyncStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type": "application/multipart/form-data",
                    Authorization: token,
                },
            };

            await axios.get(`${base_url}/log-out`, config);
            await AsyncStorage.clear();
        } catch (error) {
            return console.log(error)
        }
    }
);
export const loadUser = createAsyncThunk("loadUser", async () => {
    let url = `${baseUrl}/api/v1/me`
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    }
    try {
        const response = await axios.post(url, {}, config); // replace with your API endpoint and data
        return response.data;
    }
    catch (error) {
        throw new Error(error.response.data.error)
    }
})

export const updatePassword = createAsyncThunk("updatePassword", async ({ oldPassword, newPassword, confirmPassword }) => {
    let url = `${baseUrl}/api/v1/password/Update`
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
    try {
        const response = await axios.put(url, { oldPassword, newPassword, confirmPassword }, config)
        return response.data
    } catch (error) {
        return error.response.data.error
    }


})


export const getAllUsers = createAsyncThunk("getAllUsers", async () => {

    let url = `${baseUrl}/api/v1/admin/users`
    const config = { headers: { "Content-Type": "application/multipart/form-data" }, withCredentials: true };
    try {
        const response = await axios.post(url, {}, config)
        return response.data.users
    } catch (error) {
        return error.response.data.error
    }
})
export const getSingleUser = createAsyncThunk("getSingleUser", async () => {

    let url = `${baseUrl}/api/v1/admin/users`
    const config = { headers: { "Content-Type": "application/multipart/form-data" }, withCredentials: true };
    try {
        const response = await axios.post(url, {}, config)
        return response.data.users
    } catch (error) {
        return error.response.data.error
    }
})

export const deleteUser = createAsyncThunk("deleteUser", async ({ id }, { rejectWithValue }) => {
    let url = `${baseUrl}/api/v1/admin/user/delete/${id}`
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
    try {
        const response = await axios.post(url, {}, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
export const editRoleOfUser = createAsyncThunk("editRoleOfUser", async ({ id }, { rejectWithValue }) => {
    let url = `${baseUrl}/api/v1/admin/user/role/update/${id}`
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
    try {
        const response = await axios.put(url, {}, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
export const updateUser = createAsyncThunk("editUser", async ({ id, email, oldPassword, newPassword }, { rejectWithValue }) => {
    let url = `${baseUrl}/api/v1/admin/user/update/${id}`
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
    try {
        const response = await axios.put(url, { email, oldPassword, newPassword }, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
export const getSingleUserAdmin = createAsyncThunk("getSingleUserAdmin", async (id, { rejectWithValue }) => {
    let url = `${baseUrl}/api/v1/admin/user/${id}`
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
    try {
        const response = await axios.post(url, {}, config)
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
export const activeTabFunc = createAsyncThunk("activeTab", async ({ activeTab }) => {
    return activeTab
})


export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        isAuthenticated: false,
        error: null,
        userData: null,
        isUpdated: false,
        isCreated: false,
        isDeleted: false,
        allUsers: [],
        data: null,
        SingleUserAdmin: null,
        allLiveExams: null,
        sliders: null,
        myProfileData: null,
        socialLinks: null,
        brandLogo: null,
        activeTabState: 'Home',
        isProfileUpdate: false,
        isKycUpdate: false,
        isKycLoading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminRegister.pending, (state) => {
                state.isLoading = true
            })
            .addCase(adminRegister.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                state.userData = action.payload.user
            })
            .addCase(adminRegister.rejected, (state, action) => {
                state.error = action.payload
                state.isAuthenticated = false
                state.isLoading = false
                state.userData = null
            })

            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isCreated = true
                state.data = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isCreated = false
                state.data = null
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true

            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                state.userData = action.payload.user
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload
                state.isAuthenticated = false
                state.isLoading = false
                state.userData = null
            })

            .addCase(logout.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.userData = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false

            })

            .addCase(loadUser.pending, (state) => {
                state.isLoading = true
                state.isAuthenticated = false
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                state.userData = action.payload.user
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.error = action.error.message
                state.isAuthenticated = false
                state.isLoading = false
                state.userData = null

            })
            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isUpdated = action.payload.success

            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.error = action.error
                state.isUpdated = action.payload.success
                state.isLoading = false

            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isProfileUpdate = true

            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.error = action.error
                state.isProfileUpdate = false
                state.isLoading = false

            })
            .addCase(updateKyc.pending, (state) => {
                state.isKycLoading = true
            })
            .addCase(updateKyc.fulfilled, (state, action) => {
                state.isKycLoading = false;
                state.isKycUpdate = true;
            })
            .addCase(updateKyc.rejected, (state, action) => {
                state.error = action.error; // Set error state or handle it appropriately
                state.isKycUpdate = false;
                state.isKycLoading = false;
            })

            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isDeleted = true

            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.error
                state.isDeleted = false
                state.isLoading = false

            })
            .addCase(editRoleOfUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editRoleOfUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload

            })
            .addCase(editRoleOfUser.rejected, (state, action) => {
                state.error = action.error
                state.data = null
                state.isLoading = false

            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isUpdated = true
                state.data = action.payload

            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isUpdated = false
                state.isLoading = false
                state.data = null

            })
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.allUsers = action.payload

            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.error = action.error
                state.allUsers = null
                state.isLoading = false

            })
            .addCase(getSingleUserAdmin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSingleUserAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.SingleUserAdmin = action.payload

            })
            .addCase(getSingleUserAdmin.rejected, (state, action) => {
                state.error = action.error
                state.SingleUserAdmin = null
                state.isLoading = false

            })
            .addCase(allOnGoingExams.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allOnGoingExams.fulfilled, (state, action) => {
                state.isLoading = false
                state.allLiveExams = action.payload

            })
            .addCase(allOnGoingExams.rejected, (state, action) => {

                state.allLiveExams = null
                state.isLoading = false

            })
            .addCase(allSliders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allSliders.fulfilled, (state, action) => {
                state.isLoading = false
                state.sliders = action.payload

            })
            .addCase(allSliders.rejected, (state, action) => {

                state.sliders = null
                state.isLoading = false

            })
            .addCase(myProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(myProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.myProfileData = action.payload

            })
            .addCase(myProfile.rejected, (state, action) => {
                state.myProfileData = null
                state.isLoading = false
            })
            .addCase(allSocialLinks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allSocialLinks.fulfilled, (state, action) => {
                state.isLoading = false
                state.socialLinks = action.payload

            })
            .addCase(allSocialLinks.rejected, (state, action) => {
                state.socialLinks = null
                state.isLoading = false
            })
            .addCase(pdowinLogo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(pdowinLogo.fulfilled, (state, action) => {
                state.isLoading = false
                state.brandLogo = action.payload

            })
            .addCase(pdowinLogo.rejected, (state, action) => {
                state.brandLogo = null
                state.isLoading = false
            })
            .addCase(activeTabFunc.pending, (state) => {
                state.isLoading = true
            })
            .addCase(activeTabFunc.fulfilled, (state, action) => {
                state.activeTabState = action.payload
                state.isLoading = false
            })
            .addCase(activeTabFunc.rejected, (state, action) => {
                state.isLoading = false
            })




    }
})


export default userSlice.reducer

