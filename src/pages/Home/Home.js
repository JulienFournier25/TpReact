import {useEffect, useMemo, useState} from "react";
import './Home.css';
import MovieSliderItems from "../../components/MovieSliderItems/MovieSliderItems";
import useDebounce from "../../UseHooks/UseDebounce";

function Home({searchValue}) {
    const [movies, setMovies] = useState(null);
    const [genres, setGenres] = useState(null);
    const [favoriteMovies, setFavoriteMovies] = useState(null);

    const debouncedSearchValue = useDebounce(searchValue, 500);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let movieResponse;
                if (debouncedSearchValue !== '') {
                    movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?query=${debouncedSearchValue}&language=en-US&page=1`, {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTZjZjNlZDBlMTc4MGI3NjlhNjJkNDIzNWU3M2IzMCIsInN1YiI6IjY1ZjE3MDMyZDY0YWMyMDE2NDVlMDE1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wRIKdIXl7_KYAM_f78I0Kz9qV781mlEznGDy2TZHri8'
                        }
                    });
                } else {
                    movieResponse = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTZjZjNlZDBlMTc4MGI3NjlhNjJkNDIzNWU3M2IzMCIsInN1YiI6IjY1ZjE3MDMyZDY0YWMyMDE2NDVlMDE1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wRIKdIXl7_KYAM_f78I0Kz9qV781mlEznGDy2TZHri8'
                        }
                    });
                }

                const movieData = await movieResponse.json();
                setMovies(movieData.results);
            } catch (error) {
                console.error(error);
            }
        }

        fetchMovies();
    }, [debouncedSearchValue]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreResponse = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTZjZjNlZDBlMTc4MGI3NjlhNjJkNDIzNWU3M2IzMCIsInN1YiI6IjY1ZjE3MDMyZDY0YWMyMDE2NDVlMDE1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wRIKdIXl7_KYAM_f78I0Kz9qV781mlEznGDy2TZHri8'
                    }
                });
                const genreData = await genreResponse.json();
                setGenres(genreData.genres);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchFavoriteMovies= async () => {
            try {
                const favoriteMoviesResponse = await fetch('https://api.themoviedb.org/3/account/21099165/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTZjZjNlZDBlMTc4MGI3NjlhNjJkNDIzNWU3M2IzMCIsInN1YiI6IjY1ZjE3MDMyZDY0YWMyMDE2NDVlMDE1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wRIKdIXl7_KYAM_f78I0Kz9qV781mlEznGDy2TZHri8'
                    }
                });
                const favoriteMoviesData = await favoriteMoviesResponse.json();
                setFavoriteMovies(favoriteMoviesData.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGenres();
        fetchFavoriteMovies();
    }, []);

    const movieGenres = useMemo(() => {
        if (!movies || !genres) {
            return null;
        }

        const genreMap = genres.reduce((acc, genre) => {
            acc[genre.id] = genre.name;
            return acc;
        }, {});

        return movies.map((movie, index) => ({
            ...movie,
            genres: movie.genre_ids.map(id => genreMap[id] || "Unknown")
        }));
    }, [genres, movies]);

    const favoriteMoviesGenres = useMemo(() => {
        if (!favoriteMovies || !genres) {
            return null;
        }

        const genreMap = genres.reduce((acc, genre) => {
            acc[genre.id] = genre.name;
            return acc;
        }, {});

        return favoriteMovies.map((movie, index) => ({
            ...movie,
            genres: movie.genre_ids.map(id => genreMap[id] || "Unknown")
        }));
    }, [genres, favoriteMovies]);

    return (
        <div>
            <h1>Home</h1>
            <div>
                <ul className="movie-list">
                    {movieGenres && movieGenres.map((movie) => (
                        <MovieSliderItems movie={movie}/>
                    ))}
                </ul>
            </div>
            <h2>Favorite</h2>
            <div>
                {favoriteMoviesGenres &&
                    <ul className="movie-list">
                        {favoriteMoviesGenres.map((movie) => (
                            <MovieSliderItems movie={movie}/>
                        ))}
                    </ul>}
            </div>
        </div>
    );
}

export default Home;
