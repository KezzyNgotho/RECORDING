import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {MainStackNavigator, LoginStackNavigator } from '../KEEP/src/components/navigation/StackNavigator';
const connectDB = require('../KEEP/src/components/db');
//import { HeaderBackButton } from '@react-navigation/stack';


connectDB();

const Lighttheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#CEF3CE',
    primary: '#CEF3CE',
    accent: '#CEF3CE',
  },
};

const Darktheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'red',
    primary: 'black',
    accent: '#CEF3CE',
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
