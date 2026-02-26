import "./DetailPage.css"
import axios from "axios";
import {FaHeart} from "react-icons/fa";
import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

const HERO_API_TOKEN = import.meta.env.VITE_API_TOKEN;
const BASE_URL = import.meta.env.VITE_NOVI_BASE_URL;
const PROJECT_ID = import.meta.env.VITE_NOVI_PROJECT_ID;

function DetailPage() {
    const {id} = useParams();
    const {token, user} = useContext(AuthContext);

    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);


    useEffect(() => {
        async function fetchHero() {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(
                    `https://superheroapi.com/api.php/${HERO_API_TOKEN}/${id}`
                );

                setHero(response.data);

            } catch (e) {
                setError(e.message || "Failed to load hero.");
            } finally {
                setLoading(false);
            }
        }

        fetchHero();
    }, [id]);

    useEffect(() => {
        async function checkFavorite() {
            if (!token || !user) return;

            try {
                const response = await axios.get(`${BASE_URL}/api/favorites`, {
                    headers: {
                        "novi-education-project-id": PROJECT_ID,
                        Authorization: `Bearer ${token}`
                    }
                });

                const userFavorites = response.data.filter(
                    fav => fav.email === user.email && fav.heroId === Number(id)
                );

                if (userFavorites.length > 0) {
                    setIsFavorite(true);
                    setFavoriteId(userFavorites[0].id);
                } else {
                    setIsFavorite(false);
                    setFavoriteId(null);
                }

            } catch (e) {
                console.error(e);
            }
        }

        checkFavorite();
    }, [id, token, user]);

    async function toggleFavorite() {

        if (!token || !user) return;

        try {
            if (isFavorite) {
                await axios.delete(
                    `${BASE_URL}/api/favorites/${favoriteId}`,
                    {
                        headers: {
                            "novi-education-project-id": PROJECT_ID,
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setIsFavorite(false);
                setFavoriteId(null);
            } else {

                await axios.post(
                    `${BASE_URL}/api/favorites`,
                    {
                        id: Date.now(),
                        email: user.email,
                        heroId: Number(id)
                    },
                    {
                        headers: {
                            "novi-education-project-id": PROJECT_ID,
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const response = await axios.get(`${BASE_URL}/api/favorites`, {
                    headers: {
                        "novi-education-project-id": PROJECT_ID,
                        Authorization: `Bearer ${token}`
                    }
                });

                const userFavorites = response.data.filter(
                    fav => fav.email === user.email && fav.heroId === Number(id)
                );

                if (userFavorites.length > 0) {
                    setIsFavorite(true);
                    setFavoriteId(userFavorites[0].id);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

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
