import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, List, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from '@styles/settingsStyles';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [pinEnabled, setPinEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('th'); // เก็บภาษาที่เลือก

  const handleLogout = () => {
    alert('ออกจากระบบ');
  };

  const toggleNotification = () => setNotificationEnabled(!notificationEnabled);
  const togglePin = () => setPinEnabled(!pinEnabled);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
        <View style={styles.appbarCenter}>
          <Text style={styles.appbarTitle}>การตั้งค่า</Text>
        </View>
      </Appbar.Header>

      {/* เนื้อหาหลัก */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* เปลี่ยนภาษา */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ภาษา</Text>
          <View style={styles.card}>
            <List.Item
              title="ไทย (TH)"
              titleStyle={{ fontFamily: 'NotoSansThai-Regular', fontSize: 18 }}
              left={props => (
                <Image
                  source={require('../assets/images/th.png')}
                  style={{ width: 32, height: 32, marginLeft: 12 }}
                  resizeMode="contain"
                />
              )}
              right={() => selectedLanguage === 'th' ? <Text style={styles.tick}>✔</Text> : null} // ไอคอนติ๊กถูก
              onPress={() => handleLanguageChange('th')} // เมื่อเลือกภาษาไทย
            />
            <List.Item
              title="อังกฤษ (EN-US)"
              titleStyle={{ fontFamily: 'NotoSansThai-Regular', fontSize: 18 }}
              left={props => (
                <Image
                  source={require('../assets/images/en-us.png')}
                  style={{ width: 32, height: 32, marginLeft: 12 }}
                  resizeMode="contain"
                />
              )}
              right={() => selectedLanguage === 'en' ? <Text style={styles.tick}>✔</Text> : null} // ไอคอนติ๊กถูก
              onPress={() => handleLanguageChange('en')} // เมื่อเลือกภาษาอังกฤษ
            />
          </View>
        </View>

        {/* การแจ้งเตือน */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>การแจ้งเตือน</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <List.Icon icon="bell-outline" />
              <Text style={styles.rowText}>เปิดใช้งานการแจ้งเตือน</Text>
              <Switch value={notificationEnabled} onValueChange={toggleNotification} color="#EFB553" />
            </View>
          </View>
        </View>

        {/* ความปลอดภัย */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ความปลอดภัย</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <List.Icon icon="lock-outline" />
              <Text style={styles.rowText}>เข้าใช้งานด้วยรหัส PIN</Text>
              <Switch value={pinEnabled} onValueChange={togglePin} color="#EFB553" />
            </View>
          </View>
        </View>

        {/* ติดต่อเรา */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ติดต่อเรา</Text>
          <View style={styles.card}>
            <List.Item
              title="Email: support@example.com"
              titleStyle={{ fontFamily: 'NotoSansThai-Regular', fontSize: 18 }}
              left={props => <List.Icon {...props} icon="email-outline" />}
            />
            <List.Item
              title="เบอร์โทรศัพท์: 02-123-4567"
              titleStyle={{ fontFamily: 'NotoSansThai-Regular', fontSize: 18 }}
              left={props => <List.Icon {...props} icon="phone-outline" />}
            />
          </View>
        </View>

        {/* ปุ่มออกจากระบบ */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
