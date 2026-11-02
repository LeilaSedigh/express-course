import axios from "axios";
import { getAccessToken, getRefreshToken, removeAcssesToken, removeRefreshToken, setAccessToken } from "./utils";

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
    async function onRejected(error) {
        const orginalRequest = error.config;

        if (error.response?.status === 401 && !orginalRequest._retry) {
            try {
                orginalRequest._retry = true;
                const { data } = await requestWithoutAuth.post(
                    "/api/get-access-token",
                    {
                        refreshToken: getRefreshToken()
                    }
                )
                setAccessToken(data.accessToken);
                
                return request(orginalRequest)
            } catch (error) {
                removeAcssesToken();
                removeRefreshToken();
                location.reload();
                return Promise.reject(error);
            }

        }
        return Promise.reject(error);
    }
);

export default request;