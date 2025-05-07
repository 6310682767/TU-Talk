export type RootStackParamList = {
    Login: undefined;
    CampusSelect: undefined;
    SetDisplayName: { campus: string }; 
    MainApp: undefined;
    AvatarFullScreen: { uri?: string; userId?: string; isOwnProfile?: boolean };
    SettingsScreen: undefined;
    CreatePostScreen: undefined; 
    PostDetailScreen: { postId: string; campus: string };
    MockFeed: undefined;
    UserProfileScreen: { userId: string };
    ProfileScreen: undefined;
    SearchScreen: undefined;
    LoginScreen: undefined;
    StarredUsersScreen: undefined;
  };
  

export type RootDrawerParamList = {
    Feed: undefined;
};
