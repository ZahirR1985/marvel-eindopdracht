import "./HomePage.css"
import SearchBar from "../../components/searchBar/SearchBar";
import axios from "axios";
import {useEffect, useState} from "react";
import HeroCard from "../../components/heroCard/HeroCard.jsx"
import {Link} from "react-router-dom";
import Button from "../../components/button/Button.jsx";


const TOKEN = import.meta.env.VITE_API_TOKEN;

const featuredHeroIds = [
    346, // Iron Man
    620, // Spider-Man
    332, // Hulk
    659, // Thor
    149, // Captain America
    106, // Black Panther
    226, // Doctor Strange
    213, // Deadpool
    303, // Groot
    107  // Black Widow
];

function HomePage() {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchFeaturedHeroes() {
        try {
            setLoading(true);
            setError(null);

            const request = featuredHeroIds.map((id) =>
                axios.get(`https://superheroapi.com/api.php/${TOKEN}/${id}`)
            );

            const response = await Promise.all(request);
            const heroesData = response.map((res) => res.data);
            setHeroes(heroesData);

        } catch (e) {
            setError(e.message || "Failed to load featured heroes.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFeaturedHeroes();
    }, []);

    function handleBackToHome() {
        setError(null);
        fetchFeaturedHeroes();
    }


    async function handleSearch(searchTerm) {

        if (!searchTerm.trim()) return;

        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(
                `https://superheroapi.com/api.php/${TOKEN}/search/${searchTerm}`
            );

            if (response.data.response === "error") {
                setHeroes([]);
                setError("No Marvel heroes found.");
                return;
            }

            const results = response.data.results;

            const marvelOnly = results.filter(
                hero => hero.biography.publisher === "Marvel Comics"
            );

            if (marvelOnly.length === 0) {
                setHeroes([]);
                setError("No Marvel heroes found.");
                return;
            }

            setHeroes(marvelOnly);

        } catch (e) {
            setError(e.message || "Search failed.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="home-page">

            <section className="hero-section">
                <div className="hero-content">
                    <h1>Discover <span>Marvel</span> Heroes</h1>
                    <p>Explore your favorite characters from the Marvel universe.</p>
                    <SearchBar onSearch={handleSearch}/>
                </div>
            </section>

            <section className="heroes-grid">
                {loading && <p>Loading heroes...</p>}
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                        <Button variant="ghost" onClick={handleBackToHome}>
                            Go back to Home
                        </Button>
                    </div>
                )}

                {!loading && !error && heroes.map((hero) => (
                    <HeroCard key={hero.id} hero={hero}/>
                ))
                }
            </section>

        </div>
    );
}

export default HomePage;