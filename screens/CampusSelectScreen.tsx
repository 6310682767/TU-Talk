import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@styles/campusSelectStyles'; // นำเข้า style

const CampusSelectScreen = ({ navigation }) => {
  const campuses = ['รังสิต ', 'ท่าพระจันทร์', 'ลำปาง', 'พัทยา',  ];

  const handleSelectCampus = (campus: string) => {
    navigation.navigate('SetDisplayName', { campus }); // ส่งข้อมูล campus ไปยัง SetDisplayName
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>เลือกวิทยาเขต</Text>
      <View style={styles.campusList}>
        {campuses.map((campus) => (
          <TouchableOpacity
            key={campus}
            style={styles.campusButton}
            onPress={() => handleSelectCampus(campus)}
          >
            <Text style={styles.campusButtonText}>{campus}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CampusSelectScreen;
