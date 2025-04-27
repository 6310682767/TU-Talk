import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { styles } from '@styles/profileStyles';
import MyPostsScreen from './MyPostsScreen'; // นำเข้า MyPostsScreen
import SavedPostsScreen from './SavedPostsScreen'; // นำเข้า SavedPostsScreen
import StarredUsersScreen from './StarredUsersScreen'; // นำเข้า StarredUsersScreen
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../types';
import { useTranslation } from 'react-i18next';

// กำหนดประเภทของ navigation
type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SettingsScreen'>;

const Tab = createMaterialTopTabNavigator(); 

const ProfileScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>(); // ใช้ประเภท StackNavigationProp
  const { userProfile } = useUser();

  const handleChangeAvatar = () => {
    alert('เปลี่ยนรูปโปรไฟล์');
  };

  const handleChangeDisplayName = () => {
    alert('เปลี่ยนชื่อแสดง');
  };

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action icon="arrow-left" color="white" onPress={() => navigation.goBack()  } />
        <Appbar.Content title="" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Card ขาว */}
        <View style={styles.card}>
        
          {/* ปุ่มตั้งค่า */}
          <TouchableOpacity
            style={styles.settingsIcon}
            onPress={() => navigation.navigate('SettingsScreen')} 
          >
            <MaterialCommunityIcons name="cog" size={24} color="#B0B0B0" />
          </TouchableOpacity>
          
          {/* รูปโปรไฟล์ */}
          <TouchableOpacity
            onPress={() => navigation.navigate('AvatarFullScreen')}
            style={styles.avatarContainer}
          >
            <Image
              source={{ uri: userProfile?.avatar || 'https://via.placeholder.com/150' }}
              style={styles.avatar}
            />
          </TouchableOpacity>

          {/* Display Name */}
          <TouchableOpacity onPress={handleChangeDisplayName}>
            <Text style={styles.displayName}>
              {userProfile?.displayName || 'ชื่อผู้ใช้'}
            </Text>
          </TouchableOpacity>

          {/* Student ID */}
          <Text style={styles.studentId}>
            {'@' + (userProfile?.studentId || 'รหัสนักศึกษา')}
          </Text>

          {/* รายละเอียด */}
          <View style={styles.detailsContainer}>
            <DetailRow label="ชื่อ-นามสกุล" value={userProfile?.name || '-'} />
            <DetailRow label="คณะ" value={userProfile?.faculty || '-'} />
            <DetailRow label="สาขา" value={userProfile?.department || '-'} />
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: styles.tabLabel,
              tabBarActiveTintColor: '#D84A34',
              tabBarInactiveTintColor: '#000',
              tabBarIndicatorStyle: { backgroundColor: '#D84A34' },
              tabBarStyle: styles.tabBarStyle,
            }}
          >
            <Tab.Screen name="โพสต์" component={MyPostsScreen} />
            <Tab.Screen name="ที่บันทึก" component={SavedPostsScreen} />
            <Tab.Screen name="ติดดาว" component={StarredUsersScreen} />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </View>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

export default ProfileScreen;
