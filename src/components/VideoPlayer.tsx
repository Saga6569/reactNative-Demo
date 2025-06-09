import Video from 'react-native-video';
const VideoPlayer = ({url}: {url: string}) => (
  <Video
    source={{
      uri: url,
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    }}
    style={{width: '100%', aspectRatio: 16 / 9}}
    onError={error => {
      console.log('Ошибка:', error);
    }}
    onLoad={() => {
      console.log('Загружено');
    }}
    onLoadStart={() => {
      console.log('Начало загрузки');
    }}
    onBuffer={({isBuffering}) => {
      console.log('Буферизация:', isBuffering);
    }}
    onProgress={({currentTime}) => {
      console.log('Текущее время:', currentTime);
    }}
    controls
  />
);

export default VideoPlayer;
