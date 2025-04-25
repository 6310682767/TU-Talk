import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer'; // นำเข้า DrawerNavigationProp
import { styles } from '../styles/feedScreenStyles';
import { useForum } from '../contexts/ForumContext';
import { RootDrawerParamList } from '../types'; 

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
      <Appbar.Header style={{ backgroundColor: '#EFB553' }} >
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} color="white" />
        <Appbar.Content title="TU TALK" titleStyle={{ fontFamily: 'Righteous-Regular', fontSize: 20, color: 'white'}} />
      </Appbar.Header>

      <FlatList
        data={[{ id: '1', content: 'โพสต์แรก' }, { id: '2', content: 'โพสต์ที่สอง' }]}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FeedScreen;
