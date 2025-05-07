import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { useUser } from '../contexts/UserContext';
import * as ImagePicker from 'expo-image-picker';

const AvatarFullScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { userProfile, updateAvatar } = useUser();
  const initialAvatarUri = route.params?.uri || userProfile?.avatar || require('../assets/images/Generic avatar.png');
  const userId = route.params?.userId || userProfile?.userId;
  const isOwnProfile = userId === userProfile?.userId;
  const [avatarSource, setAvatarSource] = useState(initialAvatarUri);

  useEffect(() => {
    if (userProfile?.avatar) {
      setAvatarSource(
        typeof userProfile.avatar === 'string' && userProfile.avatar
          ? { uri: userProfile.avatar }
          : userProfile.avatar
      );
    }
  }, [userProfile?.avatar]);

  const handleChangeAvatar = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('กรุณาอนุญาตการเข้าถึงรูปภาพ');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      updateAvatar(selectedImageUri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Action icon="close" color="white" onPress={() => navigation.goBack()} />
          <Appbar.Content title="" />
        </Appbar.Header>

        <View style={styles.centeredContent}>
          <View style={styles.innerContent}>
            <Image
              source={avatarSource}
              style={styles.avatar}
            />
            {isOwnProfile && (
              <TouchableOpacity style={styles.changeButton} onPress={handleChangeAvatar}>
                <Text style={styles.changeButtonText}>เปลี่ยนรูปโปรไฟล์</Text>
              </TouchableOpacity>
            )}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContent: {
    alignItems: 'center',
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