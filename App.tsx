import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/LoginScreen';
import CampusSelectScreen from '@screens/CampusSelectScreen';
import SetDisplayNameScreen from '@screens/SetDisplayNameScreen';
import SettingsScreen from '@screens/SettingsScreen';
import MainDrawerNavigator from './navigation/MainDrawerNavigator';
import { CampusProvider } from './contexts/CampusContext';
import { ForumProvider } from './contexts/ForumContext';
import { UserProvider } from './contexts/UserContext';
import { RootStackParamList } from 'types'; 
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator<RootStackParamList>(); 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [fontsLoaded] = useFonts({
    'NotoSansThai-Regular': require('./assets/fonts/NotoSansThai-Regular.ttf'),
    'NotoSansThai-Bold': require('./assets/fonts/NotoSansThai-Bold.ttf'),
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
    <PaperProvider>
    <UserProvider>
      <CampusProvider>
        <ForumProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={isLoggedIn ? 'MainApp' : 'Login'}>
              <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
              <Stack.Screen name="CampusSelect" component={CampusSelectScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="SetDisplayName" component={SetDisplayNameScreen}  options={{ headerShown: false }}/>
              <Stack.Screen name="MainApp" component={MainDrawerNavigator}  options={{ headerShown: false }} />
              <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </ForumProvider>
      </CampusProvider>
    </UserProvider>
    </PaperProvider>
  );
};

const checkIfUserIsLoggedIn = async () => false;

export default App;
