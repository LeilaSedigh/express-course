import axios from "axios";
import { getAccessToken } from "./utils";

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

request.interceptors.request.use(
    function (config) {
        const accessToken = getAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default request;
