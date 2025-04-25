import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const campuses = [
  { name: 'รังสิต', },
  { name: 'ท่าพระจันทร์', },
  { name: 'ลำปาง', },
  { name: 'พัทยา', },
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

export default function CustomDrawerContent(props) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(prev => (prev === category ? null : category));
    // trigger filter logic here
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>เลือกวิทยาเขต</Text>
        <View style={styles.buttonContainer}>
          {campuses.map((campus) => (
            <TouchableOpacity key={campus.name} style={styles.button}>
              <Text style={styles.buttonText}>{campus.name}</Text>
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
                  size={28}
                  color={selected ? '#fff' : '#000'}
                  style={styles.icon}
                />
                <Text style={[styles.buttonText, selected && styles.selectedText]}>
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 30,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginRight: 0,
    marginBottom: 5,
    alignSelf: 'flex-start',
    flexDirection: 'row', // Align icon and text horizontally
    justifyContent: 'center',
  },
  buttonSelected: {
    backgroundColor: '#D84A34',
  },
  icon: {
    marginRight: 6, // Space between icon and text
  },
  buttonText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 14,
    color: '#000',
  },
  selectedText: {
    color: '#fff', // Change text color when selected
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
    marginHorizontal: 4,
  },
});