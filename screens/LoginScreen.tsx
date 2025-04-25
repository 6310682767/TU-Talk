// src/screens/LoginScreen.tsx
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

const LoginScreen = () => {
  const [studentId, setStudentId] = useState('');
  const [citizenId, setCitizenId] = useState('');

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

      if (response.ok) {
        alert(`ยินดีต้อนรับ`);
        // navigate ไปหน้าอื่น
      } else {
        alert('เข้าสู่ระบบไม่สำเร็จ');
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