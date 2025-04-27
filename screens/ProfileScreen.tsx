import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useUser } from '../contexts/UserContext';

const Tab = createMaterialTopTabNavigator();

const MyPostsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>โพสต์ของฉัน</Text>
  </View>
);

const SavedPostsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>โพสต์ที่บันทึก</Text>
  </View>
);

const StarredUsersScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>คนที่ติดดาว</Text>
  </View>
);

const ProfileScreen = () => {
  const { userProfile } = useUser(); // สมมติว่ามี displayName, realName, studentId, faculty, department, email, avatar

  const handleChangeAvatar = () => {
    alert('เปลี่ยนรูปโปรไฟล์');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Appbar */}
      <Appbar.Header style={{ backgroundColor: '#EFB553' }}>
        <Appbar.Content title="โปรไฟล์ของฉัน" titleStyle={{ fontFamily: 'NotoSansThai-Bold', fontSize: 20 }} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16, alignItems: 'center' }}>
        {/* รูปโปรไฟล์ */}
        <TouchableOpacity onPress={handleChangeAvatar}>
          <Image
            source={{ uri: userProfile?.avatar || 'https://via.placeholder.com/150' }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 3,
              borderColor: 'white',
              marginTop: -60,
              backgroundColor: '#eee',
            }}
          />
        </TouchableOpacity>

        {/* Display Name */}
        <Text style={{ fontFamily: 'NotoSansThai-Bold', fontSize: 22, marginTop: 12 }}>
          {userProfile?.displayName || 'ชื่อผู้ใช้'}
        </Text>

       
        {/* Student ID */}
        <Text style={{ fontFamily: 'NotoSansThai-Regular', fontSize: 16, color: '#777', marginBottom: 16 }}>
          {userProfile?.studentId || 'รหัสนักศึกษา'}
        </Text>

        {/* รายละเอียด */}
        <View style={{ width: '100%', paddingHorizontal: 16 }}>
          <DetailRow label="ชื่อ-นามสกุล" value={userProfile?.name || '-'} />
          <DetailRow label="คณะ" value={userProfile?.faculty || '-'} />
          <DetailRow label="สาขา" value={userProfile?.department || '-'} />
          <DetailRow label="อีเมลมหาวิทยาลัย" value={userProfile?.email || '-'} />
        </View>
      </ScrollView>

      {/* Tabs ด้านล่าง */}
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontFamily: 'NotoSansThai-Medium', fontSize: 14 },
            tabBarActiveTintColor: '#EFB553',
            tabBarInactiveTintColor: '#888',
            tabBarIndicatorStyle: { backgroundColor: '#EFB553' },
          }}
        >
          <Tab.Screen name="โพสต์ของฉัน" component={MyPostsScreen} />
          <Tab.Screen name="โพสต์ที่บันทึก" component={SavedPostsScreen} />
          <Tab.Screen name="คนที่ติดดาว" component={StarredUsersScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={{ fontFamily: 'NotoSansThai-Medium', fontSize: 14, color: '#555' }}>{label}</Text>
    <Text style={{ fontFamily: 'NotoSansThai-Regular', fontSize: 16 }}>{value}</Text>
  </View>
);

export default ProfileScreen;
