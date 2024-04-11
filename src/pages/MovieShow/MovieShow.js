import './MovieShow.css';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import StarRatings from 'react-rating-stars-component';

function addToFavorites(id) {
    const data = {
        media_type: "movie",
        media_id: id,
        favorite: true
    };

    fetch('https://api.themoviedb.org/3/account/21099165/favorite', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTZjZjNlZDBlMTc4MGI3NjlhNjJkNDIzNWU3M2IzMCIsInN1YiI6IjY1ZjE3MDMyZDY0YWMyMDE2NDVlMDE1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wRIKdIXl7_KYAM_f78I0Kz9qV781mlEznGDy2TZHri8'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function rateMovie(movieId, rating) {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/rating`;
    const data = {
        value: rating
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTZjZjNlZDBlMTc4MGI3NjlhNjJkNDIzNWU3M2IzMCIsInN1YiI6IjY1ZjE3MDMyZDY0YWMyMDE2NDVlMDE1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wRIKdIXl7_KYAM_f78I0Kz9qV781mlEznGDy2TZHri8'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function MovieShow() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const ratingChanged = (newRating) => {
        rateMovie(id, newRating);
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTZjZjNlZDBlMTc4MGI3NjlhNjJkNDIzNWU3M2IzMCIsInN1YiI6IjY1ZjE3MDMyZDY0YWMyMDE2NDVlMDE1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wRIKdIXl7_KYAM_f78I0Kz9qV781mlEznGDy2TZHri8'
            }})
            .then(response => response.json())
            .then(data => setMovie(data))
    }, []);

    return (
        <div>
            {movie === null ? <p>Loading...</p> :
                <div className="movie-show-container">
                    <div className="movie-header">
                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                             alt={`${movie.title} backdrop`} className="movie-backdrop"/>
                        <div className="movie-summary">
                            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                 alt={`${movie.title} poster`}
                                 className="movie-poster"/>
                            <div className="movie-details">
                                <h2 className="movie-title">{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
                                <p className="movie-tagline">{movie.tagline}</p>
                                <p className="movie-genres">Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
                                <p className="movie-runtime">Runtime: {movie.runtime} minutes</p>
                                <p className="movie-rating">Rating: {movie.vote_average} ({movie.vote_count} votes)</p>
                                <div className="movie-overview">
                                    <h3>Overview</h3>
                                    <p>{movie.overview}</p>
                                </div>
                                <div className="movie-btn">
                                    <a href={movie.homepage} target="_blank" rel="noopener noreferrer"
                                       className="movie-homepage">Official Website</a>
                                    <button className="movie-add-to-favorites" onClick={() => addToFavorites(id)}>
                                        Ajouter aux Favoris
                                    </button>
                                </div>
                                <div className="movie-rating">
                                    <StarRatings
                                        count={10}
                                        onChange={ratingChanged}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default MovieShow;
