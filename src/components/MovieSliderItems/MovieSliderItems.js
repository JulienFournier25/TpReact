import './MovieSliderItems.css';

function MovieSliderItems({movie}) {

    return (
        <li key={movie.id}
            className="movies-item"
        >
            <a href={`/movie/${movie.id}`}>

                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                <div className="badge-list">
                    {movie.genres.map((genre) => (
                        <span key={genre} className="badge">{genre}</span>
                    ))}
                </div>
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                </div>
            </a>
        </li>
    );
}

export default MovieSliderItems;
