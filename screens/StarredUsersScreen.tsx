import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { usePostContext } from '../contexts/PostContext';
import { useUser } from '../contexts/UserContext';

type StarredUsersNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

const windowHeight = Dimensions.get('window').height;

const StarredUsersScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StarredUsersNavigationProp>();
  const route = useRoute<any>();
  const { userId } = route.params || {};
  const { getStarredUsers, toggleStarUser } = usePostContext();
  const { userProfile } = useUser();
  const loggedInUserId = userProfile?.userId || 'u7';

  console.log('StarredUsersScreen - route.params:', route.params);
  console.log('StarredUsersScreen - userId:', userId, 'logged-in userId:', loggedInUserId);

  if (!userId) {
    return (
      <View style={[styles.container, { minHeight: windowHeight - 100 }]}>
        <View style={styles.emptyContainer}>
          <Text style={styles.noUsersText}>{'ไม่พบข้อมูลผู้ใช้'}</Text>
        </View>
      </View>
    );
  }

  const starredUsers = getStarredUsers(userId);

  return (
    <View style={[styles.container, { minHeight: windowHeight - 100 }]}>
      {starredUsers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.noUsersText}>{'ไม่มีผู้ใช้ที่ติดดาว'}</Text>
        </View>
      ) : (
        <View
          style={[styles.contentContainer, { minHeight: windowHeight - 100 }]}
          onLayout={(e) => console.log('StarredUsers content height:', e.nativeEvent.layout.height)}
        >
          {starredUsers.map((item) => (
            <View key={item.userId} style={styles.userItem}>
              <TouchableOpacity
                style={styles.userContent}
                onPress={() => navigation.navigate('UserProfileScreen', { userId: item.userId })}
              >
                <Image
                  source={ require('../assets/images/Generic avatar.png') }
                  style={styles.avatar}
                />
                <View style={styles.userInfo}>
                  <Text style={styles.displayName}>{item.displayName || 'ผู้ใช้'}</Text>
                  <Text style={styles.studentId}>{'@' + (item.studentId || 'รหัสนักศึกษา')}</Text>
                </View>
              </TouchableOpacity>
              {userId === loggedInUserId && (
                <TouchableOpacity
                  style={styles.unstarButton}
                  onPress={() => {
                    toggleStarUser(item.userId, loggedInUserId);
                    console.log(`Unstarred user ${item.userId} by ${loggedInUserId}`);
                  }}
                >
                  <MaterialCommunityIcons name="close" size={24} color="#B0B0B0" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  emptyContainer: {
    minHeight: 200,
    paddingTop: 16,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  noUsersText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  userContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  displayName: {
    fontFamily: 'NotoSansThai-Bold',
    fontSize: 16,
    color: '#333',
  },
  studentId: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 14,
    color: '#666',
  },
  unstarButton: {
    padding: 8,
  },
  contentContainer: {
    paddingBottom: 16,
    backgroundColor: '#FFF',
  },
});

export default StarredUsersScreen;