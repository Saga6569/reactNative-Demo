import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {Movie, useMovie} from '../api/images';

const MovieDetail = ({route}: {route: {params: {movie: Movie}}}) => {
  const {movie} = route.params;

  console.log(movie, 'movie');

  const {status, data} = useMovie(String(movie.kinopoiskId));

  if (status !== 'success') {
    return <Text>Loading...</Text>;
  }

  console.log(data, 'data');

  return (
    <ScrollView className="flex-1 bg-gray-700">
      <View className="p-4">
        {movie.posterUrlPreview ? (
          <Image
            source={{uri: movie.posterUrlPreview}}
            className="w-full h-96 rounded-lg mb-4"
            resizeMode="contain"
          />
        ) : (
          <View className="w-full h-96 rounded-lg mb-4 bg-gray-600 items-center justify-center">
            <Text className="text-white text-center px-2">Нет постера</Text>
          </View>
        )}

        <Text className="text-2xl font-bold text-white mb-2">
          {movie.nameRu ?? movie.nameOriginal}
        </Text>

        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-300">
            Рейтинг: {movie.ratingKinopoisk}
          </Text>
          <Text className="text-gray-300">Год: {movie.year}</Text>
        </View>

        <Text className="text-white text-lg mb-2">Описание:</Text>
        <Text className="text-gray-300 mb-4">{data.description ?? ''}</Text>

        <View className="flex-row flex-wrap gap-2">
          {movie.genres?.map((genre, index) => (
            <View key={index} className="bg-blue-500 px-3 py-1 rounded-full">
              <Text className="text-white">{genre.genre}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetail;
