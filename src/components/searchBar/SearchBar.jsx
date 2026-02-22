import {useState} from "react";
import {FaSearch} from "react-icons/fa";
import Button from "../button/Button.jsx"
import "./SearchBar.css";

function SearchBar({onSearch}) {
    const [query, setQuery] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!query.trim()) return;
        onSearch(query);
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-input-wrapper">

                <FaSearch className="search-icon"/>

                <input
                    type="text"
                    placeholder="Search Marvel hero..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <Button type="submit">
                    Search
                </Button>

            </div>
        </form>
    );
}

export default SearchBar;