import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { usePostContext } from '../contexts/PostContext';
import { useUser } from '../contexts/UserContext';
import MyPostsScreen from './MyPostsScreen';
import SavedPostsScreen from './SavedPostsScreen';
import { styles } from '../styles/profileStyles';
import { Image as ImageRN } from 'react-native'; 

type UserProfileNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfileScreen'>;

const Tab = createMaterialTopTabNavigator();

const UserProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<UserProfileNavigationProp>();
  const route = useRoute<any>();
  const { userId } = route.params || {};
  const { getUserById, getStarredUsers, toggleStarUser } = usePostContext();
  const { userProfile } = useUser();
  const loggedInUserId = userProfile?.userId;

  console.log('UserProfileScreen - route.params:', route.params);
  console.log('UserProfileScreen - userId:', userId);

  const profile = getUserById(userId);
  if (!profile) {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color="#FFF" onPress={() => navigation.goBack()} />
          <Appbar.Content title="" titleStyle={styles.appbarTitle} />
        </Appbar.Header>
        <Text style={styles.errorText}>
          {t('profile.notFound') || 'ไม่พบข้อมูลผู้ใช้'}
        </Text>
      </View>
    );
  }

  const starredUsers = loggedInUserId ? getStarredUsers(loggedInUserId) : [];
  const isStarred = starredUsers.some((user) => user.userId === userId);
  const isOwnProfile = userId === loggedInUserId;

  const handleToggleStar = () => {
    if (isOwnProfile) {
      alert('ไม่สามารถติดดาวโปรไฟล์ของตัวเองได้');
      return;
    }
    if (!loggedInUserId) {
      alert('กรุณาเข้าสู่ระบบเพื่อติดดาว');
      return;
    }
    toggleStarUser(userId, loggedInUserId);
    console.log(`Toggled star for user ${userId} by ${loggedInUserId}`);
  };

  const handleChangeDisplayName = () => {
    alert('เปลี่ยนชื่อแสดง (สำหรับเจ้าของโปรไฟล์เท่านั้น)');
  };

  // แปลง avatarSource ให้เป็น { uri: string } เสมอ
  const avatarSource = typeof profile.avatar === 'string'
    ? { uri: profile.avatar }
    : ImageRN.resolveAssetSource(profile.avatar) || { uri: '' };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="#FFF" onPress={() => navigation.goBack()} />
        <Appbar.Content title="" titleStyle={styles.appbarTitle} />
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
            onPress={() => navigation.navigate('AvatarFullScreen', { uri: avatarSource.uri, userId: profile.userId })}
            style={styles.avatarContainer}
          >
            <Image
              source={avatarSource}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={isOwnProfile ? handleChangeDisplayName : undefined}
            disabled={!isOwnProfile}
          >
            <Text style={styles.displayName}>
              {profile.displayName || 'ชื่อผู้ใช้'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.studentId}>
            {'@' + (profile.studentId || 'รหัสนักศึกษา')}
          </Text>

          <View style={styles.detailsContainer}>
            <DetailRow label={'ชื่อ-นามสกุล'} value={profile.name || '-'} />
            <DetailRow label={'คณะ'} value={profile.faculty || '-'} />
            <DetailRow label={'สาขา'} value={profile.department || '-'} />
          </View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[styles.followButton, isStarred && styles.starredButton]}
              onPress={handleToggleStar}
              disabled={isOwnProfile}
            >
              <MaterialCommunityIcons
                name={isStarred ? 'star' : 'star-outline'}
                size={20}
                color={isStarred ? '#EFB553' : '#333'}
                style={{ marginRight: 8 }}
              />
              <Text style={[styles.followButtonText, isStarred && styles.starredButtonText]}>
                {isStarred ? 'ติดดาวแล้ว' : 'ติดดาว'}
              </Text>
            </TouchableOpacity>
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
              initialParams={{ userId: profile.userId }}
            />
            <Tab.Screen
              name="ที่บันทึก"
              component={SavedPostsScreen}
              initialParams={{ userId: profile.userId }}
            />
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

export default UserProfileScreen;