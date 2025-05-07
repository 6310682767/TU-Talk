import { StyleSheet } from 'react-native';

const theme = {
  colors: {
    primary: '#EFB553',
    text: '#333',
    placeholder: '#999',
    background: '#fff',
    overlay: 'rgba(0,0,0,0.5)',
    accent: '#007AFF',
  },
  spacing: {
    small: 10,
    medium: 16,
    large: 24,
  },
  borderRadius: {
    small: 12,
    medium: 16,
  },
};

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    appbar: {
      backgroundColor: theme.colors.primary,
      elevation: 4,
    },
    appbarTitle: {
      fontFamily: 'NotoSansThai-Bold',
      fontSize: 20,
      color: theme.colors.background,
    },
    sendButton: {
      padding: theme.spacing.medium,
    },
    content: {
      flex: 1,
      padding: theme.spacing.medium,
    },
    selector: {
      backgroundColor: '#F0F2F5',
      borderRadius: theme.borderRadius.small,
      padding: theme.spacing.medium,
      marginBottom: theme.spacing.medium,
    },
    selectorContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectorIcon: {
      marginRight: theme.spacing.small,
    },
    selectorText: {
      fontSize: 16,
      color: theme.colors.text,
      fontFamily: 'NotoSansThai-Regular',
    },
    placeholderText: {
      color: theme.colors.placeholder,
    },
    textInput: {
      backgroundColor: '#f5f5f5',
      borderRadius: theme.borderRadius.small,
      padding: theme.spacing.medium,
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: theme.spacing.medium,
      fontFamily: 'NotoSansThai-Regular',
    },
    contentInput: {
      flex: 1,
      textAlignVertical: 'top',
      minHeight: 150,
    },
    errorText: {
      color: '#D32F2F',
      fontSize: 14,
      marginBottom: theme.spacing.medium,
      fontFamily: 'NotoSansThai-Regular',
    },
    modalOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      width: '80%',
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.medium,
      padding: theme.spacing.medium,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontFamily: 'NotoSansThai-Bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.medium,
      textAlign: 'center'
    },
    modalItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.medium,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    modalItemIcon: {
      marginRight: theme.spacing.small,
    },
    modalItemText: {
      fontSize: 16,
      color: theme.colors.text,
      fontFamily: 'NotoSansThai-Regular',
    },
});
