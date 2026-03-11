import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    // required for cookies
    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFTOKEN",
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;