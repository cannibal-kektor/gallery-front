import {publicAPI, protectedApi} from "../api/api.js";

export const userService = {

    register: (username, password, email) => {
        return publicAPI.post("/users/register", {username, password, email});
    },

    getUserInfo: (username) => {
        return protectedApi.get(`/users/username/${username}`);
    }
};