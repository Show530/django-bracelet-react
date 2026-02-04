// import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import {useAuth} from "./AuthContext.tsx";
import axios from "axios";

// const DJANGO_API_URL = import.meta.env.VITE_DJANGO_API_URL;


export default function Landing() {
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const login = useGoogleLogin({
            // flow: "implicit",
            // scope: "email profile",
            onSuccess: async (tokenResponse) => {
                try {
                    console.log("Token response: ", tokenResponse);
                    const response = await axios.post('/api/auth/social/google/',
                    {
                        access_token: tokenResponse.access_token,
                    },
                    {
                        headers: {"Content-Type": "application/json"},
                        withCredentials: true,
                    }

                    );

                    console.log("Response data: ", response.data);
                    // store JWT tokens if existing
                    if (response.data.access) {
                        await authLogin(response.data.access, response.data.refresh);
                        // localStorage.setItem('access_token', response.data.access);
                        // localStorage.setItem('refresh_token', response.data.refresh);
                        // console.log("Token saved: ", localStorage.getItem('access_token'));
                        // await checkAuth();

                        console.log("login sucessful!", response.data);
                        navigate("/");
                    }
                }
                catch(error) {
                    console.error("Login failed");
                }
            },
            onError: () => {console.log("Login Failed.");}
        }
    );
    // const handleGoogleLogin = async (credentialResponse: any) => {
    //     const res = await axios.post(
    //         // what should this line be?
    //         "/api/auth/social/google/",
    //             { 
    //                 id_token: credentialResponse.credential,
    //             },
    //             {
    //                 headers: {
    //                 "Content-Type": "application/json",
    //                 },
    //                 withCredentials: true, // important if using session auth
    //             }
    //         );

    //         console.log(credentialResponse);
    //         navigate("/");
    //     }

        //  fetch('http://localhost:8000/api/auth/google/', {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({
        //     access_token: credentialResponse.credential,
        // }),
        // });
        // console.log(credentialResponse);
        // navigate("/");
    return (
        // <GoogleLogin
        //     onSuccess={async (credentialResponse) => {
        //         const response = await axios.post("/api/auth/social/google/",
        //             {
        //                 id_token: credentialResponse.credential,
        //             },
        //             {
        //                 headers: {"Content-Type": "application/json"},
        //                 withCredentials: true,
        //             }
                    
        //         );
        //         // store JWT tokens if existing
        //         if (response.data.access_token) {
        //             localStorage.setItem('access_token', response.data.access_token);
        //         }
        //         navigate("/");
        //     }}
        //     onError={() => {
        //         console.log("Login failed.")
        //     }}
        // />
           <button onClick={() => login()}>Sign in with Google</button>
    );
    //     //    <button onClick={() => login()}>Login with Google</button>

}