import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!query.trim()) return;
        onSearch(query);
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-input-wrapper">

                <FaSearch className="search-icon" />

                <input
                    type="text"
                    placeholder="Search Marvel hero..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button type="submit">
                    Search
                </button>

            </div>
        </form>
    );
}

export default SearchBar;