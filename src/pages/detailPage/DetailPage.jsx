import "./DetailPage.css"
import axios from "axios";
import {FaHeart} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Button from "../../components/button/Button.jsx";

const TOKEN = import.meta.env.VITE_API_TOKEN;

function DetailPage() {
    const {id} = useParams();
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    function toggleFavorite() {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

        let updatedFavorites;

        if (isFavorite) {
            // verwijderen
            updatedFavorites = savedFavorites.filter(
                (fav) => fav.id !== hero.id
            );
        } else {
            // toevoegen
            updatedFavorites = [...savedFavorites, hero];
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    }

    useEffect(() => {
        async function fetchHero() {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(
                    `https://superheroapi.com/api.php/${TOKEN}/${id}`
                );

                setHero(response.data);

                const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

                const exists = savedFavorites.some(
                    (fav) => fav.id === response.data.id
                );

                setIsFavorite(exists);

            } catch (e) {
                setError(e.message || "Failed to load hero.");
            } finally {
                setLoading(false);
            }
        }

        fetchHero();
    }, [id]);


    return (
        <div className="detail-page">

            {loading && <p>Loading hero...</p>}
            {error && <p>{error}</p>}

            {hero && (
                <div className="hero-detail">

                    <div className="hero-header">

                        <Button
                            variant="icon"
                            onClick={toggleFavorite}
                            className={isFavorite ? "active" : ""}
                        >
                            <FaHeart/>
                        </Button>

                        <h1>{hero.name}</h1>
                    </div>


                    <div className="hero-top">

                        <div className="hero-detail-image">
                            <img src={hero.image.url} alt={hero.name}/>
                        </div>

                        <div className="hero-bio">
                            <h2>Biography</h2>
                            <p><strong>Full name:</strong> {hero.biography["full-name"] || "Unknown"}</p>
                            <p><strong>Alter egos:</strong> {hero.biography["alter-egos"]}</p>
                            <p><strong>Publisher:</strong> {hero.biography.publisher}</p>
                            <p><strong>Alignment:</strong> {hero.biography.alignment}</p>
                            <p><strong>Place of birth:</strong> {hero.biography["place-of-birth"]}</p>
                            <p><strong>First appearance:</strong> {hero.biography["first-appearance"]}</p>
                        </div>

                        <div className="hero-stats">
                            <h2>Powerstats</h2>

                            {Object.entries(hero.powerstats).map(([stat, value]) => (
                                <div key={stat} className="stat-row">
                                    <span className="stat-name">{stat}</span>
                                    <div className="stat-bar">
                                        <div
                                            className="stat-fill"
                                            style={{width: `${value}%`}}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="hero-bottom">

                        <h2>Work</h2>
                        <p><strong>Occupation:</strong> {hero.work.occupation || "Unknown"}</p>
                        <p><strong>Base:</strong> {hero.work.base || "Unknown"}</p>

                        <h2>Connections</h2>
                        <p><strong>Group affiliation:</strong> {hero.connections["group-affiliation"]}</p>
                        <p><strong>Relatives:</strong> {hero.connections.relatives}</p>

                    </div>

                </div>

            )}
        </div>

    );
}

export default DetailPage;
