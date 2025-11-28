import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/config/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token") || '8212a99bc0ec38a316497fa83a2837c69c0bf15c';

        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }

        return config;
    },
    (err) => Promise.reject(err)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            return Promise.reject("Network error. Please try again.");
        }

        const { status } = error.response;

        if (status === 401) {
            Cookies.remove("token");
            if (typeof window !== "undefined") window.location.href = "/login";
        }

        if (status === 403) {
            if (typeof window !== "undefined") window.location.href = "/403";
        }

        return Promise.reject(error.response.data);
    }
);

export default api;
