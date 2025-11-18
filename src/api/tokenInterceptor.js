import {getAccessToken, getRefreshToken, setTokens} from "../utils/authManager.js";
import {store} from "../store/store.js";
import {logout} from "../actions/authThunks.js";
import {publicAPI} from "./api.js";

let isRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (token) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

const rejectSubscribers = (error) => {
    refreshSubscribers.forEach((callback) => callback(null, error));
    refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

const setAuthHeader = (config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

const clearState = () => {
    store.dispatch(logout());
};

const refreshAccessToken = async () => {
    let refreshToken = getRefreshToken();
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }
    try {
        const response = await publicAPI.post("/auth/refresh", {refreshToken});
        let {accessToken: newAccessToken, refreshToken: newRefreshToken} = response.data;
        if (!newAccessToken || !newRefreshToken) {
            throw new Error("No access or refresh token in response");
        }
        setTokens(newAccessToken, newRefreshToken);
        return newAccessToken;
    } catch (error) {
        clearState();
        throw error;
    }
};


function retryRequest(originalRequest, API) {
    return new Promise((resolve, reject) => {
        addRefreshSubscriber((token, error) => {
            if (!error) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(API(originalRequest));
            } else {
                reject(error);
            }
        });
    });
}

export const setupAuthenticationInterceptors = (apiInstance) => {

    apiInstance.interceptors.request.use(
        config => setAuthHeader(config),
        error => Promise.reject(error)
    );

    apiInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {

                originalRequest._retry = true;

                if (!isRefreshing) {
                    isRefreshing = true;
                    try {
                        await refreshAccessToken();
                        isRefreshing = false;
                    } catch (error) {
                        isRefreshing = false;
                        rejectSubscribers(error);
                        return Promise.reject(error);
                    }
                    onTokenRefreshed(getAccessToken());
                    return apiInstance(originalRequest);
                } else {
                    return retryRequest(originalRequest, apiInstance);
                }
            }

            if (!error.response) {
                console.warn("Network error");
            }
            if (error.response.status === 403) {
                console.warn("Access forbidden");
            }

            return Promise.reject(error);
        }
    );

    return apiInstance;
};

export default setupAuthenticationInterceptors;