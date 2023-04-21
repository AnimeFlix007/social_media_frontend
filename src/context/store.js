import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./slice/authSlice"
import modeSlice from "./slice/modeSlice"
import userSlice from "./slice/userSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        mode: modeSlice,
        users: userSlice
    }
})

export default store