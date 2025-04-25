import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 50,
    color: '#333',
    marginBottom: 20,
    fontFamily: 'NotoSansThai-Regular',
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 32,
    backgroundColor: '#EBEDF0',
    fontSize: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    textAlign: 'center',
    textAlignVertical: 'center', 
    fontFamily: 'NotoSansThai-Regular', 
  },
  button: {
    width: '30%',
    padding: 10,
    borderRadius: 32,
    backgroundColor: '#FEBD3F',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'NotoSansThai-Regular', 
  },
});
