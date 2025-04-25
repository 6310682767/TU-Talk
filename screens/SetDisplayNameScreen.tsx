// SetDisplayNameScreen.tsx
import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '@styles/setDisplayNameStyles';
import { useForum } from '../contexts/ForumContext';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types'; 

// กำหนดประเภทของ navigation และ route
type SetDisplayNameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SetDisplayName'>;
type SetDisplayNameScreenRouteProp = RouteProp<RootStackParamList, 'SetDisplayName'>;

type Props = {
  route: SetDisplayNameScreenRouteProp;
  navigation: SetDisplayNameScreenNavigationProp;
};

const SetDisplayNameScreen = ({ route, navigation }: Props) => {
  const [displayName, setDisplayName] = useState('');
  const campus = route?.params?.campus ?? null; // ใช้ fallback
  const { setCampus } = useForum();

  useEffect(() => {
    if (campus) {
      setCampus(campus);
    }
  }, [campus]);

  const handleSetDisplayName = () => {
    if (!displayName) {
      alert('กรุณากรอกชื่อแสดง');
      return;
    }

    alert(`ชื่อแสดงของคุณคือ: ${displayName}`);
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
