import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register, getMe } from '../services/auth.api';

export function useAuth() {
    const context = useContext(AuthContext);
    const { loading, setLoading, user, setUser, notify } = context;

    useEffect(() => {
        if (!user) {
            handleGetMe();
        }
    }, []);

    const handleLogin = async (email, password) => {
        setLoading(true);

        try {
            const response = await login(email, password);
            setUser(response.user)
            return response;
        } catch (err) {
            console.error("Login failed:", err);
            setUser(null);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (username, email, password) => {
        setLoading(true);

        try {
            const response = await register(username, email, password);
            setUser(response.user);
            return response;
        } catch (err) {
            console.error("Registration failed:", err);
            setUser(null);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            setUser(null);
        }
    };

    const handleGetMe = async () => {
        try {
            setLoading(true);
            const response = await getMe();
            setUser(response.user);
        } catch (error) {
            // 🔥 Important
            setUser(null);
        } finally {
            setLoading(false);
        }
    };


    return {
        loading, user, handleLogin, handleGetMe, handleLogout, notify, handleRegister
    }

}