import React from 'react';
import {View, Text} from 'react-native';
import {useMoviesTvSerial} from '../api/images';
import RenderItemsList from '../components/RenderItemsList';

const TvSerial = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMoviesTvSerial();

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
      <RenderItemsList
        data={data}
        isLoading={isLoading}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </View>
  );
};

export default TvSerial;
