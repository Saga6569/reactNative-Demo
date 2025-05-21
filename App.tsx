import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStaticNavigation} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './global.css';
import Home from './src/screenPage/Home';
import Menu from './src/screenPage/Menu';

const queryClient = new QueryClient();

const Drawer = createDrawerNavigator({
  screens: {
    Home: Home,
    Notifications: Menu,
  },
});

const Navigation = createStaticNavigation(Drawer);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
