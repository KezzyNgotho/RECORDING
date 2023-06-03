import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './src/Screens/HomeScreen';
import CattleScreen from './src/Screens/CattleScreen';
import StatementsScreen from './src/Screens/StatementsScreen';
import MilkScreen from './src/Screens/MilkScreen';
import SalesScreen from './src/Screens/SalesScreen';
import ExpenseScreen from './src/Screens/ExpenseScreen';
import NotificationScreen from './src/Screens/NotificationScreen';
import SidebarDrawer from './src/Screens/SidebarDrawer';
import SettingsScreen from './src/Screens/SettingsScreen';
import LoginScreen from './src/Screens/LoginScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
const connectDB = require('../db');



connectDB();


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptionStyle = {
  headerShown: false,
};

const BackButton = ({ navigation }) => {
  return (
    <MaterialCommunityIcons
      name="arrow-left"
      size={24}
      color="black"
      onPress={() => navigation.goBack()}
    />
  );
};

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...screenOptionStyle,
        headerLeft: ({ navigation }) => <BackButton navigation={navigation} />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cattle" component={CattleScreen} />
      <Stack.Screen name="Expenses" component={ExpenseScreen} />
      <Stack.Screen name="Milk" component={MilkScreen} />
      <Stack.Screen name="SidebarDrawer" component={SidebarDrawer} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Sales" component={SalesScreen} />
      <Stack.Screen name="Statements" component={StatementsScreen} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        ...screenOptionStyle,
        headerLeft: ({ navigation }) => <BackButton navigation={navigation} />,
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignUp"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
        <Stack.Screen name="SettingsStack" component={SettingsStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
