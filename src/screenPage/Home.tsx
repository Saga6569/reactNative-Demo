import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {useMovies} from '../api/images';

const Home = () => {
  const {data, isLoading, error} = useMovies();

  console.log(data);

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-700 items-center justify-center">
        <Text className="text-white text-lg">Загрузка...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-gray-700 items-center justify-center">
        <Text className="text-red-500 text-lg">Ошибка загрузки</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-700 p-4">
      <Text className="text-xl font-bold text-center mb-4 text-blue-400">
        Галерея
      </Text>
      <FlatList
        data={data?.items}
        keyExtractor={item => item.kinopoiskId.toString()}
        numColumns={2}
        renderItem={({item}) => (
          <View className="flex-1 items-center mb-4 p-2">
            {item.posterUrl ? (
              <Image
                source={{uri: item.posterUrl}}
                className="w-40 h-60 rounded-lg mb-2 border-4 border-blue-500"
                resizeMode="cover"
              />
            ) : (
              <View className="w-40 h-60 rounded-lg mb-2 border-4 border-blue-500 bg-gray-600 items-center justify-center">
                <Text className="text-white text-center px-2">Нет постера</Text>
              </View>
            )}
            <Text className="text-base text-white text-center mb-1">
              {item.nameRu ?? item.nameOriginal}
            </Text>
            <Text className="text-sm text-gray-300">
              Рейтинг: {item.ratingKinopoisk}
            </Text>
            <Text className="text-sm text-gray-300">Год: {item.year}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;
