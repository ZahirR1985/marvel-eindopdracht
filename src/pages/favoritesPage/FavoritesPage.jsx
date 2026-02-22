import { useEffect, useState } from "react";
import HeroCard from "../../components/heroCard/HeroCard";
import "./FavoritesPage.css";

function FavoritesPage() {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        setFavorites(savedFavorites);
    }, []);

    return (
        <div className="favorites-page">

            <h1>Your Favorite Heroes</h1>

            {favorites.length === 0 && (
                <p>No favorites added yet.</p>
            )}

            <div className="heroes-grid">
                {favorites.map((hero) => (
                    <HeroCard key={hero.id} hero={hero} />
                ))}
            </div>

        </div>
    );
}

export default FavoritesPage;
