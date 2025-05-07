import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../types';
import { usePostContext } from '../contexts/PostContext';
import { useUser } from '../contexts/UserContext';
import PostItem from '../components/PostItem';

type SavedPostsNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

const windowHeight = Dimensions.get('window').height;

const SavedPostsScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<SavedPostsNavigationProp>();
  const route = useRoute<any>();
  const { userId } = route.params || {};
  const { getSavedPostsByUserId } = usePostContext();
  const { userProfile } = useUser();

  console.log('SavedPostsScreen - route.params:', route.params);
  console.log('SavedPostsScreen - userId:', userId, 'logged-in userId:', userProfile?.userId);

  if (!userId) {
    return (
      <View style={[styles.container, { minHeight: windowHeight - 100 }]}>
        <View style={styles.emptyContainer}>
          <Text style={styles.noPostsText}>{'ไม่พบข้อมูลผู้ใช้'}</Text>
        </View>
      </View>
    );
  }

  const savedPosts = getSavedPostsByUserId(userId);

  return (
    <View style={[styles.container, { minHeight: windowHeight - 100 }]}>
      {savedPosts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.noPostsText}>{'ไม่มีโพสต์ที่บันทึก'}</Text>
        </View>
      ) : (
        <View
          style={[styles.contentContainer, { minHeight: windowHeight - 100 }]}
          onLayout={(e) => console.log('SavedPosts content height:', e.nativeEvent.layout.height)}
        >
          {savedPosts.map((item) => (
            <PostItem key={item.id} post={item} />
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
  noPostsText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
  contentContainer: {
    paddingBottom: 16,
    backgroundColor: '#FFF',
  },
});

export default SavedPostsScreen;