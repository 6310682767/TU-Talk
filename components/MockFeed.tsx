import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useForum } from '../contexts/ForumContext';

const mockPosts = {
  รังสิต: [
    {
      id: '1',
      displayName: 'แนน TU',
      time: '2 ชั่วโมงที่แล้ว',
      category: 'ถาม-ตอบทั่วไป',
      content: 'ใครเคยลงวิชา TU103 กับอ.สมชายบ้างคะ ขอรีวิวหน่อยค่ะ',
    },
    {
      id: '2',
      displayName: 'Mark TU',
      time: '5 ชั่วโมงที่แล้ว',
      category: 'ร้านเด็ดในมอ',
      content: 'ข้าวหมูแดงเจ้าเด็ดหลังมอ ยังเปิดอยู่มั้ยครับ',
    },
    {
      id: '3',
      displayName: 'ออม',
      time: 'เมื่อวาน',
      category: 'รีวิววิชา & อาจารย์',
      content: 'รีวิววิชา TU106 กับ อ.ปิ่นสุดใจ สนุกมากๆ เลยค่ะ มีเล่นเกมในคลาสด้วย',
    },
  ],
  ท่าพระจันทร์: [
    {
      id: '4',
      displayName: 'นัท',
      time: '1 ชั่วโมงที่แล้ว',
      category: 'หอพัก',
      content: 'หอพักไหนที่ไม่ไกลจากวิทยาลัยมากครับ',
    },
    {
      id: '5',
      displayName: 'ป้อม',
      time: '3 ชั่วโมงที่แล้ว',
      category: 'ฝึกงาน/สหกิจ',
      content: 'มีบริษัทไหนรับสหกิจของคณะวิศวะบ้างครับ',
    },
  ],
  ลำปาง: [
    {
      id: '6',
      displayName: 'เจี๊ยบ',
      time: '4 ชั่วโมงที่แล้ว',
      category: 'ถาม-ตอบทั่วไป',
      content: 'มีร้านกาแฟแนะนำในลำปางมั้ยครับ?',
    },
  ],
  พัทยา: [
    {
      id: '7',
      displayName: 'โอม',
      time: '6 ชั่วโมงที่แล้ว',
      category: 'ข่าวสาร',
      content: 'งานประชุมวิชาการในพัทยาเดือนหน้ามีใครสนใจบ้างครับ',
    },
  ],
};

export default function MockFeed() {
  const {
    campus: selectedCampus,
    category: selectedCategory,
  } = useForum();

  const getFilteredPosts = () => {
    // กรองโพสต์ตามวิทยาเขต
    const postsForCampus = mockPosts[selectedCampus] || [];

    // กรองโพสต์ตามหมวดหมู่
    if (selectedCategory) {
      return postsForCampus.filter(post => post.category === selectedCategory);
    }

    // ถ้าไม่ได้เลือกหมวดหมู่ จะเอาทุกโพสต์ในวิทยาเขตนั้น
    return postsForCampus;
  };

  const postsToShow = getFilteredPosts();

  return (
    <FlatList
      data={postsToShow}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <View style={styles.header}>
            <Text style={styles.displayName}>{item.displayName}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <Text style={styles.category}>#{item.category}</Text>
          <Text style={styles.content}>{item.content}</Text>
          <View style={styles.actionRow}>
            <MaterialCommunityIcons name="thumb-up-outline" size={20} />
            <Text style={styles.actionText}>ถูกใจ</Text>
            <MaterialCommunityIcons name="comment-outline" size={20} style={{ marginLeft: 20 }} />
            <Text style={styles.actionText}>ความคิดเห็น</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  displayName: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  category: {
    fontSize: 12,
    color: '#D84A34',
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    fontFamily: 'NotoSansThai-Regular',
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'NotoSansThai-Regular',
  },
});
