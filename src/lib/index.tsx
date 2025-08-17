import { configureStore } from "@reduxjs/toolkit";
import updateSlice from "./features/update";

const store = configureStore({
    reducer:{
        updateSlice
    }
})

export default store


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store