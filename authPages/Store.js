import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
import examSlice from "./slices/examSlice"
import sideBarSlice from "./slices/sideBarSlice"
import quizSlice from "./slices/quizSlice"
// import userSlice  from "./slices/userSlice.js"


const store = configureStore({
    reducer: {
        userCustom: userSlice,
        examCustom: examSlice,
        sideBarCustom: sideBarSlice,
        quizCustom: quizSlice
        // const { userData } = useSelector((state) => state.userCustom)
    }
})

export default store