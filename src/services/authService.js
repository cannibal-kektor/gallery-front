import {publicAPI, api} from "../api/api.js";

export const authService = {
    login: (username, password) => {
        return publicAPI.post("/auth/login", {username, password});
    },
    logout: (accessToken, refreshToken) => {
        return api.post("/auth/logout", {accessToken, refreshToken});
    }
};