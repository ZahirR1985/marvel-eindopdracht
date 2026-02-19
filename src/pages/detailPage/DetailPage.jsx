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
        <div>

            {loading && <p>Loading hero...</p>}
            {error && <p>{error}</p>}

            {hero && (
                <div className="detail-page">
                    <h1>{hero.name}</h1>
                    <img src={hero.image.url} alt={hero.name}/>
                    <p><strong>Full name:</strong> {hero.biography["full-name"]}</p>
                    <p><strong>Publisher:</strong> {hero.biography.publisher}</p>
                    <p><strong>Alignment:</strong> {hero.biography.alignment}</p>
                </div>
            )}
        </div>
    );
}

export default DetailPage;
