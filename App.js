import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from './src/components/AuthStack';
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
const connectDB = require('../KEEP/src/components/db');

connectDB();


import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false}}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cattle" component={CattleScreen} />
      <Stack.Screen name="Statements" component={StatementsScreen} />
      <Stack.Screen name="Milk" component={MilkScreen} />
      <Stack.Screen name="Expense" component={ExpenseScreen} />

      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Sales" component={SalesScreen} />
      <Stack.Screen name="SidebarDrawer" component={SidebarDrawer} />
      
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;