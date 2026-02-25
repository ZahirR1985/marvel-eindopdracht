import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_NOVI_BASE_URL;
const PROJECT_ID = import.meta.env.VITE_NOVI_PROJECT_ID;

export const AuthContext = createContext({})

function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        const savedEmail = localStorage.getItem("email");
        return savedEmail ? { email: savedEmail } : null;
    });

    const isAuth = !!token;

    function login(receivedToken, email) {
        localStorage.setItem("token", receivedToken);
        localStorage.setItem("email", email);
        setToken(receivedToken);
        setUser({ email })
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setToken(null);
        setUser(null);
    }

    useEffect(() => {
        async function fetchProfile() {
            if (!token || !user?.email) return;

            try {
                const response = await axios.get(`${BASE_URL}/api/profiles`, {
                    headers: {
                        "novi-education-project-id": PROJECT_ID,
                        Authorization: `Bearer ${token}`
                    }
                });

                const profile = response.data.find(
                    (profile) => profile.email === user.email
                );

                if (profile) {
                    setUser({
                        email: user.email,
                        displayName: profile.displayName
                    });
                }

            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        }

        fetchProfile();
    }, [token, user?.email]);

    const contextData = {
        isAuth,
        token,
        user,
        login,
        logout
    };


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider