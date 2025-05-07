import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import LoginScreen from '@screens/LoginScreen';
import CampusSelectScreen from '@screens/CampusSelectScreen';
import SetDisplayNameScreen from '@screens/SetDisplayNameScreen';
import SettingsScreen from '@screens/SettingsScreen';
import MainDrawerNavigator from './navigation/MainDrawerNavigator';
import AvatarFullScreen from '@screens/AvatarFullScreen';
import CreatePostScreen from '@screens/CreatePostScreen';
import PostDetailScreen from '@screens/PostDetailScreen';
import SearchScreen from '@screens/SearchScreen';
import UserProfileScreen from '@screens/UserProfileScreen';
import ProfileScreen from '@screens/ProfileScreen';
import { CampusProvider } from './contexts/CampusContext';
import { ForumProvider } from './contexts/ForumContext';
import { UserProvider } from './contexts/UserContext';
import { PostProvider } from './contexts/PostContext';
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
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsLoggedIn(!!token); // true if token exists, false otherwise
      } catch (error) {
        console.error('Failed to check login status:', error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider>
        <UserProvider>
          <PostProvider>
            <CampusProvider>
              <ForumProvider>
                <NavigationContainer>
                  <Stack.Navigator initialRouteName={isLoggedIn ? 'MainApp' : 'Login'}>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="CampusSelect" component={CampusSelectScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SetDisplayName" component={SetDisplayNameScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="MainApp" component={MainDrawerNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="AvatarFullScreen" component={AvatarFullScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
                  </Stack.Navigator>
                </NavigationContainer>
              </ForumProvider>
            </CampusProvider>
          </PostProvider>
        </UserProvider>
      </PaperProvider>
    </I18nextProvider>
  );
};

export default App;