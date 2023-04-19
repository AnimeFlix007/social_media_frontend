import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./slice/authSlice"
import modeSlice from "./slice/modeSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        mode: modeSlice
    }
})

export default store