import './HeroCard.css'
import {Link} from "react-router-dom";

function HeroCard({hero}) {
    return (
        <div className="hero-card">
            <Link to={`/hero/${hero.id}`} className="hero-link">
                <img
                    src={hero.image.url}
                    alt={hero.name}
                    className="hero-image"
                />
                <h3 className="hero-name">{hero.name}</h3>
            </Link>
        </div>
    )
}

export default HeroCard;