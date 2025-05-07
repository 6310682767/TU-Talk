import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../types';
import { usePostContext } from '../contexts/PostContext';
import PostItem from '../components/PostItem';

type MyPostsNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

const windowHeight = Dimensions.get('window').height;

const MyPostsScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<MyPostsNavigationProp>();
  const route = useRoute<any>();
  const { userId } = route.params;
  const { posts } = usePostContext();

  const userPosts = posts.filter((post) => post.userId === userId);

  return (
    <View style={[styles.container, { minHeight: windowHeight - 100 }]}>
      {userPosts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.noPostsText}>{'ไม่มีโพสต์'}</Text>
        </View>
      ) : (
        <View
          style={[styles.contentContainer, { minHeight: windowHeight - 100 }]}
          onLayout={(e) => console.log('MyPosts content height:', e.nativeEvent.layout.height)}
        >
          {userPosts.map((item) => (
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
    minHeight: 200, // Compact height for empty state
    paddingTop: 16, // Text at top
    alignItems: 'center', // Center text horizontally
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

export default MyPostsScreen;