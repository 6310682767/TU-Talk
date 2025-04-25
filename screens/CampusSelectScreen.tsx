import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@styles/campusSelectStyles';
import { useCampus } from '../contexts/CampusContext'; 

const CampusSelectScreen = ({ navigation }) => {
  const campuses = ['รังสิต', 'ท่าพระจันทร์', 'ลำปาง', 'พัทยา'];
  const { setCampus } = useCampus(); // 

  const handleSelectCampus = (campus: string) => {
    setCampus(campus); 
    navigation.navigate('SetDisplayName');
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
