import "./NavBar.css"
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import logo from "../../assets/logo1.jpg"
import Button from "../button/Button.jsx";

function Navbar() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const user = {
        name: "Peter Parker"
    };

    function handleLogout() {
        console.log("Logout clicked");
        logout();          // token verwijderen + state resetten
        navigate("/");     // terug naar login
    }

    return (
        <header className="navbar">
            <div className="navbar-container">

                {/* LINKS – gebruiker */}
                <div className="nav-user">
                    <FaUserCircle className="user-icon"/>
                    <span>{user.name}</span>
                </div>

                {/* MIDDEN – logo */}
                <div className="nav-logo">
                    <NavLink to="/home">
                        <img src={logo} alt="Nav logo"/>
                    </NavLink>
                </div>

                {/* RECHTS – navigatie */}
                <nav>
                    <ul className="nav-links">
                        <li>
                            <NavLink
                                to="/home"
                                className={({isActive}) =>
                                    isActive ? "active-link" : ""
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/favorites"
                                className={({isActive}) =>
                                    isActive ? "active-link" : ""
                                }
                            >
                                Favorites
                            </NavLink>
                        </li>
                        <li>
                            <Button variant="ghost" onClick={handleLogout}>
                                Logout
                            </Button>

                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;