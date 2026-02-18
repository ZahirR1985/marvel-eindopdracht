import "./HomePage.css"
import SearchBar from "../../components/searchBar/SearchBar";

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