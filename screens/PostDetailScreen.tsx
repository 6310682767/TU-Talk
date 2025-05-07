import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionSheet from 'react-native-actions-sheet';
import { RootStackParamList } from '../types';
import { usePostContext } from '../contexts/PostContext';
import { useUser } from '../contexts/UserContext';

type PostDetailNavigationProp = StackNavigationProp<RootStackParamList, 'PostDetailScreen'>;

const PostDetailScreen: React.FC = () => {
  const navigation = useNavigation<PostDetailNavigationProp>();
  const route = useRoute<any>();
  const { postId } = route.params;
  const { posts, toggleLike, toggleSave, addComment, toggleStarUser, deletePost, starredUsers } = usePostContext();
  const { userProfile } = useUser();
  const actionSheetRef = React.useRef<ActionSheet>(null);
  const [newComment, setNewComment] = useState('');
  const userId = userProfile?.userId;

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color="#000" onPress={() => navigation.goBack()} />
          <Appbar.Content title="โพสต์" titleStyle={styles.appbarTitle} />
        </Appbar.Header>
        <Text style={styles.errorText}>ไม่พบโพสต์</Text>
      </View>
    );
  }

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const handleAddComment = () => {
    if (!userId) {
      alert('กรุณาเข้าสู่ระบบเพื่อแสดงความคิดเห็น');
      return;
    }
    if (!newComment.trim()) return;

    const comment = {
      id: `c${Date.now()}`,
      displayName: userProfile?.displayName || 'ผู้ใช้ปัจจุบัน',
      userId: userId,
      content: newComment,
      time: 'ตอนนี้',
      icon: userProfile?.avatar
        ? { uri: userProfile.avatar }
        : require('../assets/images/Generic avatar.png'),
    };

    addComment(postId, comment);
    setNewComment('');
  };

  const handleToggleLike = () => {
    if (!userId) {
      alert('กรุณาเข้าสู่ระบบเพื่อกดถูกใจ');
      return;
    }
    toggleLike(postId);
  };

  const handleToggleSave = () => {
    if (!userId) {
      alert('กรุณาเข้าสู่ระบบเพื่อบันทึกโพสต์');
      return;
    }
    console.log(`Toggling save for post ${postId} by user ${userId}, current savedBy:`, post.savedBy);
    toggleSave(postId, userId);
  };

  const handleToggleStarUser = () => {
    if (!userId) {
      alert('กรุณาเข้าสู่ระบบเพื่อติดดาวผู้โพสต์');
      return;
    }
    toggleStarUser(post.userId, userId);
    console.log(`Toggled star for user ${post.userId} by ${userId}`);
  };

  const isPostSaved = userId ? Array.isArray(post.savedBy) && post.savedBy.includes(userId) : false;
  const isOwnPost = userId ? post.userId === userId : false;
  const isUserStarred = userId ? starredUsers[userId]?.includes(post.userId) || false : false;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="#000" onPress={() => navigation.goBack()} />
        <TouchableOpacity
          onPress={() =>
            isOwnPost
              ? navigation.navigate('ProfileScreen')
              : navigation.navigate('UserProfileScreen', { userId: post.userId })
          }
        >
          <Image source={post.icon} style={styles.appbarIcon} resizeMode="cover" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.appbarTitle}>{post.displayName}</Text>
          <Text style={styles.appbarSubtitle}>{post.time}</Text>
        </View>
        <Appbar.Action
          icon={() => (
            <MaterialCommunityIcons name="dots-horizontal" size={24} color="#666" />
          )}
          onPress={openActionSheet}
        />
      </Appbar.Header>

      <FlatList
        data={post.comments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.postContainer}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.postContent}>{post.content}</Text>
            <Text style={styles.category}>#{post.category}</Text>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionButton} onPress={handleToggleLike}>
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
                <MaterialCommunityIcons name="comment-outline" size={20} color="#666" />
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
          </View>
        }
        renderItem={({ item }) => {
          const isOwnComment = userId ? item.userId === userId : false;
          return (
            <View style={styles.commentContainer}>
              <TouchableOpacity
                onPress={() =>
                  isOwnComment
                    ? navigation.navigate('ProfileScreen')
                    : navigation.navigate('UserProfileScreen', { userId: item.userId })
                }
              >
                <Image source={item.icon} style={styles.commentIcon} resizeMode="cover" />
              </TouchableOpacity>
              <View style={styles.commentWrapper}>
                <View style={styles.commentBubble}>
                  <Text style={styles.commentDisplayName}>{item.displayName}</Text>
                  <Text style={styles.commentContent}>{item.content}</Text>
                </View>
                <Text style={styles.commentTime}>{item.time}</Text>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.commentInputContainer}>
        <Image
          source={
            userProfile?.avatar
              ? { uri: userProfile.avatar }
              : require('../assets/images/Generic avatar.png')
          }
          style={styles.commentInputIcon}
          resizeMode="cover"
        />
        <TextInput
          style={styles.commentInput}
          placeholder="เขียนความคิดเห็น..."
          placeholderTextColor="#999"
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !newComment.trim() && styles.sendButtonDisabled]}
          onPress={handleAddComment}
          disabled={!newComment.trim()}
        >
          <MaterialCommunityIcons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

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
                deletePost(postId);
                console.log(`Deleted post: ${postId}`);
                actionSheetRef.current?.hide();
                navigation.goBack();
              }}
            >
              <Text style={styles.actionSheetText}>ลบโพสต์</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.actionSheetButton}
                onPress={() => {
                  console.log(`Reported post: ${postId}`);
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  appbar: {
    backgroundColor: '#FFF',
  },
  appbarIcon: {
    width: 40,
    height: 40,
    borderRadius: 16,
    marginRight: 8,
  },
  appbarTitle: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 20,
  },
  appbarSubtitle: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 12,
    color: '#606770',
    lineHeight: 16,
    marginTop: 6,
  },
  content: {
    paddingBottom: 100,
  },
  postContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
    minHeight: 100,
    borderBottomWidth: 0.1,
    position: 'relative',
  },
  title: {
    fontFamily: 'NotoSansThai-Bold',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  postContent: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  category: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 12,
    color: '#D84A34',
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  commentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
  },
  commentWrapper: {
    flex: 1,
  },
  commentBubble: {
    backgroundColor: '#EBEDF0',
    borderRadius: 12,
    padding: 10,
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    alignSelf: 'flex-start',
    minWidth: 100,
    maxWidth: '100%',
  },
  commentDisplayName: {
    fontFamily: 'NotoSansThai-Bold',
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  commentContent: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
  },
  commentTime: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    paddingLeft: 8,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  commentInputIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentInput: {
    flex: 1,
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 14,
    color: '#333',
    backgroundColor: '#F0F2F5',
    borderRadius: 20,
    padding: 12,
    paddingTop: 12,
    marginRight: 8,
    maxHeight: 120,
    minHeight: 40,
  },
  sendButton: {
    backgroundColor: '#EFB553',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
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
  errorText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PostDetailScreen;