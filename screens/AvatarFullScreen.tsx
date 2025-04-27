import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { useUser } from '../contexts/UserContext';
import * as ImagePicker from 'expo-image-picker'; 

const AvatarFullScreen = () => {
  const navigation = useNavigation();
  const { userProfile } = useUser();
  const [avatarUri, setAvatarUri] = useState(userProfile?.avatar || 'https://via.placeholder.com/150');

  const handleChangeAvatar = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('กรุณาอนุญาตการเข้าถึงรูปภาพ');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], 
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setAvatarUri(selectedImageUri);
      // TODO: ส่ง avatar ใหม่ไปเซฟที่ backend หรือ context ตามต้องการ
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Appbar */}
        <Appbar.Header style={styles.appbar}>
          <Appbar.Action icon="close" color="white" onPress={() => navigation.goBack()} />
          <Appbar.Content title="" />
        </Appbar.Header>

        {/* View สำหรับจัดกึ่งกลางไอคอนและปุ่มเมื่อรวมกัน */}
        <View style={styles.centeredContent}>
          <View style={styles.innerContent}>
            <Image
              source={{ uri: avatarUri }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.changeButton} onPress={handleChangeAvatar}>
              <Text style={styles.changeButtonText}>เปลี่ยนรูปโปรไฟล์</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AvatarFullScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  centeredContent: {
    flex: 1, // ให้ครอบคลุมพื้นที่ที่เหลือหลังจาก Appbar
    alignItems: 'center', // กึ่งกลางแนวนอน
    justifyContent: 'center', // กึ่งกลางแนวตั้ง
  },
  innerContent: {
    alignItems: 'center', // ทำให้ไอคอนและปุ่มอยู่ในแนวเดียวกัน
  },
  avatar: {
    width: 360,
    height: 360,
    borderRadius: 180,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 30,
  },
  changeButton: {
    backgroundColor: '#333',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 100,
  },
  changeButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'NotoSansThai-Regular',
  },
  appbar: {
    backgroundColor: 'black',
    elevation: 0,
    width: '100%',
  },
});