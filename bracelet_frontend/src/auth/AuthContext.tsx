import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import type { User } from '../interfaces/User';

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    user: User | null;
    login: (token: string, refreshToken: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
// new axios instance for refresh
const axiosRefresh = axios.create();


export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    // https://medium.com/@velja/token-refresh-with-axios-interceptors-for-a-seamless-authentication-experience-854b06064bde
    // axios interceptor for token refresh
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            // ignores sucesses/all public calls
            (response) => response,
            async (error) => {
                const orginalReq = error.config;

                // if 401 error and not retried
                if (error.response?.status === 401 && !orginalReq._retry) {
                    // set to true for no infinite looping
                    orginalReq._retry = true;

                    const refreshToken = localStorage.getItem('refresh_token');

                    if (refreshToken) {
                        try {
                            // make request to refresh token
                            const response = await axiosRefresh.post('/api/auth/token/refresh/', {
                                refresh: refreshToken
                            });

                            const newAccessToken = response.data.access;

                            //update stored token
                            localStorage.setItem('access_token', newAccessToken);

                            // update request with new token
                            orginalReq.headers.Authorization = `Bearer ${newAccessToken}`;

                            // retry og request
                            return axios(orginalReq);
                        }
                        catch (refreshError) {
                            console.error('Token refresh failed:', refreshError);
                            logout();
                            return Promise.reject(refreshError);
                        }
                    }
                    else {
                        // no refresh token, so logout?
                        logout();
                    }
                }
                return Promise.reject(error);
            }
        );
        // clean up on unmount
        return () => {
            axios.interceptors.response.eject(interceptor);
        };

    }, []);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        const token = localStorage.getItem('access_token');

        // if no token, no user authenticated!
        if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }

        // if token, check if authenticated and find user
        try {
            // try to verify token with backend
            const response = await axios.get('/api/auth/user/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });

            setUser(response.data);
            setIsAuthenticated(true);
        } catch (err) {
             // let interceptor handle refresh, but this failed too
            // localStorage.removeItem('access_token');
            // localStorage.removeItem('refresh_token');

            console.error('Auth check failed:', err);
            setIsAuthenticated(false);
            setUser(null);
        } 
        // we are no longer loading, set false
        finally {
            setLoading(false);
        }
    }

    async function login(token: string, refreshToken: string) {
        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refreshToken);
        // updates the shared state
        await checkAuth();
    }

    function logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, user, login, logout, checkAuth }}> 
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}