import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 10,
    color: '#000000',
    marginVertical: 12,
    fontSize: 15,
  },
  scrollView: {
    // borderWidth: 2,
    // borderColor: 'blue',
    flexGrow: 3,
    maxHeight: 475,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});

export default styles;
