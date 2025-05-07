import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import FeedScreen from '../screens/FeedScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileStackScreen from './ProfileStackScreen';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#EFB553',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        tabBarLabelStyle: {
          fontFamily: 'NotoSansThai-Regular',
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="หน้าหลัก"
        component={FeedScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="แจ้งเตือน"
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="โปรไฟล์"
        component={ProfileStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}