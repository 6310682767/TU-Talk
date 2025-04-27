import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';

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
        <Text style={styles.appbarTitle}>การแจ้งเตือน</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appbar: {
    backgroundColor: '#EFB553',
  },
  appbarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationList: {
    padding: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    padding: 15,
    marginBottom: 10,
    borderRadius: 16,
    shadowColor: '#000',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    color: '#333',
  },
  userName: {
    fontWeight: 'bold',
    color: '#D84A34',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default NotificationScreen;
