import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    color: '#4A2C25',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 3,
    paddingVertical: 10,
  },
  container: {
    backgroundColor: '#f0f0f0',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 5,
    marginLeft: 25,
  },
});

export default styles;
