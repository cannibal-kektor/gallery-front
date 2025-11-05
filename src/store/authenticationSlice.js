import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {login, register, logout} from "../actions/authThunks.js";
import {getCurrentUser} from "../utils/authManager.js";

const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        user: getCurrentUser(),
        processing: false,
        errorInfo: null,
    },
    reducers: {
        clearErrorMsg: state => {
            state.errorInfo = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.errorInfo = null;
                state.processing = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.processing = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.errorInfo = action.payload;
                state.processing = false;
            })
            .addCase(register.pending, (state) => {
                state.errorInfo = null;
                state.processing = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.processing = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.errorInfo = action.payload;
                state.processing = false;
            })
            .addMatcher(isAnyOf(logout.fulfilled, logout.rejected),
                (state) => {
                    state.user = null;
                });
    },
});

export const {clearErrorMsg} = authenticationSlice.actions;
export default authenticationSlice.reducer;