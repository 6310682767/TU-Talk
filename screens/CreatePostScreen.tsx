import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Pressable, StatusBar, Animated, StyleSheet } from 'react-native';
import { styles } from '@styles/createPostStyles';
import { useForum } from '../contexts/ForumContext';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Text as PaperText } from 'react-native-paper';
import { Portal } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { categories, targetGroups } from '../constants';

interface CategoryItem {
  name: string;
  icon: string;
}

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CategoryItem | null>(null);
  const [targetGroup, setTargetGroup] = useState('');
  const [modalType, setModalType] = useState<'category' | 'target' | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
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

  const openModal = (type: 'category' | 'target') => {
    setModalType(type);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setModalType(null));
  };

  const renderItem = ({ item }: { item: CategoryItem | { name: string; icon: string } }) => (
    <Pressable
      style={styles.modalItem}
      onPress={() => {
        if (modalType === 'category') setCategory(item as CategoryItem);
        else setTargetGroup(item.name);
        closeModal();
      }}
    >
      <MaterialCommunityIcons name={item.icon} size={24} color="#333" style={{ marginRight: 10 }} />
      <Text style={styles.modalItemText}>{item.name}</Text>
    </Pressable>
  );

  const dataList = modalType === 'category' ? categories : targetGroups;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Modal */}
      <Portal>
      {modalType && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 10,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeModal}
          />

          <Animated.View
            style={{
              width: '80%',
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 20,
              opacity: fadeAnim,
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
              ],
              elevation: 5, // เพิ่มเงาเบาๆ
            }}
          >
            <Text style={styles.modalTitle}>
              {modalType === 'category' ? 'เลือกหมวดหมู่' : 'เลือกกลุ่มเป้าหมาย'}
            </Text>
            <FlatList
              data={dataList}
              renderItem={renderItem}
              keyExtractor={(item) => item.name}
            />
          </Animated.View>
        </View>
      )}
      </Portal>
      {/* Header */}
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

        <TouchableOpacity style={styles.selector} onPress={() => openModal('category')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {category && (
              <MaterialCommunityIcons name={category.icon} size={24} color="#333" style={{ marginRight: 10 }} />
            )}
            <Text style={styles.selectorText}>
              {category ? category.name : '-- เลือกหมวดหมู่ --'}
            </Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity style={styles.selector} onPress={() => openModal('target')}>
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
              {targetGroup ? targetGroup : '-- เลือกกลุ่มเป้าหมาย --'}
            </Text>
          </View>
        </TouchableOpacity>

        <TextInput
          placeholder="ชื่อเรื่อง"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          style={[styles.textInput, { textAlignVertical: 'top' }]} 
          multiline
        />

        <TextInput
          placeholder="เขียนเนื้อหาฟอรั่ม..."
          placeholderTextColor="#999"
          value={content}
          onChangeText={setContent}
          style={[styles.textInput, { textAlignVertical: 'top' }]}
          multiline
        />
      </View>
    </View>
  );
};

export default CreatePostScreen;
