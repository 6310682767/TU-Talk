import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  userId: string;
  studentId: string;
  name: string;
  faculty: string;
  department: string;
  email: string;
  campus: string;
  displayName: string;
  avatar: string | { uri: string } | number; // Supports URI, { uri }, or require()
}

interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  logout: () => void;
  updateDisplayName: (newDisplayName: string) => void;
  updateAvatar: (newAvatar: string | { uri: string } | number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultUserProfile: UserProfile = {
  userId: '12345678',
  studentId: '12345678',
  name: 'ชื่อ นามสกุล',
  faculty: '',
  department: '',
  email: 'user@example.com',
  campus: '',
  displayName: 'ชื่อแสดง',
  avatar: require('../assets/images/Generic avatar.png'),
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(defaultUserProfile);

  const logout = () => {
    setUserProfile(null);
  };

  const updateDisplayName = (newDisplayName: string) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, displayName: newDisplayName });
      console.log('Updated displayName:', newDisplayName);
    }
  };

  const updateAvatar = (newAvatar: string | { uri: string } | number) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, avatar: newAvatar });
      console.log('Updated avatar:', newAvatar);
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, logout, updateDisplayName, updateAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};