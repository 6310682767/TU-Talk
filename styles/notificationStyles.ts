import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appbar: {
    backgroundColor: '#EFB553',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  appbarCenter: {
    flex: 1,
    alignItems: 'center',
    marginRight: 56, // ชดเชยปุ่ม back
  },
  appbarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationList: {
    padding: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    padding: 15,
    marginBottom: 10,
    borderRadius: 16,
    shadowColor: '#000',
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
    color: '#333',
  },
  userName: {
    fontWeight: 'bold',
    color: '#D84A34',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default styles;
