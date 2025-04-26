import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native';
import { styles } from '@styles/createPostStyles';
import { useForum } from '../contexts/ForumContext';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Text as PaperText } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { categories, targetGroups } from '../constants';

interface CategoryItem {
  name: string;
  icon: string;
}

const CreatePostScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<CategoryItem | null>(null);
  const [targetGroup, setTargetGroup] = useState<string>('');
  const [categoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
  const [targetGroupModalVisible, setTargetGroupModalVisible] = useState<boolean>(false);

  const { campus } = useForum();
  const { userProfile } = useUser();
  const navigation = useNavigation();

  const handlePost = () => {
    if (!title || !content || !category || !targetGroup) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const postData = {
      title,
      content,
      campus,
      category: category.name,
      targetGroup,
      faculty: userProfile?.faculty,
      department: userProfile?.department,
    };

    console.log('โพสต์ใหม่:', postData);
    alert('โพสต์เรียบร้อย!');
    navigation.goBack();
  };

  const renderCategoryItem = ({ item }: { item: CategoryItem }) => (
    <Pressable
      style={styles.modalItem}
      onPress={() => {
        setCategory(item);
        setCategoryModalVisible(false);
      }}
    >
      <MaterialCommunityIcons name={item.icon} size={24} color="#333" style={{ marginRight: 10 }} />
      <Text style={styles.modalItemText}>{item.name}</Text>
    </Pressable>
  );

  const renderTargetGroupItem = ({ item }: { item: { name: string; icon: string } }) => (
    <Pressable
      style={styles.modalItem}
      onPress={() => {
        setTargetGroup(item.name);
        setTargetGroupModalVisible(false);
      }}
    >
      <MaterialCommunityIcons name={item.icon} size={24} color="#333" style={{ marginRight: 10 }} />
      <Text style={styles.modalItemText}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Appbar */}
      <Appbar.Header style={{ backgroundColor: '#EFB553' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <View style={{ flex: 1, alignItems: 'center', marginRight: 12 }}>
          <PaperText style={{ fontFamily: 'NotoSansThai-Bold', fontSize: 20, color: 'white' }}>
            สร้างโพสต์
          </PaperText>
        </View>
        <TouchableOpacity onPress={handlePost} style={{ marginRight: 12 }}>
          <MaterialCommunityIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </Appbar.Header>

      {/* Content */}
      <View style={styles.container}>
        {/* เลือกหมวดหมู่ */}
        <Text style={styles.label}>เลือกหมวดหมู่</Text>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setCategoryModalVisible(true)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {category && (
              <MaterialCommunityIcons name={category.icon} size={24} color="#333" style={{ marginRight: 10 }} />
            )}
            <Text style={styles.selectorText}>
              {category ? category.name : '-- เลือกหมวดหมู่ --'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* เลือกกลุ่มเป้าหมาย */}
        <Text style={styles.label}>เลือกกลุ่มเป้าหมาย</Text>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setTargetGroupModalVisible(true)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {targetGroup && (
              <MaterialCommunityIcons
                name={targetGroups.find(t => t.name === targetGroup)?.icon || ''}
                size={24}
                color="#333"
                style={{ marginRight: 10 }}
              />
            )}
            <Text style={styles.selectorText}>
              {targetGroup ? targetGroups.find(t => t.name === targetGroup)?.name : '-- เลือกกลุ่มเป้าหมาย --'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* ชื่อเรื่อง */}
        <TextInput
          placeholder="ชื่อเรื่อง"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          style={styles.textInput}
        />

        {/* เนื้อหา */}
        <TextInput
          placeholder="เขียนเนื้อหาฟอรั่ม..."
          placeholderTextColor="#999"
          value={content}
          onChangeText={setContent}
          style={[styles.textInput, { height: 150, textAlignVertical: 'top' }]}
          multiline
        />
      </View>

      {/* Modal Category */}
      <Modal visible={categoryModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>เลือกหมวดหมู่</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.name}
          />
        </View>
      </Modal>

      {/* Modal Target Group */}
      <Modal visible={targetGroupModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>เลือกกลุ่มเป้าหมาย</Text>
          <FlatList
            data={targetGroups}
            renderItem={renderTargetGroupItem}
            keyExtractor={(item) => item.name}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CreatePostScreen;
