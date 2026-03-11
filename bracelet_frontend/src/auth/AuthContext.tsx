import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
// import axios from "axios";
import api from "../axiosConfig.ts"
import type { User } from "../interfaces/User";

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    user: User | null;
    // login: (token: string, refreshToken: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
// new axios instance for refresh
// const axiosRefresh = axios.create();

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        checkAuth();
    }, []);


    async function checkAuth() {
        // try to find user- if error, not logged in
        try {
            // try to verify token with backend
            const response = await api.get('/auth/user/');
            setUser(response.data);
            setIsAuthenticated(true);
        } 
        // no user found, so not logged in
        catch (err) {
            setIsAuthenticated(false);
            setUser(null);
        } 
        // we are no longer loading, set false
        finally {
            setLoading(false);
        }
    }

    // meant for email login- don't have at the moment
    // async function login(email: string, password: string) {
    //     await api.post("/auth/login/", {
    //         email, 
    //         password,
    //     });
    //     // updates the shared state
    //     await checkAuth();
    // }

    async function logout() {
        // localStorage.removeItem('access_token');
        // localStorage.removeItem('refresh_token');
        try {
            await api.post("/auth/logout/");
        }
        catch (err) {
            // ignoring errors
            console.error('Logout error:', err);
        }
        setIsAuthenticated(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, user, logout, checkAuth }}> 
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