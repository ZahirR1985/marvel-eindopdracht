import "./LoginPage.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";

function LoginPage() {
    const { login} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogin() {
        // tijdelijk fake token
        login("test-token-123");
        navigate("/home");
    }


    return (
        <div>
            <h1>Login Page</h1>
            <Button onClick={handleLogin}>
                Login (test)
            </Button>
        </div>
    );
}

export default LoginPage;
