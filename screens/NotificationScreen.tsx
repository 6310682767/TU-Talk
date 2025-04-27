import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import styles from '@styles/notificationStyles'; // <-- แยกไฟล์สไตล์ออกมาเลย

const NotificationScreen = () => {
  const notifications = [
    { id: 1, type: 'like', message: 'กดถูกใจโพสต์ของคุณ', userName: 'บอส', userProfile: require('../assets/images/Generic avatar.png') },
    { id: 2, type: 'comment', message: 'คอมเมนต์โพสต์ของคุณ', userName: 'บีม', userProfile: require('../assets/images/Generic avatar.png') },
    { id: 3, type: 'like', message: 'กดถูกใจโพสต์ของคุณ', userName: 'โน้ต', userProfile: require('../assets/images/Generic avatar.png') },
  ];

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="#fff" onPress={() => {}} />
        <View style={styles.appbarCenter}>
          <Text style={styles.appbarTitle}>การแจ้งเตือน</Text>
        </View>
      </Appbar.Header>

      <ScrollView style={styles.notificationList}>
        {notifications.map((notification) => (
          <TouchableOpacity key={notification.id} style={styles.notificationItem} onPress={() => {}}>
            <Image source={notification.userProfile} style={styles.profileImage} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationMessage}>
                <Text style={styles.userName}>{notification.userName}</Text> {notification.message}
              </Text>
              <Text style={styles.notificationTime}>2 นาทีที่แล้ว</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
