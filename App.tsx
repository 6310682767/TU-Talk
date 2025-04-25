import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';  
import CampusSelectScreen from './screens/CampusSelectScreen'; 
import SetDisplayNameScreen from './screens/SetDisplayNameScreen';
import HomeTabs from './navigation/HomeTabs';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [fontsLoaded] = useFonts({
    'NotoSansThai-Regular': require('./assets/fonts/NotoSansThai-Regular.ttf'),
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      const status = await checkIfUserIsLoggedIn();  // เช็คสถานะจาก AsyncStorage หรือ API
      setIsLoggedIn(status);
    };

    checkLoginStatus();
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'CampusSelect' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CampusSelect" component={CampusSelectScreen} />
        <Stack.Screen name="SetDisplayName" component={SetDisplayNameScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const checkIfUserIsLoggedIn = async () => {
  return false;  
};

export default App;
