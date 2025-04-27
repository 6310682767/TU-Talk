import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '@styles/campusSelectStyles';
import { useCampus } from '../contexts/CampusContext'; 
import { RootStackParamList } from '../types';
import { campuses } from '../constants';
import { useTranslation } from 'react-i18next';

type CampusSelectScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CampusSelect'>;

interface CampusSelectScreenProps {
  navigation: CampusSelectScreenNavigationProp;
}

const CampusSelectScreen: React.FC<CampusSelectScreenProps> = ({ navigation }) => {
  const { setCampus } = useCampus(); 

  const handleSelectCampus = (campus: string) => {
    setCampus(campus); 
    navigation.navigate('SetDisplayName', { campus });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>เลือกวิทยาเขต</Text>
      <View style={styles.campusList}>
        {campuses.map((campus) => (
          <TouchableOpacity
            key={campus.name} 
            style={styles.campusButton}
            onPress={() => handleSelectCampus(campus.name)}
          >
            <Text style={styles.campusButtonText}>{campus.name}</Text> 
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CampusSelectScreen;
