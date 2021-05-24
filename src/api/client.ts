import axios from "axios";

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};
const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://api.ptitfinancial.me:8080/financial/api/v1",
    headers,
});

client.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem("token");

        if (token) {
            if (token[0] === '"') {
                token = token?.substring(1, token.length - 1);
            }
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default client;
