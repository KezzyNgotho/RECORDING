import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/Screens/HomeScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import LoginScreen from './src/Screens/LoginScreen';
import CattleScreen from './src/Screens/CattleScreen';
import StatementsScreen from './src/Screens/StatementsScreen';
import MilkScreen from './src/Screens/MilkScreen';
import SalesScreen from './src/Screens/SalesScreen';
import ExpenseScreen from './src/Screens/ExpenseScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image, View, StyleSheet, Text } from 'react-native';
import NotificationScreen from './src/Screens/NotificationScreen';
import SidebarDrawer from './src/Screens/SidebarDrawer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptionStyle = {
  headerShown: false,
  headerBackTitle: 'Back',
};

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cattle" component={CattleScreen} />
      <Stack.Screen name="Statements" component={StatementsScreen} />
      <Stack.Screen name="Milk" component={MilkScreen} />
      <Stack.Screen name="Sales" component={SalesScreen} />
      <Stack.Screen name="Expenses" component={ExpenseScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="SidebarDrawer" component={SidebarDrawer} />
    </Stack.Navigator>
  );
}

export default function App() {
  const userIsLoggedIn = true; // Set this flag based on the user's authentication status

  useEffect(() => {
    // Navigates to the Home screen upon login
    if (userIsLoggedIn) {
      navigation.navigate('Home');
    }
  }, [userIsLoggedIn]);

  return (
    <NavigationContainer>
      {userIsLoggedIn ? (
        <Tab.Navigator initialRouteName="Home" screenOptions={screenOptionStyle}>
          <Tab.Screen
            options={{
              tabBarLabel: '',
              tabBarIcon: ({ color }) => (
                <View style={styles.profile}>
                  <Image
                    source={require('../KEEP/src/Screens/assets/icons8-home-64.png')}
                    style={styles.profileImage}
                  />
                </View>
              ),
            }}
            name="Home"
            component={HomeStack}
          />
          <Tab.Screen
            options={{
              tabBarLabel: '',
              tabBarIcon: ({ color }) => (
                <View style={styles.profile}>
                  <Image
                    source={require('../KEEP/src/Screens/assets/icons8-settings-50.png')}
                    style={styles.profileImage}
                  />
                </View>
              ),
            }}
            name="Settings"
            component={SettingsScreen}
          />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
    backgroundColor: '#CEF3CE',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});
