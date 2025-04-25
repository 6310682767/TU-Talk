import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from '@styles/notificationStyles';

const dummyNotifications = [
  { id: '1', message: 'มีคนตอบกลับโพสต์ของคุณ' },
  { id: '2', message: 'โพสต์ของคุณได้รับการถูกใจ' },
];

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>การแจ้งเตือน</Text>
      <FlatList
        data={dummyNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default NotificationScreen;
