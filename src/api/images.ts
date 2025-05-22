import {useQuery} from '@tanstack/react-query';
import {API_TOKEN} from '@env';
// Типы для ответа API
export interface Movie {
  kinopoiskId: number;
  imdbId: string | null;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  countries: Array<{
    country: string;
  }>;
  genres: Array<{
    genre: string;
  }>;
  ratingKinopoisk: number;
  ratingImdb: number | null;
  year: number;
  type: string;
  posterUrl: string;
  posterUrlPreview: string;
}

export interface MoviesResponse {
  items: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

// Функция для получения фильмов
export const fetchMovies = async (): Promise<MoviesResponse> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': API_TOKEN,
    },
  };

  const response = await fetch(
    'https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1',
    options,
  );

  if (!response.ok) {
    throw new Error('Ошибка при загрузке фильмов');
  }

  return response.json();
};

// Хук для использования в компонентах
export const useMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });
};
