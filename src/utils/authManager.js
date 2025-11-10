const KEYS = {
    ACCESS: "accessToken",
    REFRESH: "refreshToken",
    USER: "user"
};

const getAccessToken = () => localStorage.getItem(KEYS.ACCESS);

const getRefreshToken = () => localStorage.getItem(KEYS.REFRESH);

const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem(KEYS.ACCESS, accessToken);
    localStorage.setItem(KEYS.REFRESH, refreshToken);
};

const clearTokens = () => {
    localStorage.removeItem(KEYS.ACCESS);
    localStorage.removeItem(KEYS.REFRESH);
};

const setUser = user => {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
};

const clearUser = () => {
    localStorage.removeItem(KEYS.USER);
};

const getCurrentUser = () => {
    let userStr = localStorage.getItem(KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
};

export {getAccessToken, getRefreshToken, setTokens, clearTokens, getCurrentUser, setUser, clearUser};