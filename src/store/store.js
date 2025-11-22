import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authenticationSlice.js";
import imageReducer from "./imageSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        images: imageReducer
    },
});