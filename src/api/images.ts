import {useInfiniteQuery} from '@tanstack/react-query';
import {API_TOKEN_KINOPOISK, API_URL_KINOPOISK} from '@env';
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
  totalPages: number;
  page: number;
}

// Функция для получения фильмов
export const fetchMovies = async (page: number): Promise<MoviesResponse> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': `${API_TOKEN_KINOPOISK}`,
    },
  };

  const response = await fetch(
    `${API_URL_KINOPOISK}/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${page}`,
    options,
  );

  if (!response.ok) {
    throw new Error('Ошибка при загрузке фильмов');
  }

  const data = await response.json();
  console.log('Raw API Response:', data);

  return data;
};

// Хук для использования в компонентах
export const useMovies = () => {
  return useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: ({pageParam = 1}) => {
      return fetchMovies(pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      if (currentPage < lastPage.totalPages) {
        const nextPage = currentPage + 1;
        return nextPage;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
