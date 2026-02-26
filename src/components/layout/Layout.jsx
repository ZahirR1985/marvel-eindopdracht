import Footer from "../footer/Footer";
import './Layout.css'
import Navbar from "../navBar/NavBar";

function Layout({ children }) {
    return (
        <div className="app-layout">
            <Navbar />

            <main className="main-content">
                <div className="page-container">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Layout;