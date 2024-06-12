import React from 'react';
import auth from '@react-native-firebase/auth';
import {View, Image, Text, SafeAreaView, Alert, TextInput} from 'react-native';
import Button from '../Button';

// logout function using sign out method
const logout = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};

const LogOutButton = () => {
  return (
    <View>
      <Button onPress={logout} type={'blue'} txt={'2'}>
        Log Out
      </Button>
    </View>
  );
};

export default React.memo(LogOutButton);
