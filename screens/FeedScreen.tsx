import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer'; // นำเข้า DrawerNavigationProp
import { useForum } from '../contexts/ForumContext';
import { RootDrawerParamList } from '../types'; 
import MockFeed from '../components/MockFeed';

// กำหนดประเภทของ navigation
type FeedScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Feed'>;

const FeedScreen: React.FC = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>(); // ใช้ประเภท DrawerNavigationProp
  const { campus, category } = useForum();

  useEffect(() => {
    fetchFeedData(campus, category); 
  }, [campus, category]);

  const fetchFeedData = async (campus: string, category: string | null) => {
    // ดึงข้อมูลจาก backend/filter ตาม campus + category
    console.log('Reload feed with:', campus, category);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#EFB553' }}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} color="white" />
        <Appbar.Content title="TU TALK" titleStyle={{ fontFamily: 'Righteous-Regular', fontSize: 20, color: 'white'}} />
      </Appbar.Header>
  
      <MockFeed />
    </View>
  );
};

export default FeedScreen;
