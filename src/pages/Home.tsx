import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import SearchBar from "../components/homePage/SearchBar";
import MovieList from "../components/homePage/MovieList";
import Pagination from "../components/homePage/Pagination";
import { movieStore } from "../mobx/movieStore";
import NoMoviesFound from "../components/common/NoMoviesFound";
import ErrorFallback from "../components/common/ErrorFallback";
import VerticalMovieList from "../components/common/VerticalMovieList";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTrendingMovies = useCallback(async (page: number) => {
        setIsLoading(true);
        setError(null);
        try {
            await movieStore.fetchMovies(page);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSearch = async (searchQuery: string) => {
        setError(null);
        setIsLoading(true);
        if (searchQuery !== '') {
            try {
                await movieStore.searchMovies(searchQuery, movieStore.currentPage);
            } catch (error: any) {
                setError(error.message);
            }
        } else {
            fetchTrendingMovies(1);
        }
        setIsLoading(false);
    };

    
    const findMovies = useCallback(() => {
        if (movieStore.searchQuery === "") {
            fetchTrendingMovies(movieStore.currentPage);
        } else {
            handleSearch(movieStore.searchQuery);
        }
    }, []);

    useEffect(() => {
        findMovies();
    }, [movieStore.currentPage, findMovies]);


    return (
        <>
            <SearchBar onSearch={handleSearch} />
            {error && <ErrorFallback
                errorMessage={error}
                onRetry={findMovies}
                goToHome={function () {
                    movieStore.setCurrentPage(1);
                }}
            />
            }
            {!error && movieStore.movies.length === 0 && <NoMoviesFound />}
            {!error && movieStore.movies.length > 0 &&
                <div>
                    <VerticalMovieList
                        isLoading={isLoading}
                        movies={movieStore.recentlyViewedMovies}
                        title={"Recently Viewed"} />
                    <MovieList isLoading={isLoading} />

                </div>
            }
            <Pagination />
        </>
    );
};

export default observer(Home);
