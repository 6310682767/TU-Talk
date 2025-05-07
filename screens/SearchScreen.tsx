import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionSheet from 'react-native-actions-sheet';
import { RootStackParamList } from '../types';
import PostItem from '../components/PostItem'; // นำ PostItem มาใช้
import { usePostContext } from '../contexts/PostContext';
import { useUser } from '../contexts/UserContext';

type SearchNavigationProp = StackNavigationProp<RootStackParamList, 'SearchScreen'>;

interface SearchResult {
  type: 'post' | 'user';
  id: string;
  title?: string;
  displayName?: string;
  userId?: string;
  time?: string;
  category?: string;
  campus?: string;
  preview?: string;
  content?: string;
  comments?: Array<{ id: string; content: string; time: string; displayName: string; icon: any }>;
  likes?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  savedBy?: string[];
  name?: string;
  faculty?: string;
  studentId?: string;
  image?: any;
  icon?: any;
}

interface HeaderItem {
  type: 'header';
  id: string;
}

interface RecentSearchItem {
  type: 'recent';
  id: string;
  query: string;
}

type ListItem = SearchResult | HeaderItem | RecentSearchItem;

const mockUserResults: SearchResult[] = [
  {
    type: 'user',
    id: 'u1',
    name: 'แนน TU',
    faculty: 'วิศวกรรมศาสตร์',
    studentId: '12345678',
    image: require('../assets/images/Generic avatar.png'),
  },
  {
    type: 'user',
    id: 'u2',
    name: 'บีม',
    faculty: 'วิทยาศาสตร์',
    studentId: '87654321',
    image: require('../assets/images/Generic avatar.png'),
  },
];

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<SearchNavigationProp>();
  const { posts, deletePost, starredUsers } = usePostContext();
  const { userProfile } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'post' | 'user'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const actionSheetRef = React.useRef<ActionSheet>(null);

  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const history = await AsyncStorage.getItem('searchHistory');
        if (history) {
          setRecentSearches(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    };
    loadRecentSearches();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery, filterType);
    }
  }, [posts, starredUsers]);

  const saveSearch = async (query: string) => {
    try {
      const updatedSearches = [
        query,
        ...recentSearches.filter((q) => q !== query),
      ].slice(0, 5);
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  const filterPosts = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return posts
      .filter(
        (item) =>
          (item.title.toLowerCase().includes(lowerQuery) ||
           item.content.toLowerCase().includes(lowerQuery) ||
           item.displayName.toLowerCase().includes(lowerQuery))
      )
      .map((item) => ({
        type: 'post' as const,
        id: item.id,
        title: item.title,
        displayName: item.displayName,
        userId: item.userId,
        time: item.time,
        category: item.category,
        campus: item.campus || userProfile?.campus || 'รังสิต',
        content: item.content,
        preview: item.content,
        comments: item.comments,
        likes: item.likes,
        isLiked: item.isLiked,
        isSaved: userProfile?.userId ? Array.isArray(item.savedBy) && item.savedBy.includes(userProfile.userId) : false,
        savedBy: item.savedBy || [],
        image: item.icon,
        icon: item.icon,
      }));
  };

  const filterUsers = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const currentUser: SearchResult = {
      type: 'user',
      id: userProfile?.userId || 'unknown',
      name: userProfile?.displayName || 'ผู้ใช้ปัจจุบัน',
      studentId: userProfile?.studentId || 'รหัสนักศึกษา',
      image: userProfile?.avatar
        ? { uri: userProfile.avatar }
        : require('../assets/images/Generic avatar.png'),
    };
    const allUsers = [currentUser, ...mockUserResults];
    return allUsers.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(lowerQuery)) ||
        (item.studentId && item.studentId.toLowerCase().includes(lowerQuery))
    );
  };

  const handleSearch = (query: string, currentFilterType: 'all' | 'post' | 'user') => {
    setSearchQuery(query);
    setShowFilters(!!query.trim());
    setFilteredResults([]);

    if (!query.trim()) return;

    let results: SearchResult[] = [];
    switch (currentFilterType) {
      case 'all':
        results = [...filterPosts(query), ...filterUsers(query)];
        break;
      case 'post':
        results = filterPosts(query);
        break;
      case 'user':
        results = filterUsers(query);
        break;
    }

    setFilteredResults(results);
  };

  const handleSubmit = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      saveSearch(searchQuery);
      handleSearch(searchQuery, filterType);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredResults([]);
    setShowFilters(false);
    setIsSearching(false);
  };

  const handleFilter = (type: 'all' | 'post' | 'user') => {
    setFilterType(type);
    handleSearch(searchQuery, type);
  };

  const handleResultPress = (item: SearchResult) => {
    if (item.type === 'post') {
      navigation.navigate('PostDetailScreen', { 
        postId: item.id, 
        campus: item.campus || userProfile?.campus || 'รังสิต' 
      });
    } else {
      if (item.id === userProfile?.userId) {
        navigation.navigate('ProfileScreen');
      } else {
        navigation.navigate('UserProfileScreen', { userId: item.id });
      }
    }
  };

  const handleRecentSearchPress = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setShowFilters(true);
    handleSearch(query, filterType);
  };

  const renderSectionHeader = (type: 'post' | 'user') => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>
        {type === 'post' ? 'โพสต์' : 'ผู้ใช้'}
      </Text>
    </View>
  );

  const renderResultItem = ({ item }: { item: SearchResult }) => {
    if (item.type === 'post') {
      return (
        <PostItem
          post={{
            id: item.id,
            title: item.title || '',
            displayName: item.displayName || '',
            userId: item.userId || '',
            time: item.time || '',
            category: item.category || 'ถาม-ตอบทั่วไป',
            content: item.content || '',
            campus: item.campus || userProfile?.campus || 'รังสิต',
            icon: item.image,
            comments: item.comments || [],
            likes: item.likes || 0,
            isLiked: item.isLiked || false,
            isSaved: item.isSaved || false,
            savedBy: item.savedBy || [],
          }}
        />
      );
    }
    return (
      <View style={styles.userItem}>
        <TouchableOpacity
          style={styles.userContent}
          onPress={() => handleResultPress(item)}
        >
          <Image
            source={item.image}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.displayName}>{item.name || 'ผู้ใช้'}</Text>
            <Text style={styles.studentId}>{'@' + (item.studentId || 'รหัสนักศึกษา')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderRecentSearchItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.recentSearchItem}
      onPress={() => handleRecentSearchPress(item)}
    >
      <MaterialCommunityIcons name="history" size={20} color="#666" />
      <Text style={styles.recentSearchText}>{item}</Text>
    </TouchableOpacity>
  );

  const groupedResults = filteredResults.reduce(
    (acc, item) => {
      acc[item.type].push(item);
      return acc;
    },
    { post: [] as SearchResult[], user: [] as SearchResult[] }
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action
          icon="close"
          color="#FFF"
          onPress={() => navigation.goBack()}
          accessibilityLabel="ปิด"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="ค้นหาโพสต์หรือผู้ใช้..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={(text) => handleSearch(text, filterType)}
          onSubmitEditing={handleSubmit}
          autoFocus
        />
        {isSearching && (
          <Appbar.Action
            icon="filter"
            color="#EFB553"
            onPress={() => setShowFilters(!showFilters)}
            accessibilityLabel="กรองผลลัพธ์"
          />
        )}
        {!isSearching && (
          <Appbar.Action
            icon="magnify"
            color="#FFF"
            onPress={() => {}}
            accessibilityLabel="ค้นหา"
          />
        )}
      </Appbar.Header>
      {showFilters && (
        <View style={styles.filterBar}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterType === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => handleFilter('all')}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterType === 'all' && styles.filterButtonTextActive,
              ]}
            >
              ทั้งหมด
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterType === 'post' && styles.filterButtonActive,
            ]}
            onPress={() => handleFilter('post')}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterType === 'post' && styles.filterButtonTextActive,
              ]}
            >
              โพสต์
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterType === 'user' && styles.filterButtonActive,
            ]}
            onPress={() => handleFilter('user')}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterType === 'user' && styles.filterButtonTextActive,
              ]}
            >
              ผู้ใช้
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={
          searchQuery.length > 0
            ? ([
                ...(groupedResults.post.length > 0
                  ? [{ type: 'header', id: 'post-header' }, ...groupedResults.post]
                  : []),
                ...(groupedResults.user.length > 0
                  ? [{ type: 'header', id: 'user-header' }, ...groupedResults.user]
                  : []),
              ] as ListItem[])
            : recentSearches.map((query) => ({ type: 'recent', id: query, query } as RecentSearchItem))
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: ListItem }) => {
          if (item.type === 'header') {
            return renderSectionHeader(item.id.includes('post') ? 'post' : 'user');
          }
          if (item.type === 'recent') {
            return renderRecentSearchItem({ item: item.query });
          }
          return renderResultItem({ item: item as SearchResult });
        }}
        contentContainerStyle={styles.resultsList}
        ListEmptyComponent={
          searchQuery.length > 0 ? (
            <Text style={styles.emptyText}>ไม่พบผลลัพธ์</Text>
          ) : null
        }
        ListHeaderComponent={
          recentSearches.length > 0 && searchQuery.length === 0 ? (
            <Text style={styles.recentSearchesHeader}>การค้นหาล่าสุด</Text>
          ) : null
        }
      />
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContainer}>
          {activePostId &&
            posts.find((post) => post.id === activePostId) &&
            (userProfile?.userId === posts.find((post) => post.id === activePostId)?.userId ? (
              <TouchableOpacity
                style={styles.actionSheetButton}
                onPress={() => {
                  if (activePostId && userProfile?.userId) {
                    deletePost(activePostId);
                    setFilteredResults((prev) =>
                      prev.filter((result) => result.id !== activePostId)
                    );
                  }
                  actionSheetRef.current?.hide();
                }}
              >
                <Text style={styles.actionSheetText}>ลบโพสต์</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.actionSheetButton}
                  onPress={() => {
                    console.log(`Reported post: ${activePostId}`);
                    actionSheetRef.current?.hide();
                  }}
                >
                  <Text style={styles.actionSheetText}>รายงานโพสต์</Text>
                </TouchableOpacity>
              </>
            ))}
        </View>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  appbar: {
    backgroundColor: '#EFB553',
    elevation: 0,
    shadowOpacity: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 16,
    color: '#333',
  },
  filterBar: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFF',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#F0F2F5',
  },
  filterButtonActive: {
    backgroundColor: '#EFB553',
  },
  filterButtonText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 14,
    color: '#333',
  },
  filterButtonTextActive: {
    color: '#FFF',
  },
  resultsList: {},
  recentSearchesHeader: {
    fontFamily: 'NotoSansThai-Bold',
    fontSize: 16,
    color: '#666',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  sectionHeader: {
    marginTop: 12,
    marginLeft: 12,
  },
  sectionHeaderText: {
    fontFamily: 'NotoSansThai-Bold',
    fontSize: 18,
    color: '#666',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
  },
  recentSearchText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  emptyText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  actionSheetContainer: {
    padding: 16,
  },
  actionSheetButton: {
    paddingVertical: 12,
  },
  actionSheetText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 16,
    color: '#333',
  },
});

export default SearchScreen;