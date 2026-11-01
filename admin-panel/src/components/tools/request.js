import axios from "axios";
import { getAccessToken, getRefreshToken } from "./utils";

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

export const requestWithoutAuth = axios.create({
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
    function onFulfilled(response) {
        return response;
    },
    async function onRejected (error) {

        if(error.status === 401){
            await requestWithoutAuth.post("/api/get-access-token" , {
                refreshToken: getRefreshToken()
            })
        }
        return Promise.reject(error);
    }
);

export default request;
