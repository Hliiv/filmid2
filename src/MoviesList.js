function MoviesList({movies}) {
    return (
        movies.map((movie) => {
            return (
                <div key={movie.id} >
                    <h3>{movie.original_title}</h3>
                </div>
            )
        })
    )
}

export default MoviesList