import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
  primary: '#EFB553',
  background: '#FFFFFF',
  cardBackground: '#F5F5F5',
  textPrimary: '#333333',
  textSecondary: '#666666',
  disabled: '#CCCCCC',
  white: '#FFFFFF',
  error: '#FF4444',
  accent: '#D84A34',
};

export const SPACING = {
  tiny: 4,
  small: 8,
  medium: 12,
  large: 16,
};

export const FONT_SIZES = {
  title: 16,
  regular: 14,
  small: 12,
  tiny: 10,
};

const feedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  appbar: {
    backgroundColor: COLORS.primary,
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  appbarTitle: {
    fontFamily: 'Righteous-Regular',
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
  postContainer: {
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.disabled,
    marginBottom: SPACING.tiny,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: SPACING.small,
  },
  displayName: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: FONT_SIZES.regular,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  title: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  time: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textSecondary,
    marginBottom: SPACING.small,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.tiny,
  },
  actionText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginLeft: SPACING.tiny,
  },
  emptyText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: FONT_SIZES.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.large,
  },
  postDetailContainer: {
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.medium,
    paddingBottom: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.disabled,
  },
  postDetailContent: {
    backgroundColor: COLORS.background,
  },
  postTitle: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  facultyMajor: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.small,
  },
  content: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: FONT_SIZES.regular,
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  commentContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.small,
    marginHorizontal: SPACING.tiny,
    marginBottom: SPACING.tiny,
    borderRadius: 8,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: SPACING.small,
  },
  commentContentContainer: {
    flex: 1,
  },
  commentUser: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: FONT_SIZES.regular,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.tiny,
  },
  commentContent: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: FONT_SIZES.regular,
    color: COLORS.textPrimary,
  },
  commentTime: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: FONT_SIZES.tiny,
    color: COLORS.textSecondary,
    marginTop: SPACING.tiny,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.small,
    backgroundColor: COLORS.cardBackground,
    borderTopWidth: 1,
    borderTopColor: COLORS.disabled,
  },
  commentInput: {
    flex: 1,
    fontFamily: 'NotoSansThai-Regular',
    fontSize: FONT_SIZES.regular,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: SPACING.tiny,
    marginRight: SPACING.small,
  },
  sendButton: {
    padding: SPACING.tiny,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: FONT_SIZES.regular,
    color: COLORS.error,
  },
  footerSpacer: {
    height: SPACING.large,
  },
});

export default feedStyles;