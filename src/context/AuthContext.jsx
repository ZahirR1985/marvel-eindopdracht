import { createContext, useState } from 'react'

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