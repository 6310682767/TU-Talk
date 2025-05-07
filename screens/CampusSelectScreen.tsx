import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '@styles/campusSelectStyles';
import { useCampus } from '../contexts/CampusContext'; 
import { useUser } from '../contexts/UserContext';
import { RootStackParamList } from '../types';
import { campuses } from '../constants';
import { useTranslation } from 'react-i18next';

type CampusSelectScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CampusSelect'>;

interface CampusSelectScreenProps {
  navigation: CampusSelectScreenNavigationProp;
}

const CampusSelectScreen: React.FC<CampusSelectScreenProps> = ({ navigation }) => {
  const { setCampus: setContextCampus } = useCampus(); 
  const { userProfile, setUserProfile } = useUser();

  const handleSelectCampus = async (campus: string) => {
    setContextCampus(campus); 

    if (userProfile) {
      setUserProfile({
        ...userProfile,          
        campus: campus,
      });
    }

    // บันทึก campus ใน AsyncStorage
    try {
      await AsyncStorage.setItem('selectedCampus', campus);
    } catch (error) {
      console.error('Error saving campus to AsyncStorage:', error);
    }

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