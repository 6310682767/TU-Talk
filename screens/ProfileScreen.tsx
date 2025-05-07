import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { Appbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { useUser } from '../contexts/UserContext';
import MyPostsScreen from './MyPostsScreen';
import SavedPostsScreen from './SavedPostsScreen';
import StarredUsersScreen from './StarredUsersScreen';
import { styles } from '../styles/profileStyles';

type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

const Tab = createMaterialTopTabNavigator();

const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileNavigationProp>();
  const { userProfile, updateDisplayName } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(userProfile?.displayName || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalMounted, setIsModalMounted] = useState(false);
  const maxLength = 25;

  // Regex: Allow Thai letters (ก-๙), English letters (a-z, A-Z), numbers (0-9), spaces
  const validNameRegex = /^[ก-๙a-zA-Z0-9 ]*$/;

  console.log('ProfileScreen userProfile:', userProfile);
  console.log('ProfileScreen userProfile.avatar:', userProfile?.avatar);

  const handleChangeDisplayName = () => {
    setNewDisplayName(userProfile?.displayName || '');
    setErrorMessage('');
    setModalVisible(true);
    setIsModalMounted(false); // Reset mount state
  };

  const validateInput = (text: string) => {
    setNewDisplayName(text);
    if (text && !validNameRegex.test(text)) {
      setErrorMessage('ชื่อต้องไม่มีอักขระพิเศษ');
    } else {
      setErrorMessage('');
    }
  };

  const isValidInput = () => {
    return newDisplayName.trim() && validNameRegex.test(newDisplayName);
  };

  const handleConfirm = () => {
    if (isValidInput()) {
      updateDisplayName(newDisplayName.trim());
      setModalVisible(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setErrorMessage('');
    setIsModalMounted(false);
  };

  // Set modal mounted state to trigger visibility
  useEffect(() => {
    if (modalVisible) {
      setIsModalMounted(true);
    } else {
      setIsModalMounted(false);
    }
  }, [modalVisible]);

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color="#FFF" onPress={() => navigation.goBack()} />
          <Appbar.Content title="" titleStyle={styles.appbarTitle} />
        </Appbar.Header>
        <Text style={styles.errorText}>
          {t('profile.notFound') || 'ไม่พบข้อมูลผู้ใช้ (ตรวจสอบ UserContext)'}
        </Text>
      </View>
    );
  }

  const avatarSource = typeof userProfile.avatar === 'string' && userProfile.avatar
    ? { uri: userProfile.avatar }
    : typeof userProfile.avatar === 'number'
    ? userProfile.avatar
    : require('../assets/images/Generic avatar.png');

  console.log('ProfileScreen avatarSource:', avatarSource);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="#FFF" onPress={() => navigation.goBack()} />
        <Appbar.Content title="" titleStyle={styles.appbarTitle} />
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <MaterialCommunityIcons name="cog" size={24} color="#FFF" />
        </TouchableOpacity>
      </Appbar.Header>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        onLayout={(e) => console.log('ScrollView height:', e.nativeEvent.layout.height)}
      >
        <View
          style={styles.card}
          onLayout={(e) => console.log('Card height:', e.nativeEvent.layout.height)}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('AvatarFullScreen', { uri: avatarSource, userId: userProfile.userId })}
            style={styles.avatarContainer}
          >
            <Image
              source={avatarSource}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleChangeDisplayName}>
            <Text style={styles.displayName}>
              {userProfile.displayName || 'ชื่อผู้ใช้'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.studentId}>
            {'@' + (userProfile.studentId || 'รหัสนักศึกษา')}
          </Text>

          <View style={styles.detailsContainer}>
            <DetailRow label={'ชื่อ-นามสกุล'} value={userProfile.name || '-'} />
            <DetailRow label={'คณะ'} value={userProfile.faculty || '-'} />
            <DetailRow label={'สาขา'} value={userProfile.department || '-'} />
          </View>
        </View>

        <View
          style={styles.tabsContainer}
          onLayout={(e) => console.log('Tabs height:', e.nativeEvent.layout.height)}
        >
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: styles.tabLabel,
              tabBarActiveTintColor: '#D84A34',
              tabBarInactiveTintColor: '#666',
              tabBarIndicatorStyle: { backgroundColor: '#D84A34' },
              tabBarStyle: styles.tabBarStyle,
            }}
          >
            <Tab.Screen
              name="โพสต์"
              component={MyPostsScreen}
              initialParams={{ userId: userProfile.userId }}
            />
            <Tab.Screen
              name="ที่บันทึก"
              component={SavedPostsScreen}
              initialParams={{ userId: userProfile.userId }}
            />
            <Tab.Screen
              name="ติดดาว"
              component={StarredUsersScreen}
              initialParams={{ userId: userProfile.userId }}
            />
          </Tab.Navigator>
        </View>
      </ScrollView>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, isModalMounted ? styles.modalVisible : styles.modalHidden]}>
            <Text style={styles.modalTitle}>เปลี่ยนชื่อแสดง</Text>
            <TextInput
              style={styles.modalInput}
              value={newDisplayName}
              onChangeText={validateInput}
              maxLength={maxLength}
              placeholder="ชื่อแสดงใหม่"
              placeholderTextColor="#999"
            />
            <Text style={styles.charCount}>
              {newDisplayName.length}/{maxLength}
            </Text>
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton, !isValidInput() && styles.disabledButton]}
                onPress={handleConfirm}
                disabled={!isValidInput()}
              >
                <Text style={styles.buttonText}>ยืนยัน</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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