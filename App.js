import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {MainStackNavigator, LoginStackNavigator } from '../KEEP/src/components/navigation/StackNavigator';
const connectDB = require('../KEEP/src/components/db');

connectDB();

const Lighttheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    primary: '#6200ee',
    accent: '#03dac4',
  },
};

const Darktheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#121212',
    primary: '#bb86fc',
    accent: '#03dac6',
  },
};

const App = () => {
  const isDarkTheme = 'dark';

  return (
    <PaperProvider theme={isDarkTheme === 'dark' ? Darktheme : Lighttheme}>
      <NavigationContainer>
        <LoginStackNavigator />
    
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
