export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  budget: number;
  overview: string;
  backdrop_path: string;
  homepage: string | null;
  imdb_id: string | null;
  revenue: number;
  production_companies: ProductionCompany[];
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}
