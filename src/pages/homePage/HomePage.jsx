import "./HomePage.css"
import SearchBar from "../../components/searchBar/SearchBar";
import axios from "axios";
import {useEffect, useState} from "react";


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

    useEffect(() => {
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

        fetchFeaturedHeroes();
    }, []);

    function handleSearch(searchTerm) {
        console.log("Zoekterm ontvangen:", searchTerm);
        // Hier komt straks je API call
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
                {error && <p>{error}</p>}

                {!loading && !error && heroes.map((hero) => (
                    <div key={hero.id}>
                        <h3>{hero.name}</h3>
                    </div>
                ))}
            </section>

        </div>
    );
}

export default HomePage;