import { StyleSheet } from 'react-native';

const SettingsStyles = StyleSheet.create({
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
  },
  appbarTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'NotoSansThai-Bold',
  },
  content: {
    padding: 12,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 18,
    fontFamily: 'NotoSansThai-Bold',
    marginBottom: 10,
    marginVertical: 4,
    marginHorizontal: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#F0F2F5',
    borderRadius: 16,
    paddingVertical: 8, 
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6, 
    marginRight: 12,
    minHeight: 56, 
  },
  rowText: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'NotoSansThai-Regular',
    marginLeft: 16,
    color: '#333',
  },
  icon: {
    width: 32,
    height: 32,
    marginLeft: 12, 
  },
  switch: {
    marginLeft: 12, 
  },
  logoutButton: {
    backgroundColor: '#D84A34',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontFamily: 'NotoSansThai-Bold',
    fontSize: 18,
  },
  tick: {
    fontSize: 18,
    fontFamily: 'NotoSansThai-Regular', 
    color: '#999',
    alignSelf: 'center',
  },
});

export default SettingsStyles;