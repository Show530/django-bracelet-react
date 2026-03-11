import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_DJANGO_API_URL || "/api",
    // baseURL: "/api",

    // required for cookies
    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFTOKEN",
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;