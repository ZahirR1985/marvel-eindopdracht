import "./HomePage.css"
import SearchBar from "../../components/searchBar/SearchBar";
import axios from "axios";


const TOKEN =  import.meta.env.VITE_API_TOKEN;

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

        </div>
    );
}

export default HomePage;