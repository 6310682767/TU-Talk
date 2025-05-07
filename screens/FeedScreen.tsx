import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForum } from '../contexts/ForumContext';
import { RootDrawerParamList, RootStackParamList } from '../types';
import MockFeed from '../components/MockFeed';

// Navigation types
type FeedScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Feed'>;
type CreatePostScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreatePostScreen'>;

const FeedScreen: React.FC = () => {
  const navigationFeed = useNavigation<FeedScreenNavigationProp>();
  const navigationCreatePost = useNavigation<CreatePostScreenNavigationProp>();
  const { campus, category } = useForum();

  useEffect(() => {
    fetchFeedData(campus, category);
  }, [campus, category]);

  const fetchFeedData = async (campus: string | undefined, category: string | undefined) => {
    console.log('Reload feed with:', campus, category);
    // Implement API call to fetch real data
    // Example: if (!campus) return; // Skip fetch if campus is undefined
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <Appbar.Header style={{ backgroundColor: '#EFB553' }}>
        <Appbar.Action
          icon="menu"
          onPress={() => navigationFeed.openDrawer()}
          color="white"
          accessibilityLabel="Open menu"
        />
        <Appbar.Content
          title="TU TALK"
          titleStyle={{ fontFamily: 'Righteous-Regular', fontSize: 20, color: 'white' }}
        />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigationCreatePost.navigate('SearchScreen')}
          color="white"
          accessibilityLabel="Search"
        />
        <Appbar.Action
          icon="pencil"
          onPress={() => navigationCreatePost.navigate('CreatePostScreen')}
          color="white"
          accessibilityLabel="Create post"
        />
      </Appbar.Header>
      <MockFeed />
    </View>
  );
};

export default FeedScreen;