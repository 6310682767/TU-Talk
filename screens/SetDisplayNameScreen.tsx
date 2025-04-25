import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '@styles/setDisplayNameStyles'; // นำเข้าจากไฟล์แยก

const SetDisplayNameScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState('');

  const handleSetDisplayName = () => {
    if (!displayName) {
      alert('กรุณากรอกชื่อแสดง');
      return;
    }

    alert(`ชื่อแสดงของคุณคือ: ${displayName}`); // ล็อกการแสดงผลหรือทำการส่งข้อมูลไปยัง API ตามต้องการ
    navigation.navigate('MainApp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ตั้งชื่อแสดง</Text>
      <TextInput
        style={styles.input}
        placeholder="ชื่อแสดงของคุณ"
        placeholderTextColor="#aaa"
        value={displayName}
        onChangeText={setDisplayName}
        maxLength={25} // จำกัดจำนวนตัวอักษรสูงสุดที่ 25
      />
      <TouchableOpacity style={styles.button} onPress={handleSetDisplayName}>
        <Text style={styles.buttonText}>ยืนยัน</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetDisplayNameScreen;
