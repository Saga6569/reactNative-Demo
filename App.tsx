import * as React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Movie} from './src/api/images';
import BackArrow from './src/components/icons/BackArrow';

import Home from './src/screenPage/Home';
import FilmsList from './src/screenPage/FilmsList';
import TvSerial from './src/screenPage/TvSerial';
import MovieDetail from './src/screens/MovieDetail';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './global.css';

const queryClient = new QueryClient();

type RootDrawerParamList = {
  Home: undefined;
  Films: undefined;
  'TV Serials': undefined;
  MovieDetail: {movie: Movie};
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View>
        <BackArrow />
      </View>
    </TouchableOpacity>
  );
};

const movieDetailOptions = {
  headerShown: true,
  title: 'Детали фильма',
  drawerItemStyle: StyleSheet.create({
    hidden: {
      display: 'none',
    },
  }).hidden,
  headerLeft: () => <BackButton />,
};

const DrawerScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Films" component={FilmsList} />
      <Drawer.Screen name="TV Serials" component={TvSerial} />
      <Drawer.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={movieDetailOptions}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <DrawerScreen />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
