import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ImageSourcePropType } from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '@styles/notificationStyles';

// Interface for notification data
interface Notification {
  id: number;
  type: 'like' | 'comment';
  message: string;
  userName: string;
  userProfile: ImageSourcePropType;
  isRead: boolean;
  timestamp: string;
  postId: string;
}

// Utility function to format timestamp
const formatTimestamp = (timestamp: string): { section: string; time: string } => {
  try {
    const now = new Date();
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid timestamp');
    }
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return {
        section: 'Today',
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    } else {
      return {
        section: 'Earlier',
        time:
          date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }) +
          ' ' +
          date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return { section: 'Earlier', time: 'Unknown time' };
  }
};

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'like',
      message: 'กดถูกใจโพสต์ของคุณ',
      userName: 'บอส',
      userProfile: require('../assets/images/Generic avatar.png'),
      isRead: false,
      timestamp: new Date().toISOString(), // Today
      postId: 'post_001',
    },
    {
      id: 2,
      type: 'comment',
      message: 'คอมเมนต์โพสต์ของคุณ',
      userName: 'บีม',
      userProfile: require('../assets/images/Generic avatar.png'),
      isRead: true,
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
      postId: 'post_002',
    },
    {
      id: 3,
      type: 'like',
      message: 'กดถูกใจโพสต์ของคุณ',
      userName: 'โน้ต',
      userProfile: require('../assets/images/Generic avatar.png'),
      isRead: false,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      postId: 'post_003',
    },
  ]);

  const markAllAsRead = (): void => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })));
  };

  const deleteNotification = (id: number): void => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleNotificationPress = (notification: Notification): void => {
    // Simulate navigation to post or content
    console.log(`Navigating to post: ${notification.postId}`);
    // Replace with actual navigation, e.g., navigation.navigate('Post', { postId: notification.postId })
  };

  // Group notifications by section (Today, Earlier)
  const groupedNotifications = notifications
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) // Sort by timestamp descending
    .reduce((acc: { [key: string]: Notification[] }, notification) => {
      const { section } = formatTimestamp(notification.timestamp);
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(notification);
      return acc;
    }, {});

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <View style={styles.titleContainer}>
          <Text style={styles.appbarTitle}>การแจ้งเตือน</Text>
        </View>
        <Appbar.Action icon="check-circle" color="#fff" onPress={markAllAsRead} />
      </Appbar.Header>

      <ScrollView style={styles.notificationList}>
        {Object.keys(groupedNotifications).length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>ไม่มีแจ้งเตือน</Text>
          </View>
        ) : (
          Object.keys(groupedNotifications).map((section) => (
            <View key={section}>
              <Text style={styles.sectionHeader}>{section === 'Today' ? 'วันนี้' : 'ก่อนหน้านี้'}</Text>
              {groupedNotifications[section].map((notification) => {
                const { time } = formatTimestamp(notification.timestamp);
                return (
                  <TouchableOpacity
                    key={notification.id}
                    style={[styles.notificationItem, !notification.isRead && styles.unreadNotification]}
                    onPress={() => handleNotificationPress(notification)}
                  >
                    <View style={styles.notificationContentWrapper}>
                      <Image source={notification.userProfile} style={styles.profileImage} />
                      <View style={styles.notificationContent}>
                        <Text style={styles.notificationMessage}>
                          <Text style={styles.userName}>{notification.userName}</Text> {notification.message}
                        </Text>
                        <Text style={styles.notificationTime}>{time}</Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => deleteNotification(notification.id)}>
                      <Icon name="delete" size={24} color="#999" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;