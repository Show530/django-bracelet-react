// import {useState, useEffect} from 'react';
// import type {User} from "../interfaces/User.ts"
// import axios from 'axios';

// // export const useAuth = async => {

// // }

// export function useAuth () {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [user, setUser] = useState<User|null>(null);

//     useEffect(() => {
//         checkAuth();
//     }, [])


//     async function checkAuth() {
//         const token = localStorage.getItem('access_token');

//         // if no token, no user authenticated!
//         if(!token) {
//             setIsAuthenticated(false);
//             setLoading(false);
//             return;
//         }

//         // if token, check if authenticated and find user
//         try {
//             // try to verify token with backend
//             const response = await axios.get('/api/auth/user/', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//                 withCredentials: true
//             });

//             // console.log("Check auth response: ", response);
//             setUser(response.data);
//             setIsAuthenticated(true);
//         }
//         // if error, the user is no longer authenticated so remove token
//         catch(err) {
//             localStorage.removeItem('access_token');
//             setIsAuthenticated(false);
//         }
//         // we are no longer loading, set false
//         finally {
//             setLoading(false);
//         }
//         return;
//     }
    

//     function logout() {
//         localStorage.removeItem('access_token');
//         setIsAuthenticated(false);
//         setUser(null);
//     }

//     return {logout, checkAuth, isAuthenticated, user, loading}
// }