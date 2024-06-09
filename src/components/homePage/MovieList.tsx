import React from 'react';
import { observer } from 'mobx-react-lite';
import MovieCard from '../common/MovieCard';
import SkeletonMovieCard from '../common/SkeletonMovieCard';
import { movieStore } from '../../mobx/movieStore';

interface MovieListProps {
    isLoading: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ isLoading }) => {
    return (
        <div>
            <h1 className="font-medium text-4xl pt-8 px-8">Trending movies</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {isLoading ? (
                    [...Array(20)].map((_, index) => (
                        <SkeletonMovieCard key={index} />
                    ))
                ) : (
                    movieStore.movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
};

export default observer(MovieList);
