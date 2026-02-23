import './RegisterPage.css'
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Button from "../../components/button/Button.jsx";

function RegisterPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_NOVI_BASE_URL;
    const PROJECT_ID = import.meta.env.VITE_NOVI_PROJECT_ID;

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await axios.post(`${BASE_URL}/api/users`,
                {
                    email,
                    password,
                    roles: ["member"]
                },
                {
                    headers: {
                        "novi-education-project-id": PROJECT_ID,
                    },
                }
            );

            await axios.post(
                `${BASE_URL}/api/profiles`,
                {
                    id: Date.now(),
                    email,
                    displayName
                },
                {
                    headers: {
                        "novi-education-project-id": PROJECT_ID,
                    },
                }
            );
            navigate("/");

        } catch (e) {
            console.error(e);
            setError("Registration failed. Email may already exist");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-form-card">
                    <h1>Register</h1>

                    <form onSubmit={handleSubmit} className="register-form">
                        <input
                            type="text"
                            placeholder="Display name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                        />

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
                            {loading ? "Creating account..." : "Register"}
                        </Button>

                        <p className="login-link">
                            Already have an account? <Link to="/">Login</Link>
                        </p>
                    </form>

                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
