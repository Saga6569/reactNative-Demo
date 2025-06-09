import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
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
  description: string | null;
}

export interface MoviesResponse {
  items: Movie[];
  total: number;
  totalPages: number;
  page: number;
}

export interface IOptions {
  type: string;
  ratingFrom: number;
  ratingTo: number;
  yearFrom: number;
  yearTo: number;
}

//https://kinopoiskapiunofficial.tech/api/v2.2/films/222/seasons
const fetchMovieVideo = async (id: string): Promise<MoviesResponse> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': `${API_TOKEN_KINOPOISK}`,
    },
  };

  const response = await fetch(
    `${API_URL_KINOPOISK}/films/${id}/videos`,
    options,
  );

  if (!response.ok) {
    throw new Error('Ошибка при загрузке фильмов');
  }

  const data = await response.json();
  return data;
};

export const fetchMovie = async (id: string): Promise<MoviesResponse> => {
  // const initOptions: IOptions = {
  //   type: 'ALL',
  //   ratingFrom: 0,
  //   ratingTo: 10,
  //   yearFrom: 1000,
  //   yearTo: 3000,
  // };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': `${API_TOKEN_KINOPOISK}`,
    },
  };

  const response = await fetch(`${API_URL_KINOPOISK}/films/${id}`, options);

  if (!response.ok) {
    throw new Error('Ошибка при загрузке фильмов');
  }

  const data = await response.json();
  return data;
};

export const useMovieVideo = (id: string) => {
  return useQuery({
    queryKey: ['movieVideo', id],
    queryFn: () => fetchMovieVideo(id),
    enabled: !!id,
  });
};

// Функция для получения фильмов
export const fetchMovies = async (
  page: number,
  type: string,
): Promise<MoviesResponse> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': `${API_TOKEN_KINOPOISK}`,
    },
  };

  const response = await fetch(
    `${API_URL_KINOPOISK}/films?order=RATING&type=${type}&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${page}`,
    options,
  );

  if (!response.ok) {
    throw new Error('Ошибка при загрузке фильмов');
  }

  const data = await response.json();
  console.log('Raw API Response:', data);

  return data;
};

// export const useMovieVideoAndMovie = (id: string) => {
//   const movieQuery = useQuery({
//     queryKey: ['movie', id],
//     queryFn: () => fetchMovie(id),
//     enabled: !!id,
//   });

//   const videoQuery = useQuery({
//     queryKey: ['movieVideo', id],
//     queryFn: () => fetchMovieVideo(id),
//     enabled: !!id,
//   });

//   return {
//     movie: movieQuery.data,
//     video: videoQuery.data,
//     isLoading: movieQuery.isLoading || videoQuery.isLoading,
//     error: movieQuery.error || videoQuery.error,
//   };
// };

export const useMovie = (id: string) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovie(id),
    enabled: !!id,
  });
};

const getNextPageParam = (
  lastPage: MoviesResponse,
  allPages: MoviesResponse[],
) => {
  const currentPage = allPages.length;
  if (currentPage < lastPage.totalPages) {
    const nextPage = currentPage + 1;
    return nextPage;
  }
};

// Хук для использования в компонентах
export const useMovies = () => {
  return useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: ({pageParam = 1}) => {
      return fetchMovies(pageParam, 'ALL');
    },
    getNextPageParam: getNextPageParam,
    initialPageParam: 1,
  });
};

export const useMoviesFilms = () => {
  return useInfiniteQuery({
    queryKey: ['films'],
    queryFn: ({pageParam = 1}) => {
      return fetchMovies(pageParam, 'FILM');
    },
    getNextPageParam: getNextPageParam,
    initialPageParam: 1,
  });
};

export const useMoviesTvSerial = () => {
  return useInfiniteQuery({
    queryKey: ['tvSerial'],
    queryFn: ({pageParam = 1}) => {
      return fetchMovies(pageParam, 'TV_SERIES');
    },
    getNextPageParam: getNextPageParam,
    initialPageParam: 1,
  });
};
