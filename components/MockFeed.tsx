import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { Chip } from 'react-native-paper';
import { useForum } from '../contexts/ForumContext';
import { usePostContext } from '../contexts/PostContext';
import { useUser } from '../contexts/UserContext';
import PostItem from './PostItem';

const MockFeed: React.FC = () => {
  const { campus, category } = useForum();
  const { posts, getStarredPosts } = usePostContext();
  const { userProfile } = useUser();
  const [sort, setSort] = useState<'recent' | 'popular' | 'liked' | 'starred'>('recent');
  const [refreshing, setRefreshing] = useState(false);
  const [loading] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Simulate refresh
  }, []);

  const filteredPosts = sort === 'starred' && userProfile?.userId
    ? getStarredPosts(userProfile.userId, campus, category)
    : posts.filter((post) => {
        const matchesCampus = campus ? post.campus === campus : true;
        const matchesCategory = category ? post.category === category : true;
        const matchesSort = sort === 'liked' ? post.isLiked : true;
        return matchesCampus && matchesCategory && matchesSort;
      }).sort((a, b) => {
        if (sort === 'popular') {
          return b.likes - a.likes;
        }
        return 0; 
      });

  return (
    <View style={styles.container}>
      <View style={styles.filterBar}>
        <View style={styles.chipContainer}>
          <Chip
            selected={sort === 'recent'}
            onPress={() => setSort('recent')}
            style={[styles.chip, sort === 'recent' && styles.chipSelected]}
            textStyle={[styles.chipText, sort === 'recent' && styles.chipTextSelected]}
          >
            ล่าสุด
          </Chip>
          <Chip
            selected={sort === 'popular'}
            onPress={() => setSort('popular')}
            style={[styles.chip, sort === 'popular' && styles.chipSelected]}
            textStyle={[styles.chipText, sort === 'popular' && styles.chipTextSelected]}
          >
            ยอดนิยม
          </Chip>
          <Chip
            selected={sort === 'liked'}
            onPress={() => setSort('liked')}
            style={[styles.chip, sort === 'liked' && styles.chipSelected]}
            textStyle={[styles.chipText, sort === 'liked' && styles.chipTextSelected]}
          >
            ถูกใจ
          </Chip>
          <Chip
            selected={sort === 'starred'}
            onPress={() => setSort('starred')}
            style={[styles.chip, sort === 'starred' && styles.chipSelected]}
            textStyle={[styles.chipText, sort === 'starred' && styles.chipTextSelected]}
          >
            ติดดาว
          </Chip>
        </View>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EFB553" />
        </View>
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#EFB553" />
          }
          renderItem={({ item }) => <PostItem post={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    paddingBottom: 16,
  },
  filterBar: {
    padding: 12,
    backgroundColor: '#FFF',
  },
  chipContainer: {
    flexDirection: 'row',
  },
  chip: {
    marginRight: 8,
    backgroundColor: '#F0F2F5',
  },
  chipSelected: {
    backgroundColor: '#F0F2F5',
  },
  chipText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 14,
    color: '#333',
  },
  chipTextSelected: {
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MockFeed;