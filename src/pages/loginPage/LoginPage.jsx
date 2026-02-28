import "./LoginPage.css";
import {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";


function LoginPage() {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_NOVI_BASE_URL;
    const PROJECT_ID = import.meta.env.VITE_NOVI_PROJECT_ID;

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(`${BASE_URL}/api/login`, {
                    email,
                    password,
                },
                {
                    headers: {
                        "novi-education-project-id": PROJECT_ID,
                    },
                }
            );

            const receivedToken = response.data.token;

            login(receivedToken, email);
            navigate("/home");

        } catch (e) {
            console.error(e);
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">

                <div className="login-form-card">

                    <h1>Login</h1>

                    <form onSubmit={handleSubmit} className="login-form">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Button type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                        <p className="register-link">
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </form>

                    {error && <p className="error-message">{error}</p>}

                </div>

            </div>
        </div>
    );

}

export default LoginPage;