import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./slice/authSlice"
import modeSlice from "./slice/modeSlice"
import userSlice from "./slice/userSlice"
import postSlice from "./slice/postSlice"
import commentSlice from "./slice/commentSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        mode: modeSlice,
        users: userSlice,
        posts: postSlice,
        comments: commentSlice,
    }
})

export default store