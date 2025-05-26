export interface Movie {
  kinopoiskId: number;
  nameRu: string;
  nameOriginal: string;
  posterUrl: string;
  ratingKinopoisk: number;
  year: number;
}

export interface MoviesResponse {
  items: Movie[];
  total: number;
  totalPages: number;
  page: number;
}