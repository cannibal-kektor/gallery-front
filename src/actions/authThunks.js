import {createAsyncThunk} from "@reduxjs/toolkit";
import {authService} from "../services/authService.js";
import {userService} from "../services/userService.js";
import {clearTokens, clearUser, getAccessToken, getRefreshToken, setTokens, setUser} from "../utils/authManager.js";

export const login =
    createAsyncThunk("action/login",
        async ({username, password}, {rejectWithValue}) => {
            try {
                let response = await authService.login(username, password);
                setTokens(response.data.accessToken, response.data.refreshToken);
                response = await userService.getUserInfo(username);
                setUser(response.data);
                return response.data;
            } catch (error) {
                console.error(error.message);
                clearUser();
                clearTokens();
                return rejectWithValue(error.response.data);
            }
        }
    );

export const register =
    createAsyncThunk("action/register",
        async ({username, password, email}, {rejectWithValue}) => {
            try {
                const response = await userService.register(username, password, email);
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response.data);
            }
        }
    );

export const logout =
    createAsyncThunk("action/logout",
        async (_, {rejectWithValue}) => {
            try {
                const response = await authService.logout(getAccessToken(), getRefreshToken());
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response.data);
            } finally {
                clearUser();
                clearTokens();
            }
        }
    );