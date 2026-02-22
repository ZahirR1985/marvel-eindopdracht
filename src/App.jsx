import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/homePage/HomePage';
import FavoritesPage from './pages/favoritesPage/FavoritesPage';
import DetailPage from './pages/detailPage/DetailPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import Layout from './components/layout/Layout.jsx'
import RegisterPage from './pages/registerPage/RegisterPage';
import './App.css';
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>

                <Route path="/home" element={
                    <ProtectedRoute>
                        <Layout>
                            <HomePage/>
                        </Layout>
                    </ProtectedRoute>
                }/>

                <Route path="/favorites" element={
                    <ProtectedRoute>
                        <Layout>
                            <FavoritesPage/>
                        </Layout>
                    </ProtectedRoute>
                }/>

                <Route path="/hero/:id" element={
                    <ProtectedRoute>
                        <Layout>
                            <DetailPage/>
                        </Layout>
                    </ProtectedRoute>
                }/>

                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    )
}

export default App
