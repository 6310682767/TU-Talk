import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import CampusSelectScreen from './screens/CampusSelectScreen';
import SetDisplayNameScreen from './screens/SetDisplayNameScreen';
import MainDrawerNavigator from './navigation/MainDrawerNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [fontsLoaded] = useFonts({
    'NotoSansThai-Regular': require('./assets/fonts/NotoSansThai-Regular.ttf'),
    'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      const status = await checkIfUserIsLoggedIn();
      setIsLoggedIn(status);
    };
    checkLoginStatus();
  }, []);

  if (!fontsLoaded) return null;

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'MainApp' : 'Login'}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CampusSelect" component={CampusSelectScreen} />
          <Stack.Screen name="SetDisplayName" component={SetDisplayNameScreen} />
          <Stack.Screen name="MainApp" component={MainDrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

const checkIfUserIsLoggedIn = async () => false;

export default App;
