import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    color: '#4A2C25',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  subtitle: {
    fontSize: 15,
    color: '#4A2C25',
    textAlign: 'center',
    marginVertical: 16,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  content: {
    padding: 36,
    paddingTop: 0,
    backgroundColor: '#FFFFFF',
  },
});

export default styles;
