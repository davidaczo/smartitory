import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Movie, MovieDetail as MovieDetailType } from '../types';
import { movieStore } from '../mobx/movieStore';
import ErrorFallback from '../components/common/ErrorFallback';
import DeatilsList from '../components/detailsPage/DetailsList';
import VerticalMovieList from '../components/common/VerticalMovieList';
import { FaSpinner } from 'react-icons/fa';

const MovieDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState<MovieDetailType | null>(null);
    const [similarMovies, setSimilarMovies] = useState<Movie[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            if (id) {
                setIsLoading(true);
                try {
                    const response = await movieStore.fetchMovie(id);
                    setMovie(response);
                } catch (error: any) {
                    setError(error.message);
                }
                setIsLoading(false);
            }
        };
        const fetchSimilarMovies = async () => {
            if (id) {
                setIsLoading(true);
                try {
                    const response = await movieStore.fetchSimilarMovies(id);
                    setSimilarMovies(response.results);
                } catch (error: any) {
                    setError(error.message);
                }
                setIsLoading(false);
            }
        }
        fetchSimilarMovies();
        fetchMovie();
    }, [id]);

    if (error) {
        return <ErrorFallback errorMessage={error} onRetry={() => { window.location.reload() }} goToHome={() => { navigate('/') }} />;
    }

    if (!movie) {
        return <div className="flex justify-center items-center ">
            <div className="flex items-center  bg-white p-4 rounded-xl shadow-lg">
                <FaSpinner className="animate-spin mr-2" /> Loading...
            </div>
        </div>
    }
    return (
        <div>
            <div className="p-4 grid lg:grid-cols-3 ">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-full" />
                <div className="w-full lg:col-span-2 mx-auto">
                    <DeatilsList movie={movie} />
                </div>
            </div>
            {similarMovies != null && similarMovies.length > 0 &&
                <VerticalMovieList
                    isLoading={isLoading}
                    movies={similarMovies}
                    title={"Similar Movies"}
                />
            }
        </div>
    );
};

export default MovieDetail;
