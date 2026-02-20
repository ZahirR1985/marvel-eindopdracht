import "./DetailPage.css"
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const TOKEN = import.meta.env.VITE_API_TOKEN;

function DetailPage() {
    const {id} = useParams();
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchHero() {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(
                    `https://superheroapi.com/api.php/${TOKEN}/${id}`
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


    return (
        <div className="detail-page">

            {loading && <p>Loading hero...</p>}
            {error && <p>{error}</p>}

            {hero && (
                <div className="hero-detail">

                    <h1>{hero.name}</h1>

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
