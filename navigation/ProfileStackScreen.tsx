import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen'; // หน้าหลักของโปรไฟล์
import SettingsScreen from '../screens/SettingsScreen'; // หน้าตั้งค่า

const Stack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="SettingsScreen" 
        component={SettingsScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default ProfileStackScreen;
