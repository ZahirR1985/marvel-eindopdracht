import { createContext, useState } from 'react'

export const AuthContext = createContext({})

function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const isAuth = !!token;

    function login(receivedToken) {
        localStorage.setItem("token", receivedToken);
        setToken(receivedToken);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    const contextData = {
        isAuth: isAuth,
        login: login,
        logout: logout,
    };


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider