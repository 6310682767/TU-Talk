import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Appbar, List, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '@styles/settingsStyles';
import i18n from '../locales/i18n';
import { RootStackParamList } from '../types';
import { useUser } from '../contexts/UserContext'; 

type SettingsNavigationProp = StackNavigationProp<RootStackParamList, 'SettingsScreen'>;

interface SettingsState {
  notifications: boolean;
  pin: boolean;
  language: 'th' | 'en';
}

const LanguageSection: React.FC<{
  selectedLanguage: string;
  onLanguageChange: (language: 'th' | 'en') => void;
  t: (key: string) => string;
}> = ({ selectedLanguage, onLanguageChange, t }) => (
  <View style={styles.section}>
    <Text style={styles.sectionLabel}>{t('language')}</Text>
    <View style={styles.card}>
      <List.Item
        title={t('thai')}
        titleStyle={{ fontFamily: 'NotoSansThai-Regular', fontSize: 18 }}
        left={() => (
          <Image
            source={require('../assets/images/th.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        )}
        right={() => (selectedLanguage === 'th' ? <Text style={styles.tick}>✔</Text> : null)}
        onPress={() => onLanguageChange('th')}
      />
      <List.Item
        title={t('english')}
        titleStyle={{ fontFamily: 'NotoSansThai-Regular', fontSize: 18 }}
        left={() => (
          <Image
            source={require('../assets/images/en-us.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        )}
        right={() => (selectedLanguage === 'en' ? <Text style={styles.tick}>✔</Text> : null)}
        onPress={() => onLanguageChange('en')}
      />
    </View>
  </View>
);

const NotificationSection: React.FC<{
  notifications: boolean;
  toggleNotifications: () => void;
  t: (key: string) => string;
}> = ({ notifications, toggleNotifications, t }) => (
  <View style={styles.section}>
    <Text style={styles.sectionLabel}>{t('notifications')}</Text>
    <View style={styles.card}>
      <View style={styles.row}>
        <List.Icon icon="bell-outline" style={styles.icon} />
        <Text style={styles.rowText}>{t('enableNotifications')}</Text>
        <Switch
          value={notifications}
          onValueChange={toggleNotifications}
          color="#EFB553"
          style={styles.switch}
        />
      </View>
    </View>
  </View>
);

const SecuritySection: React.FC<{
  pin: boolean;
  togglePin: () => void;
  t: (key: string) => string;
}> = ({ pin, togglePin, t }) => (
  <View style={styles.section}>
    <Text style={styles.sectionLabel}>{t('security')}</Text>
    <View style={styles.card}>
      <View style={styles.row}>
        <List.Icon icon="lock-outline" style={styles.icon} />
        <Text style={styles.rowText}>{t('enablePin')}</Text>
        <Switch value={pin} onValueChange={togglePin} color="#EFB553" style={styles.switch} />
      </View>
    </View>
  </View>
);

const ContactSection: React.FC<{ t: (key: string) => string }> = ({ t }) => (
  <View style={styles.section}>
    <Text style={styles.sectionLabel}>{t('contactUs')}</Text>
    <View style={styles.card}>
      <List.Item
        title={t('email')}
        titleStyle={{ fontFamily: 'NotoSansThai-Regular', fontSize: 18 }}
        left={() => <List.Icon icon="email-outline" style={styles.icon} />}
      />
      <List.Item
        title={t('phone')}
        titleStyle={{ fontFamily: 'NotoSansThai-Regular', fontSize: 18 }}
        left={() => <List.Icon icon="phone-outline" style={styles.icon} />}
      />
    </View>
  </View>
);

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsNavigationProp>();
  const { t } = useTranslation();
  const { logout } = useUser(); // Use logout from UserContext
  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    pin: false,
    language: i18n.language === 'en' ? 'en' : 'th',
  });

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage && (savedLanguage === 'th' || savedLanguage === 'en')) {
          setSettings(prev => ({ ...prev, language: savedLanguage }));
          i18n.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load language from AsyncStorage:', error);
      }
    };
    loadLanguage();
  }, []);

  const handleLanguageChange = (language: 'th' | 'en') => {
    try {
      setSettings(prev => ({ ...prev, language }));
      i18n.changeLanguage(language);
      AsyncStorage.setItem('language', language).catch(error => {
        console.error('Failed to save language to AsyncStorage:', error);
      });
    } catch (error) {
      console.error('Failed to change language:', error);
      Alert.alert(t('error'), t('languageChangeFailed'));
    }
  };

  const toggleNotifications = () => {
    setSettings(prev => ({ ...prev, notifications: !prev.notifications }));
  };

  const togglePin = () => {
    setSettings(prev => ({ ...prev, pin: !prev.pin }));
  };

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      t('confirmLogout'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('logout'),
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear user session
              await AsyncStorage.removeItem('userToken'); // Adjust key as needed
              // Clear user context
              logout(); // Call logout from UserContext
              // Reset navigation to Login
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              );
            } catch (error) {
              console.error('Logout failed:', error);
              Alert.alert(t('error'), t('logoutFailed'));
              // Fallback navigation
              try {
                navigation.replace('Login');
              } catch (fallbackError) {
                console.error('Fallback navigation failed:', fallbackError);
              }
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
        <View style={styles.appbarCenter}>
          <Text style={styles.appbarTitle}>{t('settings')}</Text>
        </View>
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <LanguageSection
          selectedLanguage={settings.language}
          onLanguageChange={handleLanguageChange}
          t={t}
        />
        <NotificationSection
          notifications={settings.notifications}
          toggleNotifications={toggleNotifications}
          t={t}
        />
        <SecuritySection pin={settings.pin} togglePin={togglePin} t={t} />
        <ContactSection t={t} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>{t('logout')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;