import "./App.css";
import { useState } from "react";
import MoviesList from "./MoviesList";

function App() {
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState("disco");
    const [error, setError] = useState("");

    const loadMovies = async (searchFilter) => {
        try {
            const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=24c64ea903d3b9426c0b72f5af3d2813&language=en-US&query=${searchFilter}&page=1&include_adult=false`;
            const result = await fetch(movieUrl);
            if (!result.ok) {
                console.log("Error loading data");
                setMovies([]);
                setError("Error loading data, please try again!");
                return;
            }
            const loadedData = await result.json();
            console.log(loadedData);
            setMovies(loadedData.results);
            setError("");
        } catch (err) {
            console.log("Error: " + err.message);
            setMovies([]);
            setError("Error: " + err.message);
            return;
        }
    };

    return (
        <div className="App">
            <div className="left-pane">
                <h1>Movie Search</h1>
                {error && <div className="error-box">{error}</div>}
                <div className="filter-container">
                    <input
                        value={filter}
                        onChange={(event) => setFilter(event.target.value)}
                    />
                    <button onClick={() => loadMovies(filter)}>Search</button>
                </div>
                <div className="results-container">
                    <MoviesList movies={movies} />
                </div>
            </div>
            <div className="right-pane">
                {}
            </div>
        </div>
    );
}

export default App;