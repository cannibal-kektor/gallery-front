import axios from "axios";
import setupAuthenticationInterceptors from "./tokenInterceptor.js";

const API_URL = import.meta.env.VITE_API_URL || "https://localhost:8443/api";
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;

export const publicAPI = axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
    headers: {
        "Content-Type": "application/json"
    }
});

export const protectedApi = axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
    headers: {
        "Content-Type": "application/json"
    }
});

setupAuthenticationInterceptors(protectedApi);
