import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authenticationSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
});