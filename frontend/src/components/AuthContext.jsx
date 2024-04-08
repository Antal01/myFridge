import React, { createContext, useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        if (token && storedUsername) {
            setUsername(storedUsername);
            setIsLoggedIn(true);
        }
    }, []);

    const login = (username) => {
        setUsername(username);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUsername('');
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
