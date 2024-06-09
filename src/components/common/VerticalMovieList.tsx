import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { Movie } from '../../types';
import { movieStore } from '../../mobx/movieStore';

interface VerticalMovieListProps {
    movies: Movie[];
    title: string;
    isLoading: boolean;
}

const VerticalMovieList: React.FC<VerticalMovieListProps> = ({ movies, title, isLoading }) => {
    const navigate = useNavigate();
    const [moviesToShow, setMoviesToShow] = useState<number>(2);
    const [startIndexSM, setStartIndexSM] = useState<number>(0);

    useEffect(() => {
        const updateMoviesToShow = () => {
            if (window.innerWidth >= 1024) {
                setMoviesToShow(4);
            } else {
                setMoviesToShow(2);
            }
        };

        updateMoviesToShow();
        window.addEventListener('resize', updateMoviesToShow);

        return () => {
            window.removeEventListener('resize', updateMoviesToShow);
        };
    }, []);

    const handleCardClick = (movieId: number) => {
        setStartIndexSM(0)
        movieStore.addRecentlyViewedMovie(movies.find((movie) => movie.id === movieId)!);
        navigate(`/movie/${movieId}`);
    };

    const handlePrevious = () => {
        setStartIndexSM(startIndexSM - moviesToShow);
    };

    const handleNext = () => {
        setStartIndexSM(startIndexSM + moviesToShow);
    };

    if (movies && movies.length && !isLoading) {
        return (
            <div>
                <h1 className="font-medium text-4xl pt-8 px-8">{title}</h1>
                <div className='relative flex w-full py-4 justify-center align-bottom overflow-x-auto'>
                    {startIndexSM === 0 ? null : (
                        <button
                            onClick={handlePrevious}
                            className="absolute z-20 left-0 transform -translate-y-1/2 top-1/2 font-medium p-4 border rounded-full bg-gray-50 hover:bg-gray-200 cursor-pointer flex items-center"
                        >
                            <FaChevronCircleLeft size={40} />
                        </button>
                    )}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                        {movies.slice(startIndexSM, startIndexSM + moviesToShow).map((movie, index) => (
                            <div
                                key={index}
                                className="border p-4 z-10 rounded shadow-xl hover:scale-105 duration-300 transition cursor-pointer"
                                onClick={() => { handleCardClick(movie.id); }}
                            >
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full" />
                                <div className="flex flex-col justify-center align-middle">
                                    <h2 className="text-xl mt-2 mx-auto">{movie.title}</h2>
                                    <p className="text-gray-500 mx-auto">{new Date(movie.release_date).getFullYear()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {startIndexSM + moviesToShow < movies.length ? (
                        <button
                            onClick={handleNext}
                            className="absolute right-0 transform -translate-y-1/2 top-1/2 z-10 font-medium p-3 border rounded-full bg-gray-50 hover:bg-gray-200 cursor-pointer flex items-center"
                        >
                            <FaChevronCircleRight size={40} />
                        </button>
                    ) : null}
                </div>

            </div>
        );
    }

    return null;
};

export default VerticalMovieList;
