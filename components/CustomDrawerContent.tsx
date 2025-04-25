import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForum } from '../contexts/ForumContext';
import styles from '@styles/customDrawerContentStyles';

const campuses = [
  { name: 'รังสิต' },
  { name: 'ท่าพระจันทร์' },
  { name: 'ลำปาง' },
  { name: 'พัทยา' },
];

const categories = [
  { name: 'ถาม-ตอบทั่วไป', icon: 'chat-question' },
  { name: 'วิชาการ', icon: 'book-open-variant' },
  { name: 'รีวิววิชา & อาจารย์', icon: 'account-star' },
  { name: 'หอพัก', icon: 'home-city' },
  { name: 'ตามหาของหาย', icon: 'magnify' },
  { name: 'ร้านเด็ดในมอ', icon: 'silverware-fork-knife' },
  { name: 'ข่าวสาร', icon: 'newspaper-variant-outline' },
  { name: 'ฝึกงาน/สหกิจ', icon: 'briefcase-variant-outline' },
  { name: 'กิจกรรม/ชมรม', icon: 'account-group' },
];

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {
    campus: selectedCampus,
    category: selectedCategory,
    setCampus: setSelectedCampus,
    setCategory: setSelectedCategory,
  } = useForum();

  const handleSelectCampus = (campus: string) => {
    if (campus !== selectedCampus) {
      setSelectedCampus(campus);
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory((prevCategory: string | null) =>
      prevCategory === category ? null : category
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>วิทยาเขต</Text>
        <View style={styles.buttonContainer}>
          {campuses.map((campus) => (
            <TouchableOpacity
              key={campus.name}
              onPress={() => handleSelectCampus(campus.name)}
              style={[styles.button, selectedCampus === campus.name && styles.buttonSelected]}
            >
              <Text
                style={[styles.buttonText, selectedCampus === campus.name && styles.selectedText]}
              >
                {campus.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>หมวดหมู่ฟอรั่ม</Text>
        <View style={styles.buttonContainer}>
          {categories.map((category) => {
            const selected = selectedCategory === category.name;
            return (
              <TouchableOpacity
                key={category.name}
                onPress={() => handleSelectCategory(category.name)}
                style={[styles.button, selected && styles.buttonSelected]}
              >
                <MaterialCommunityIcons
                  name={category.icon}
                  size={24}
                  color={selected ? '#fff' : '#000'}
                  style={styles.icon}
                />
                <Text
                  style={[styles.buttonText, selected && styles.selectedText]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
