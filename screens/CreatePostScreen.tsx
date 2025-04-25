import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '@styles/createPostStyles';

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (!title || !content) {
      alert('กรุณากรอกชื่อเรื่องและเนื้อหา');
      return;
    }
    alert('โพสต์เรียบร้อย!');
    // ส่งไปยัง backend ได้ตรงนี้
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ชื่อเรื่อง</Text>
      <TextInput
        style={styles.input}
        placeholder="พิมพ์ชื่อเรื่องที่นี่"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>เนื้อหา</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="เขียนเนื้อหาฟอรั่ม..."
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={6}
      />
      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>โพสต์</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostScreen;
