import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appbar: {
    backgroundColor: '#EFB553',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholder: {
    width: 48, // Match the typical width of Appbar.Action (icon + padding)
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  appbarTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'NotoSansThai-Bold',
  },
  notificationList: {
    padding: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: 'NotoSansThai-Bold',
    color: '#333',
    marginVertical: 10,
    marginLeft: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    padding: 15,
    marginBottom: 10,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  unreadNotification: {
    backgroundColor: '#e8f0fe',
  },
  notificationContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    fontFamily: 'NotoSansThai-Regular',
    color: '#333',
  },
  userName: {
    fontFamily: 'NotoSansThai-Bold',
    color: '#D84A34',
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: 'NotoSansThai-Regular',
    color: '#999',
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200, // Ensure enough space for centering
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    fontFamily: 'NotoSansThai-Regular',
  },
});

export default styles;