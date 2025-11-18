import {publicAPI, protectedApi} from "../api/api.js";

export const authService = {
    login: (username, password) => {
        return publicAPI.post("/auth/login", {username, password});
    },
    logout: (accessToken, refreshToken) => {
        return protectedApi.post("/auth/logout", {accessToken, refreshToken});
    }
};