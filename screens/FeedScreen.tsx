import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/feedScreenStyles';

const FeedScreen = () => {
  const navigation = useNavigation();

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
