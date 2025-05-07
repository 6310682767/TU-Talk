import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionSheet from 'react-native-actions-sheet';
import { RootStackParamList } from '../types';
import { categories } from '../constants';
import { usePostContext } from '../contexts/PostContext';
import { useUser } from '../contexts/UserContext';
import { Image as ImageRN } from 'react-native'; 

type PostItemNavigationProp = StackNavigationProp<RootStackParamList>;

interface PostItemProps {
  post: {
    id: string;
    title: string;
    displayName: string;
    userId: string;
    time: string;
    category: string;
    content: string;
    campus: string;
    icon: any;
    comments: any[];
    likes: number;
    isLiked: boolean;
    isSaved: boolean;
    savedBy: string[];
  };
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const navigation = useNavigation<PostItemNavigationProp>();
  const { toggleLike, toggleSave, toggleStarUser, deletePost, starredUsers } = usePostContext();
  const { userProfile } = useUser();
  const actionSheetRef = React.useRef<ActionSheet>(null);
  const userId = userProfile?.userId;

  const [iconSource, setIconSource] = useState<any>(post.icon);

  useEffect(() => {
    // อัปเดต iconSource ถ้า userProfile เปลี่ยน
    if (userProfile?.userId === post.userId && userProfile.avatar) {
      const newIconSource = typeof userProfile.avatar === 'string'
        ? { uri: userProfile.avatar }
        : ImageRN.resolveAssetSource(userProfile.avatar) || { uri: '' };
      setIconSource(newIconSource);
      console.log('Updated iconSource from userProfile:', newIconSource);
    } else if (post.icon) {
      setIconSource(post.icon);
      console.log('Using post.icon:', post.icon);
    } else {
      setIconSource(require('../assets/images/Generic avatar.png'));
      console.log('Using default avatar');
    }
  }, [userProfile, post.userId, post.icon]);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.icon : 'chat-question';
  };

  const isPostSaved = userId ? Array.isArray(post.savedBy) && post.savedBy.includes(userId) : false;
  const isUserStarred = userId ? starredUsers[userId]?.includes(post.userId) || false : false;
  const isOwnPost = userId ? post.userId === userId : false;

  const handleToggleLike = () => {
    if (!userId) {
      alert('กรุณาเข้าสู่ระบบเพื่อกดถูกใจ');
      return;
    }
    toggleLike(post.id);
  };

  const handleToggleSave = () => {
    if (!userId) {
      alert('กรุณาเข้าสู่ระบบเพื่อบันทึกโพสต์');
      return;
    }
    console.log(`Toggling save for post ${post.id} by user ${userId}, current savedBy:`, post.savedBy);
    toggleSave(post.id, userId);
  };

  const handleToggleStarUser = () => {
    if (!userId) {
      alert('กรุณาเข้าสู่ระบบเพื่อติดดาวผู้โพสต์');
      return;
    }
    toggleStarUser(post.userId, userId);
    console.log(`Toggled star for user ${post.userId} by ${userId}`);
  };

  return (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => navigation.navigate('PostDetailScreen', { postId: post.id, campus: post.campus })}
    >
      <View style={styles.postHeader}>
        <TouchableOpacity
          onPress={() =>
            isOwnPost
              ? navigation.navigate('ProfileScreen')
              : navigation.navigate('UserProfileScreen', { userId: post.userId })
          }
        >
          <Image
            source={iconSource}
            style={styles.postIcon}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.displayName}>{post.displayName}</Text>
          <Text style={styles.time}>{post.time}</Text>
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={openActionSheet}
        >
          <MaterialCommunityIcons name="dots-horizontal" size={20} color="#666" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <MaterialCommunityIcons
          name={getCategoryIcon(post.category)}
          size={20}
          color="#666"
          style={styles.categoryIcon}
        />
        <Text style={styles.title}>{post.title}</Text>
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleToggleLike}
        >
          <MaterialCommunityIcons
            name={post.isLiked ? 'thumb-up' : 'thumb-up-outline'}
            size={20}
            color={post.isLiked ? '#EFB553' : '#666'}
          />
          <Text style={styles.actionText}>
            ถูกใจ {post.likes > 0 ? post.likes : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons
            name="comment-outline"
            size={20}
            color="#666"
          />
          <Text style={styles.actionText}>
            ความคิดเห็น {post.comments.length > 0 ? post.comments.length : ''}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleToggleSave}
      >
        <MaterialCommunityIcons
          name={isPostSaved ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color={isPostSaved ? '#EFB553' : '#666'}
        />
      </TouchableOpacity>
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContainer}>
          {isOwnPost ? (
            <TouchableOpacity
              style={styles.actionSheetButton}
              onPress={() => {
                if (!userId) {
                  alert('กรุณาเข้าสู่ระบบเพื่อลบโพสต์');
                  return;
                }
                deletePost(post.id);
                console.log(`Deleted post: ${post.id}`);
                actionSheetRef.current?.hide();
              }}
            >
              <Text style={styles.actionSheetText}>ลบโพสต์</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.actionSheetButton}
                onPress={() => {
                  console.log(`Reported post: ${post.id}`);
                  actionSheetRef.current?.hide();
                }}
              >
                <Text style={styles.actionSheetText}>รายงานโพสต์</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionSheetButton}
                onPress={handleToggleStarUser}
              >
                <Text style={styles.actionSheetText}>
                  {isUserStarred ? 'ยกเลิกติดดาว' : 'ติดดาวผู้โพสต์'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ActionSheet>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 1,
    position: 'relative',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  headerText: {
    flex: 1,
  },
  displayName: {
    fontFamily: 'NotoSansThai-Bold',
    fontSize: 16,
    color: '#333',
  },
  time: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 12,
    color: '#999',
  },
  menuButton: {
    padding: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    marginRight: 8,
  },
  title: {
    fontFamily: 'NotoSansThai-Bold',
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  saveButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  actionSheetContainer: {
    padding: 16,
  },
  actionSheetButton: {
    paddingVertical: 12,
  },
  actionSheetText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 16,
    color: '#333',
  },
});

export default PostItem;