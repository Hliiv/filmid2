import "./App.css";
import { useState } from "react";
import MoviesList from "./MoviesList";

function App() {
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const loadMovies = async (searchFilter) => {
        setIsLoading(true);
        try {
            const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=24c64ea903d3b9426c0b72f5af3d2813&language=en-US&query=${searchFilter}&page=1&include_adult=false`;
            const result = await fetch(movieUrl);
            if (!result.ok) {
                setMovies([]);
                setIsLoading(false);
                return;
            }
            const loadedData = await result.json();
            setMovies(loadedData.results);
        } catch {
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="App">
            <div className="left-pane">
                <h1>Movie Search</h1>
                <div className="filter-container">
                    <input
                        value={filter}
                        onChange={(event) => setFilter(event.target.value)}
                    />
                    <button onClick={() => loadMovies(filter)}>Search</button>
                </div>
                <div className="results-container">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <MoviesList movies={movies} />
                    )}
                </div>
            </div>
            <div className="right-pane">
                {/* Right pane content */}
            </div>
        </div>
    );
}

export default App;

