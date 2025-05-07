import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from './UserContext';

interface Comment {
  id: string;
  displayName: string;
  userId: string;
  content: string;
  time: string;
  icon: any;
}

interface Post {
  id: string;
  title: string;
  displayName: string;
  userId: string;
  time: string;
  category: string;
  content: string;
  campus: string;
  icon: any;
  comments: Comment[];
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  savedBy: string[];
  targetGroup?: string;
  faculty?: string;
  department?: string;
}

interface User {
  userId: string;
  displayName: string;
  studentId: string;
  name: string;
  faculty: string;
  department: string;
  avatar: string | { uri: string } | number;
}

interface PostContextType {
  posts: Post[];
  users: User[];
  getUserById: (userId: string) => User | undefined;
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  getSavedPostsByUserId: (userId: string) => Post[];
  starredUsers: { [userId: string]: string[] };
  toggleStarUser: (starredUserId: string, byUserId: string) => void;
  getStarredUsers: (userId: string) => User[];
  getStarredPosts: (userId: string, campus?: string, category?: string) => Post[];
  addPost: (post: Post) => void;
  deletePost: (postId: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

const mockUsers: User[] = [
  {
    userId: 'u1',
    displayName: 'แนน TU',
    studentId: '12345678',
    name: 'นางสาวแนน นามสกุล',
    faculty: 'วิศวกรรมศาสตร์',
    department: 'วิศวกรรมคอมพิวเตอร์',
    avatar: require('../assets/images/Generic avatar.png'),
  },
  {
    userId: 'u2',
    displayName: 'บีม',
    studentId: '87654321',
    name: 'นายบีม นามสกุล',
    faculty: 'วิทยาศาสตร์',
    department: 'วิทยาการคอมพิวเตอร์',
    avatar: require('../assets/images/Generic avatar.png'),
  },
  {
    userId: 'u3',
    displayName: 'มิ้นท์',
    studentId: '11223344',
    name: 'นางสาวมิ้นท์ นามสกุล',
    faculty: 'ศิลปศาสตร์',
    department: 'ภาษาอังกฤษ',
    avatar: require('../assets/images/Generic avatar.png'),
  },
  {
    userId: 'u4',
    displayName: 'มิกซ์',
    studentId: '44332211',
    name: 'นายมิกซ์ นามสกุล',
    faculty: 'วิศวกรรมศาสตร์',
    department: 'วิศวกรรมไฟฟ้า',
    avatar: require('../assets/images/Generic avatar.png'),
  },
  {
    userId: 'u5',
    displayName: 'เจน',
    studentId: '55667788',
    name: 'นางสาวเจน นามสกุล',
    faculty: 'บริหารธุรกิจ',
    department: 'การตลาด',
    avatar: require('../assets/images/Generic avatar.png'),
  },
  {
    userId: 'u6',
    displayName: 'โจ',
    studentId: '99887766',
    name: 'นายโจ นามสกุล',
    faculty: 'นิติศาสตร์',
    department: 'กฎหมาย',
    avatar: require('../assets/images/Generic avatar.png'),
  },
];

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'รีวิววิชา TU103 กับ อ.สมชาย',
    displayName: 'แนน TU',
    userId: 'u1',
    time: '2 ชั่วโมงที่แล้ว',
    category: 'รีวิววิชา & อาจารย์',
    content: 'ใครเคยลงวิชา TU103 กับอ.สมชายบ้างคะ ขอรีวิวหน่อยค่ะ',
    campus: 'รังสิต',
    icon: require('../assets/images/Generic avatar.png'),
    comments: [
      {
        id: 'c1',
        displayName: 'มิกซ์',
        userId: 'u4',
        content: 'สนุกมากครับ อ.สอนดี',
        time: '1 ชั่วโมงที่แล้ว',
        icon: require('../assets/images/Generic avatar.png'),
      },
      {
        id: 'c2',
        displayName: 'เจน',
        userId: 'u5',
        content: 'ชอบมากๆ เลยค่ะ สอนสนุกและมีเกมในคลาสด้วย! อาจารย์ให้คำแนะนำดีมาก',
        time: '30 นาทีที่แล้ว',
        icon: require('../assets/images/Generic avatar.png'),
      },
      {
        id: 'c3',
        displayName: 'โจ',
        userId: 'u6',
        content: 'ดี',
        time: '15 นาทีที่แล้ว',
        icon: require('../assets/images/Generic avatar.png'),
      },
    ],
    likes: 5,
    isLiked: false,
    isSaved: false,
    savedBy: [],
  },
  {
    id: '2',
    title: 'หอพักรังสิตราคาไม่แพง',
    displayName: 'บีม',
    userId: 'u2',
    time: '4 ชั่วโมงที่แล้ว',
    category: 'หอพัก',
    content: 'แนะนำหอพักใกล้ม.ราคาไม่เกิน 5000 บาทหน่อยครับ',
    campus: 'รังสิต',
    icon: require('../assets/images/Generic avatar.png'),
    comments: [],
    likes: 3,
    isLiked: false,
    isSaved: false,
    savedBy: [],
  },
  {
    id: '3',
    title: 'งานสัมมนาที่ท่าพระจันทร์',
    displayName: 'มิ้นท์',
    userId: 'u3',
    time: '1 วันที่แล้ว',
    category: 'ข่าวสาร',
    content: 'มีงานสัมมนาวิชการที่ท่าพระจันทร์ สนใจลงชื่อได้เลย!',
    campus: 'ท่าพระจันทร์',
    icon: require('../assets/images/Generic avatar.png'),
    comments: [],
    likes: 10,
    isLiked: false,
    isSaved: false,
    savedBy: [],
  },
  {
    id: 'p1',
    title: 'แนะนำร้านกาแฟใกล้มหาวิทยาลัย',
    displayName: 'แนน TU',
    userId: 'u1',
    time: '2 ชั่วโมงที่แล้ว',
    category: 'ทั่วไป',
    content: 'ร้านนี้บรรยากาศดีมาก ใครอยากได้ที่อ่านหนังสือเงียบๆ แนะนำเลย!',
    campus: 'รังสิต',
    icon: require('../assets/images/Generic avatar.png'),
    comments: [],
    likes: 5,
    isLiked: false,
    isSaved: false,
    savedBy: [],
  },
  {
    id: 'p2',
    title: 'หาคนเรียน TU103 ด้วยกัน',
    displayName: 'บีม',
    userId: 'u2',
    time: '4 ชั่วโมงที่แล้ว',
    category: 'รีวิววิชา & อาจารย์',
    content: 'ใครเรียน TU103 เทอมนี้บ้าง? อยากตั้งกลุ่มติว!',
    campus: 'รังสิต',
    icon: require('../assets/images/Generic avatar.png'),
    comments: [],
    likes: 3,
    isLiked: false,
    isSaved: false,
    savedBy: [],
  },
];

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userProfile, updateAvatar } = useUser();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [starredUsers, setStarredUsers] = useState<{ [userId: string]: string[] }>({});

  useEffect(() => {
    if (userProfile) {
      setUsers((prev) => {
        const existingUser = prev.find((u) => u.userId === userProfile.userId);
        if (existingUser) {
          return prev.map((u) =>
            u.userId === userProfile.userId
              ? {
                  ...u,
                  displayName: userProfile.displayName,
                  studentId: userProfile.studentId,
                  name: userProfile.name,
                  faculty: userProfile.faculty,
                  department: userProfile.department,
                  avatar: userProfile.avatar,
                }
              : u
          );
        }
        return [
          ...prev,
          {
            userId: userProfile.userId,
            displayName: userProfile.displayName,
            studentId: userProfile.studentId,
            name: userProfile.name,
            faculty: userProfile.faculty,
            department: userProfile.department,
            avatar: userProfile.avatar,
          },
        ];
      });

      // Sync avatar to existing posts and comments
      setPosts((prev) =>
        prev.map((post) =>
          post.userId === userProfile.userId
            ? {
                ...post,
                icon: typeof userProfile.avatar === 'string' && userProfile.avatar
                  ? { uri: userProfile.avatar }
                  : userProfile.avatar,
                comments: post.comments.map((comment) =>
                  comment.userId === userProfile.userId
                    ? {
                        ...comment,
                        icon: typeof userProfile.avatar === 'string' && userProfile.avatar
                          ? { uri: userProfile.avatar }
                          : userProfile.avatar,
                      }
                    : comment
                ),
              }
            : post
        )
      );
    }
  }, [userProfile?.avatar, userProfile?.userId]);

  useEffect(() => {
    const loadPersistedState = async () => {
      try {
        const savedState = await AsyncStorage.getItem('postState');
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          console.log('Loaded postState:', parsedState);
          if (parsedState && typeof parsedState === 'object') {
            setPosts((prev) =>
              prev.map((post) => {
                const savedPost = parsedState.posts?.[post.id];
                if (!savedPost) return post;
                return {
                  ...post,
                  isLiked: savedPost.isLiked ?? post.isLiked,
                  savedBy: Array.isArray(savedPost.savedBy) ? savedPost.savedBy : post.savedBy,
                  likes: savedPost.likes ?? post.likes,
                  isSaved: Array.isArray(savedPost.savedBy) ? savedPost.savedBy.length > 0 : post.isSaved,
                };
              })
            );
            if (parsedState.starredUsers && typeof parsedState.starredUsers === 'object') {
              setStarredUsers(parsedState.starredUsers);
              console.log('Loaded starredUsers:', parsedState.starredUsers);
            } else {
              console.warn('Invalid starredUsers in AsyncStorage, using default {}');
              setStarredUsers({});
            }
          } else {
            console.warn('Invalid postState in AsyncStorage, using default state');
          }
        }
      } catch (error) {
        console.error('Error loading post state:', error);
      }
    };
    loadPersistedState();
  }, []);

  const saveState = async () => {
    try {
      const stateToSave = {
        posts: posts.reduce((acc, post) => {
          acc[post.id] = {
            isLiked: post.isLiked,
            savedBy: post.savedBy,
            likes: post.likes,
            isSaved: post.savedBy.length > 0,
          };
          return acc;
        }, {} as Record<string, any>),
        starredUsers,
      };
      console.log('Saving postState:', stateToSave);
      await AsyncStorage.setItem('postState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving post state:', error);
    }
  };

  useEffect(() => {
    saveState();
  }, [posts, starredUsers]);

  const addPost = (post: Post) => {
    setPosts((prev) => {
      const updatedPosts = [post, ...prev];
      return updatedPosts;
    });
  };

  const deletePost = (postId: string) => {
    setPosts((prev) => {
      const updatedPosts = prev.filter((post) => post.id !== postId);
      return updatedPosts;
    });
  };

  const getUserById = (userId: string) => {
    return users.find((user) => user.userId === userId);
  };

  const toggleLike = (postId: string) => {
    setPosts((prev) => {
      const updatedPosts = prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      );
      return updatedPosts;
    });
  };

  const toggleSave = (postId: string, userId: string) => {
    console.log(`Toggling save for post ${postId} by user ${userId}, current savedBy:`, posts.find(p => p.id === postId)?.savedBy);
    setPosts((prev) => {
      const updatedPosts = prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              savedBy: Array.isArray(post.savedBy)
                ? post.savedBy.includes(userId)
                  ? post.savedBy.filter((id) => id !== userId)
                  : [...post.savedBy, userId]
                : [userId],
              isSaved: Array.isArray(post.savedBy)
                ? post.savedBy.includes(userId)
                  ? post.savedBy.length > 1
                  : true
                : true,
            }
          : post
      );
      return updatedPosts;
    });
  };

  const addComment = (postId: string, comment: Comment) => {
    setPosts((prev) => {
      const updatedPosts = prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      );
      return updatedPosts;
    });
  };

  const getSavedPostsByUserId = (userId: string): Post[] => {
    return posts.filter((post) => Array.isArray(post.savedBy) && post.savedBy.includes(userId));
  };

  const toggleStarUser = (starredUserId: string, byUserId: string) => {
    console.log(`Toggling star for user ${starredUserId} by user ${byUserId}`);
    setStarredUsers((prev) => {
      const userStars = prev[byUserId] || [];
      const updatedStars = userStars.includes(starredUserId)
        ? userStars.filter((id) => id !== starredUserId)
        : [...userStars, starredUserId];
      const newStarredUsers = { ...prev, [byUserId]: updatedStars };
      console.log('Updated starredUsers:', newStarredUsers);
      return newStarredUsers;
    });
  };

  const getStarredUsers = (userId: string) => {
    const starredIds = starredUsers[userId] || [];
    console.log(`Getting starred users for ${userId}:`, starredIds);
    return users.filter((user) => starredIds.includes(user.userId));
  };

  const getStarredPosts = (userId: string, campus?: string, category?: string) => {
    const starredIds = starredUsers[userId] || [];
    console.log(`Getting starred posts for ${userId}, starredIds:`, starredIds);
    return posts.filter((post) => {
      const matchesStarred = starredIds.includes(post.userId);
      const matchesCampus = campus ? post.campus === campus : true;
      const matchesCategory = category ? post.category === category : true;
      const isNotOwnPost = post.userId !== userId;
      return matchesStarred && matchesCampus && matchesCategory && isNotOwnPost;
    });
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        users,
        getUserById,
        toggleLike,
        toggleSave,
        addComment,
        getSavedPostsByUserId,
        starredUsers,
        toggleStarUser,
        getStarredUsers,
        getStarredPosts,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};