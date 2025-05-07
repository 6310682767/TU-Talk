import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ImageBackground,
} from 'react-native';
import { styles } from '@styles/loginStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { useUser } from '../contexts/UserContext';
import { RootStackParamList } from '../types';
import { useTranslation } from 'react-i18next';

// กำหนดประเภทของ navigation
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>(); // ใช้ประเภท StackNavigationProp

  const [studentId, setStudentId] = useState('');
  const [citizenId, setCitizenId] = useState('');
  const { setUserProfile } = useUser();

  const handleLogin = async () => {
    if (!studentId || !citizenId) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
  
    try {
      const response = await fetch('http://10.0.2.2:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          citizenId,
        }),
      });
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('ไม่สามารถอ่านข้อมูลจากเซิร์ฟเวอร์ได้');
      }

      const data = await response.json();
      console.log('Response Data:', data);
      if (response.ok && data.success) {
        setUserProfile({
          userId: data.username, // ใช้รหัสนักศึกษาเป็น userId แทนไปก่อน
          studentId: data.username,
          name: data.displayname_th,  
          faculty: data.faculty, 
          department: data.department, 
          email: data.email,
          campus: '',
          displayName: '',
          avatar: '', 
        });
        // alert(`ยินดีต้อนรับ ${data.displayname_th}`);
        navigation.navigate('CampusSelect'); // นำทางไปหน้าเลือกวิทยาเขต
      } else {
        const errData = await response.json();
        alert(errData.message || 'เข้าสู่ระบบไม่สำเร็จ');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />

        <TextInput
          style={styles.input}
          placeholder="Student ID"
          placeholderTextColor="#aaa"
          value={studentId}
          onChangeText={setStudentId}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={citizenId}
          onChangeText={setCitizenId}
          secureTextEntry
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;
