import {publicAPI, api} from "../api/api.js";

export const userService = {

    register: (username, password, email) => {
        return publicAPI.post("/users/register", {username, password, email});
    },

    getUserInfo: (username) => {
        return api.get(`/users/username/${username}`);
    }
};