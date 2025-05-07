import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
  StyleSheet,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Appbar, Portal } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useForum } from '../contexts/ForumContext';
import { useUser } from '../contexts/UserContext';
import { usePostContext } from '../contexts/PostContext';
import { useTranslation } from 'react-i18next';
import { categories, targetGroups } from '../constants';
import { styles } from '@styles/createPostStyles';

interface CategoryItem {
  name: string;
  icon: string;
}

interface TargetGroupItem {
  name: string;
  icon: string;
}

const theme = {
  colors: {
    text: '#333',
    placeholder: '#999',
    background: '#fff',
  },
};

const CreatePostScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { campus } = useForum();
  const { userProfile } = useUser();
  const { addPost } = usePostContext();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<CategoryItem | null>(null);
  const [targetGroup, setTargetGroup] = useState<string>('');
  const [modalType, setModalType] = useState<'category' | 'target' | null>(null);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [isPosted, setIsPosted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      if (isPosted) {
        setTitle('');
        setContent('');
        setCategory(null);
        setTargetGroup('');
        setIsPosted(false);
      }
    }, [isPosted])
  );

  const validateInputs = (): boolean => {
    if (!userProfile?.userId) {
      setError(t('errors.loginRequired'));
      return false;
    }
    if (!campus && !userProfile?.campus) {
      setError(t('errors.campusRequired'));
      return false;
    }
    if (!title.trim() || !content.trim() || !category || !targetGroup) {
      setError(t('errors.allFieldsRequired'));
      return false;
    }
    return true;
  };

  const handlePost = async () => {
    setError('');
    if (!validateInputs()) return;

    setIsPosting(true);
    try {
      const postData = {
        id: `p${Date.now()}`,
        title,
        content,
        userId: userProfile!.userId,
        displayName: userProfile?.displayName || 'ผู้ใช้ปัจจุบัน',
        time: new Date().toLocaleString('th-TH', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        category: category!.name,
        icon: userProfile?.avatar
          ? { uri: userProfile.avatar }
          : require('../assets/images/Generic avatar.png'),
        likes: 0,
        isLiked: false,
        savedBy: [],
        isSaved: false,
        comments: [],
        campus: campus || userProfile!.campus!,
        targetGroup,
        faculty: userProfile?.faculty,
        department: userProfile?.department,
      };

      addPost(postData);
      setIsPosted(true);
      navigation.goBack();
    } catch (error) {
      setError(t('errors.postFailed'));
      console.error('Post error:', error);
    } finally {
      setIsPosting(false);
    }
  };

  const saveDraft = () => {
    const draftData = {
      title,
      content,
      category: category?.name,
      targetGroup,
      campus,
    };
    console.log('Saving draft:', draftData);
    setTitle('');
    setContent('');
    setCategory(null);
    setTargetGroup('');
    navigation.goBack();
  };

  const discardPost = () => {
    setTitle('');
    setContent('');
    setCategory(null);
    setTargetGroup('');
    navigation.goBack();
  };

  const handleClose = () => {
    if (title.trim() || content.trim() || category || targetGroup) {
      Alert.alert(
        t('บันทึกโพสต์นี้เป็นฉบับร่างหรือไม่'),
        t('หากคุณทิ้งตอนนี้ โพสต์นี้จะหายไป'),
        [
          {
            text: t('บันทึกฉบับร่าง'),
            onPress: saveDraft,
          },
          {
            text: t('ลบทิ้ง'),
            onPress: discardPost,
            style: 'destructive',
          },
          {
            text: t('แก้ไขต่อไป'),
            onPress: () => {},
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    } else {
      navigation.goBack();
    }
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

  const renderSelector = (
    label: string,
    value: string | undefined,
    icon: string | undefined,
    onPress: () => void
  ) => (
    <TouchableOpacity
      style={styles.selector}
      onPress={onPress}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <View style={styles.selectorContent}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={theme.colors.text}
            style={styles.selectorIcon}
          />
        )}
        <Text style={[styles.selectorText, !value && styles.placeholderText]}>
          {value || label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderModalItem = ({ item }: { item: CategoryItem | TargetGroupItem }) => (
    <Pressable
      style={styles.modalItem}
      onPress={() => {
        if (modalType === 'category') setCategory(item as CategoryItem);
        else setTargetGroup(item.name);
        closeModal();
      }}
      accessibilityRole="button"
    >
      <MaterialCommunityIcons
        name={item.icon}
        size={24}
        color={theme.colors.text}
        style={styles.modalItemIcon}
      />
      <Text style={styles.modalItemText}>{item.name}</Text>
    </Pressable>
  );

  const dataList = modalType === 'category' ? categories : targetGroups;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action
          icon="close"
          color={theme.colors.background}
          onPress={handleClose}
          accessibilityLabel={t('accessibility.close')}
        />
        <Appbar.Content
          title={t('สร้างโพสต์')}
          titleStyle={styles.appbarTitle}
        />
        <TouchableOpacity
          onPress={handlePost}
          disabled={isPosting}
          style={styles.sendButton}
          accessibilityLabel={t('accessibility.post')}
        >
          {isPosting ? (
            <ActivityIndicator size="small" color={theme.colors.background} />
          ) : (
            <MaterialCommunityIcons
              name="send"
              size={24}
              color={theme.colors.background}
            />
          )}
        </TouchableOpacity>
      </Appbar.Header>

      <View style={styles.content}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {renderSelector(
          t('เลือกหมวดหมู่'),
          category?.name,
          category?.icon,
          () => openModal('category')
        )}

        {renderSelector(
          t('เลือกกลุ่มเป้าหมาย'),
          targetGroup,
          targetGroups.find((t) => t.name === targetGroup)?.icon,
          () => openModal('target')
        )}

        <TextInput
          placeholder={t('ชื่อเรื่อง')}
          placeholderTextColor={theme.colors.placeholder}
          value={title}
          onChangeText={setTitle}
          style={styles.textInput}
          multiline
          accessibilityLabel={t('accessibility.titleInput')}
        />

        <TextInput
          placeholder={t('เนื้อหาโพสต์...')}
          placeholderTextColor={theme.colors.placeholder}
          value={content}
          onChangeText={setContent}
          style={[styles.textInput, styles.contentInput]}
          multiline
          accessibilityLabel={t('accessibility.contentInput')}
        />
      </View>

      <Portal>
        {modalType && (
          <View style={styles.modalOverlay}>
            <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />
            <Animated.View
              style={[
                styles.modalContent,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      scale: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.95, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.modalTitle}>
                {modalType === 'category'
                  ? t('เลือกหมวดหมู่')
                  : t('เลือกกลุ่มเป้าหมาย')}
              </Text>
              <FlatList
                data={dataList}
                renderItem={renderModalItem}
                keyExtractor={(item) => item.name}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
              />
            </Animated.View>
          </View>
        )}
      </Portal>
    </KeyboardAvoidingView>
  );
};

export default CreatePostScreen;