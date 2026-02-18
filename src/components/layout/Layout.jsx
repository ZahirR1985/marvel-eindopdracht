import NavBar from "../navBar/NavBar";
import './Layout.css'

function Layout({ children }) {
    return (
        <>
            <NavBar />
            <div className="page-container">
                {children}
            </div>
        </>
    );
}

export default Layout;