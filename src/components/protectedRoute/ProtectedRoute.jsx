import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function ProtectedRoute({ children }) {
    const { isAuth } = useContext(AuthContext);

    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
