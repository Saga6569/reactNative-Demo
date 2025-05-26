import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {useMovies, Movie} from '../api/images';

// Выносим компонент карточки фильма в отдельный компонент
const MovieCard = React.memo(({item}: {item: Movie}) => (
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
));

const Home = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies();

  // Оптимизированный renderItem
  const renderItem = React.useCallback(
    ({item}: {item: Movie}) => <MovieCard item={item} />,
    [],
  );

  // Оптимизированный keyExtractor
  const keyExtractor = React.useCallback(
    (item: Movie) => item.kinopoiskId.toString(),
    [],
  );

  const handleUpdate = React.useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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

  const movies = data?.pages.flatMap(page => page.items) || [];

  return (
    <View className="flex-1 bg-gray-700 p-4">
      <Text className="text-xl font-bold text-center mb-4 text-blue-400">
        Галерея ({movies.length} фильмов)
      </Text>
      <FlatList
        onEndReached={handleUpdate}
        onEndReachedThreshold={1}
        data={movies}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        // windowSize={5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-4">
              <Text className="text-white text-center">Загрузка...</Text>
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default React.memo(Home);
