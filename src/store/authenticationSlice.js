import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {login, logout} from "../actions/authThunks.js";
import {getCurrentUser} from "../utils/authManager.js";

const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        user: getCurrentUser()
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addMatcher(isAnyOf(logout.fulfilled, logout.rejected),
                (state) => {
                    state.user = null;
                });
    },
});
export default authenticationSlice.reducer;