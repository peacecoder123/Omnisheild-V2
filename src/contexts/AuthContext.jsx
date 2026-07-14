import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const login = async (email, password, role) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            setCurrentUser(data.user);
            localStorage.setItem('omnishield_token', data.token);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();
            setCurrentUser(data.user);
            localStorage.setItem('omnishield_token', data.token);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('omnishield_token');
    };

    const value = {
        user: currentUser,
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};