import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {Movie} from '../api/images';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

type RootDrawerParamList = {
  Home: undefined;
  Films: undefined;
  'TV Serials': undefined;
  MovieDetail: {movie: Movie};
};

type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;

const MovieCard = React.memo(({item}: {item: Movie}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('MovieDetail', {movie: item});
  };

  return (
    <TouchableOpacity onPress={handlePress} className="flex-1 items-center mb-4 p-2">
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
    </TouchableOpacity>
  );
});

const RenderItemsList = (props: any) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = props;

  // Оптимизированный renderItem
  const renderItem = React.useCallback(
    ({item}: {item: Movie}) => <MovieCard item={item} />,
    [],
  );

  // Оптимизированный keyExtractor
  const keyExtractor = (item: Movie, index: number) =>
    `${item.kinopoiskId}_${index}`;

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

  const movies = data?.pages.flatMap((page: any) => page.items) || [];

  return (
    <View className="flex-1 bg-gray-700 p-4">
      <Text className="text-xl font-bold text-center mb-4 text-blue-400">
        Галерея фильмов ({movies.length} фильмов)
      </Text>
      <FlatList
        onEndReached={handleUpdate}
        onEndReachedThreshold={3}
        data={movies}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
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

export default RenderItemsList;
