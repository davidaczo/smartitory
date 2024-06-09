import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../types';
import { observer } from 'mobx-react';
import { movieStore } from '../../mobx/movieStore';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/movie/${movie.id}`);
        movieStore.addRecentlyViewedMovie(movie)
    };

    return (
        <div
            className="border p-4 rounded shadow-xl hover:scale-105 duration-300 transition cursor-pointer"
            onClick={handleCardClick}
        >
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full" />
            <div className="flex flex-col justify-center align-middle">
                <h2 className="text-xl mt-2 mx-auto">{movie.title}</h2>
                <p className="text-gray-500 mx-auto">{new Date(movie.release_date).getFullYear()}</p>
            </div>
        </div>
    );
};

export default observer(MovieCard);
