import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./slice/authSlice"
import modeSlice from "./slice/modeSlice"
import userSlice from "./slice/userSlice"
import postSlice from "./slice/postSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        mode: modeSlice,
        users: userSlice,
        posts: postSlice
    }
})

export default store