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

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

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
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
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