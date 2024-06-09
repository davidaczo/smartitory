import { makeAutoObservable, observable, action } from "mobx";
import { Movie } from "../types";
import movieApi from "../api/movieApi";

class MovieStore {

    @observable movies: Movie[] = [];
    @observable searchQuery: string = "";
    @observable currentPage: number = 1;
    @observable totalPages: number = 1;
    @observable recentlyViewedMovies: Movie[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    @action fetchMovies = async (page: number) => {
        try {
            this.setSearchQuery('');
            const response = await movieApi.fetchTrendingMovies(page);
            this.setMovies(response.results);
            this.setTotalPages(response.total_pages);
            this.setCurrentPage(page);
        } catch (error: any) {
            throw error;
        }
    }

    @action searchMovies = async (query: string, page: number) => {
        try {
            this.setCurrentPage(page);
            this.setSearchQuery(query);
            const response = await movieApi.searchMovies(query, page);
            this.setMovies(response.results);
            this.setTotalPages(response.total_pages);
        } catch (error: any) {
            throw error;
        }
    }

    @action fetchMovie = async (movieId: string) => {
        try {
            return await movieApi.fetchMovieDetail(movieId);
        } catch (error: any) {
            throw error;
        }
    }

    @action fetchSimilarMovies = async (movieId: string) => {
        try {
            return await movieApi.fetchSimilarMovies(movieId);
        } catch (error: any) {
            throw error;
        }
    }

    @action addRecentlyViewedMovie = (movie: Movie) => {
        this.recentlyViewedMovies = this.recentlyViewedMovies.filter(m => m.id !== movie.id);
        this.recentlyViewedMovies.unshift(movie);
    }

    @action setMovies = (movies: any) => {
        this.movies = movies;
    }

    @action getMovies = () => {
        return this.movies;
    }

    @action setTotalPages = (totalPages: number) => {
        this.totalPages = totalPages;
    }

    @action getTotalPages = () => {
        return this.totalPages;
    }

    @action setCurrentPage = (page: number) => {
        this.currentPage = page;
    }

    @action getCurrentPage = () => {
        return this.currentPage;
    }

    @action setSearchQuery = (query: string) => {
        this.searchQuery = query;
    }

    @action getSearchQuery = () => {
        return this.searchQuery;
    }

    @action setRecentlyViewedMovies = (movies: Movie[]) => {
        this.recentlyViewedMovies = movies;
    }

    @action getRecentlyViewedMovies = () => {
        return this.recentlyViewedMovies;
    }
}


export const movieStore = new MovieStore();


