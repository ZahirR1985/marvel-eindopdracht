import {useEffect, useState, useContext} from "react";
import axios from "axios";
import HeroCard from "../../components/heroCard/HeroCard";
import Button from "../../components/button/Button.jsx";
import {FaHeart} from "react-icons/fa";
import "./FavoritesPage.css";
import {AuthContext} from "../../context/AuthContext.jsx";

const BASE_URL = import.meta.env.VITE_NOVI_BASE_URL;
const PROJECT_ID = import.meta.env.VITE_NOVI_PROJECT_ID;
const HERO_API_TOKEN = import.meta.env.VITE_API_TOKEN;


function FavoritesPage() {
    const {token, user} = useContext(AuthContext);

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchFavorites() {
            if (!token || !user) return;

            try {
                setLoading(true);
                setError(null);

                // 🔹 1. Haal favorites op uit backend
                const favoritesResponse = await axios.get(
                    `${BASE_URL}/api/favorites`,
                    {
                        headers: {
                            "novi-education-project-id": PROJECT_ID,
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const userFavorites = favoritesResponse.data.filter(
                    fav => fav.email === user.email
                );

                // 🔹 2. Haal hero data op via Superhero API
                const heroRequests = userFavorites.map(fav =>
                    axios.get(
                        `https://superheroapi.com/api.php/${HERO_API_TOKEN}/${fav.heroId}`
                    )
                );

                const heroResponses = await Promise.all(heroRequests);

                const combinedData = heroResponses.map((res, index) => ({
                    favoriteId: userFavorites[index].id,
                    hero: res.data
                }));

                setFavorites(combinedData);

            } catch (e) {
                console.error(e);
                setError("Failed to load favorites.");
            } finally {
                setLoading(false);
            }
        }

        fetchFavorites();
    }, [token, user]);

    // 🔥 DELETE favorite
    async function removeFavorite(favoriteId) {
        try {
            await axios.delete(
                `${BASE_URL}/api/favorites/${favoriteId}`,
                {
                    headers: {
                        "novi-education-project-id": PROJECT_ID,
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Update UI zonder refresh
            setFavorites(prev =>
                prev.filter(fav => fav.favoriteId !== favoriteId)
            );

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="favorites-page">
            <h1>Your Favorite Heroes</h1>

            {loading && <p>Loading favorites...</p>}
            {error && <p>{error}</p>}
            {!loading && favorites.length === 0 && (
                <p>No favorites added yet.</p>
            )}

            <div className="heroes-grid">
                {favorites.map(item => (
                    <div key={item.favoriteId} className="favorite-item">
                        <HeroCard hero={item.hero}/>

                        <Button
                            variant="icon"
                            className="active"
                            onClick={() => removeFavorite(item.favoriteId)}
                        >
                            <FaHeart/>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoritesPage;
