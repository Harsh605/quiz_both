import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
import examSlice from "./slices/examSlice"
// import userSlice  from "./slices/userSlice.js"


const store = configureStore({
    reducer: {
        userCustom: userSlice,
        examCustom: examSlice
        // const { userData } = useSelector((state) => state.userCustom)
    }
})

export default store