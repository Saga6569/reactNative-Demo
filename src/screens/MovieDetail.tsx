import React, {useState} from 'react';
import {View, Text, Image, ScrollView, Modal, TouchableOpacity} from 'react-native';
import {Movie, useMovie, useMovieVideo} from '../api/images';
import VideoPlayer from '../components/VideoPlayer';

const MovieDetail = ({route}: {route: {params: {movie: Movie}}}) => {
  const {movie} = route.params;
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const {status: statusMovie, data: dataMovie} = useMovie(
    String(movie.kinopoiskId),
  );

  const {status: statusVideo, data: dataVideo} = useMovieVideo(
    String(movie.kinopoiskId),
  );

  if (statusMovie !== 'success' || statusVideo !== 'success') {
    return <Text>Loading...</Text>;
  }
  console.log(dataVideo, 'dataVideo');
  console.log(dataMovie, 'dataMovie');

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

        <Text className="text-white text-lg mb-1">Описание:</Text>
        <Text className="text-gray-300 mb-4">
          {dataMovie.description ?? 'Нет описания'}
        </Text>

        <View className="flex-row items-center mb-4">
          <Text className="text-white text-lg mb-1">Страна :</Text>
          <Text className="text-gray-300 ml-2">
            {movie.countries?.map(country => country.country).join(', ')}
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-2">
          {movie.genres?.map((genre, index) => (
            <View key={index} className="bg-blue-500 px-3 py-1 rounded-full">
              <Text className="text-white">{genre.genre}</Text>
            </View>
          ))}
        </View>
        <View className="flex-row flex-wrap gap-2 pt-4">
          {dataVideo.items.map((video, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedVideo(video);
                setIsVideoVisible(true);
              }}
              className="w-full bg-gray-600 p-2 rounded-lg"
            >
              <Text className="text-white text-center">{video.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Выдвижной плеер */}
        {isVideoVisible && selectedVideo && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isVideoVisible}
            onRequestClose={() => setIsVideoVisible(false)}
          >
            <View className="flex-1 bg-black/80 justify-center items-center">
              <View className="bg-gray-800 p-4 rounded-xl w-[90%]">
                <TouchableOpacity
                  onPress={() => setIsVideoVisible(false)}
                  className="absolute right-4 top-4 z-10"
                >
                  <Text className="text-white text-xl">✕</Text>
                </TouchableOpacity>
                <VideoPlayer url={selectedVideo.url} />
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ScrollView>
  );
};

export default MovieDetail;
