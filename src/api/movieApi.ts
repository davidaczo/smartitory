import axios, { AxiosInstance } from 'axios';
import { MovieDetail, MoviesResponse } from '../types';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '43a7ea280d085bd0376e108680615c7f'
    }
});

const movieApi = {

    async fetchTrendingMovies(page: number) {
        try {
            const response = await axiosInstance.get<MoviesResponse>('/trending/movie/week', {
                params: { page }
            });
            if (response.status !== 200) {
                throw new Error('Failed to fetch trending movies');
            }
            return response.data;
        } catch (error: any) {
            if (error.response.data.status_message) {
                throw new Error(error.response.data.status_message);
            } else {
                throw error;
            }
        }
    },

    async searchMovies(query: string, page: number) {
        try {
            const response = await axiosInstance.get<MoviesResponse>('/search/movie', {
                params: { page, query }
            });

            if (response.status !== 200) {
                throw new Error('Failed to search movies');
            }
            return response.data;
        } catch (error) {
            console.error('Failed to search movies: ', error);
            throw error;
        }
    },

    async fetchMovieDetail(movieId: string) {
        try {
            const response = await axiosInstance.get<MovieDetail>(`/movie/${movieId}`);
            console.log("response: ", response)
            if (response.status !== 200) {
                throw new Error('Failed to search movies');
            }
            return response.data;
        } catch (error: any) {
            if (error.response.data.status_message) {
                throw new Error(error.response.data.status_message);
            } else {
                throw error;
            }
        }
    },

    async fetchSimilarMovies(movieId: string) {
        try {
            const response = await axiosInstance.get(`/movie/${movieId}/similar`);
            if (response.status !== 200) {
                throw new Error('Failed to search movies');
            }
            return response.data;
        } catch (error: any) {
            console.log("error: ", error.response)
            if (error.response.data.status_message) {
                throw new Error(error.response.data.status_message);
            } else {
                throw error;
            }
        }
    }
};

export default movieApi;
