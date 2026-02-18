import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/homePage/HomePage';
import FavoritesPage from './pages/favoritesPage/FavoritesPage';
import DetailPage from './pages/detailPage/DetailPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import NavBar from './components/navBar/NavBar';
import './App.css';

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>

                <Route path="/home" element={
                    <>
                        <NavBar />
                        <div className="page-container">
                            <HomePage />
                        </div>
                    </>}/>
                <Route path="/favorites" element={<>
                    <NavBar />
                    <div className="page-container">
                        <FavoritesPage />
                    </div>
                </>}/>
                <Route path="/hero/:id" element={<>
                    <NavBar />
                    <DetailPage />
                </>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    )
}

export default App
