import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../Screens/HomeScreen';
import SettingsScreen from '../../Screens/SettingsScreen';
import CattleScreen from '../../Screens/CattleScreen';
import StatementsScreen from '../../Screens/StatementsScreen';
import MilkScreen from '../../Screens/MilkScreen';
import SalesScreen from '../../Screens/SalesScreen';
import ExpenseScreen from '../../Screens/ExpenseScreen';
import NotificationScreen from '../../Screens/NotificationScreen';
import SidebarDrawer from '../../Screens/SidebarDrawer';
import SignUpScreen from '../../Screens/SignUpScreen';
import LoginScreen from '../../Screens/LoginScreen';

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
    headerShown: false,
    headerBackTitle: 'Back',
};

const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cattle" component={CattleScreen} />
            <Stack.Screen name="Statements" component={StatementsScreen} />
            <Stack.Screen name="Milk" component={MilkScreen} />
            <Stack.Screen name="Sales" component={SalesScreen} />
            <Stack.Screen name="Expenses" component={ExpenseScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="SidebarDrawer" component={SidebarDrawer} />
            
        </Stack.Navigator>
    );
};
const LoginStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainStackNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };
  

export { MainStackNavigator, LoginStackNavigator };