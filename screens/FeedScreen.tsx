import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ฟีดฟอรั่ม</Text>
      {/* ส่วนที่ไว้แสดงโพสต์ */}
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
