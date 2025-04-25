import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '@screens/FeedScreen';
import CreatePostScreen from '@screens/CreatePostScreen';
import NotificationScreen from '@screens/NotificationScreen';
import ProfileScreen from '@screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'หน้าหลัก') iconName = 'home-outline';
          else if (route.name === 'สร้างโพสต์') iconName = 'create-outline';
          else if (route.name === 'แจ้งเตือน') iconName = 'notifications-outline';
          else if (route.name === 'โปรไฟล์') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0055ff',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontFamily: 'NotoSansThai-Regular',
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="หน้าหลัก" component={FeedScreen} />
      <Tab.Screen name="สร้างโพสต์" component={CreatePostScreen} />
      <Tab.Screen name="แจ้งเตือน" component={NotificationScreen} />
      <Tab.Screen name="โปรไฟล์" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabs;