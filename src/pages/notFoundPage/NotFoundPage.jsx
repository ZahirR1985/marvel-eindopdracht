import { Link } from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import "./NotFoundPage.css";

function NotFoundPage() {
    return (
        <div className="notfound-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>
                        404 – <span>Page Not Found</span>
                    </h1>
                    <p>
                        The page you are looking for does not exist in the Marvel universe.
                    </p>

                    <Link to="/home">
                        <Button>Back to Home</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default NotFoundPage;