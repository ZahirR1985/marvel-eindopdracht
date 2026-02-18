import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/homePage/HomePage';
import FavoritesPage from './pages/favoritesPage/FavoritesPage';
import DetailPage from './pages/detailPage/DetailPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import Layout from './components/layout/Layout.jsx'
import './App.css';

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>

                <Route path="/home" element={
                    <Layout>
                        <HomePage />
                    </Layout>
                } />
                <Route path="/favorites" element={
                    <Layout>
                        <FavoritesPage />
                    </Layout>
                } />
                <Route path="/hero/:id" element={
                    <Layout>
                        <DetailPage />
                    </Layout>
                } />
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    )
}

export default App
