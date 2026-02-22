import {useState} from "react";
import HeroCard from "../../components/heroCard/HeroCard";
import "./FavoritesPage.css";

function FavoritesPage() {

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    function removeFavorite(id) {
        const updatedFavorites = favorites.filter(
            (hero) => hero.id !== id
        );

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }


    return (
        <div className="favorites-page">

            <h1>Your Favorite Heroes</h1>

            {favorites.length === 0 && (
                <p>No favorites added yet.</p>
            )}

            <div className="heroes-grid">
                {favorites.map((hero) => (
                    <div key={hero.id} className="favorite-item">
                        <HeroCard hero={hero}/>

                        <button
                            className="remove-btn"
                            onClick={() => removeFavorite(hero.id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>


        </div>
    );
}

export default FavoritesPage;
