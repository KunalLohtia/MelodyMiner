import React from 'react';
import auth from '@react-native-firebase/auth';
import {View, Image, Text, SafeAreaView, Alert, TextInput} from 'react-native';

// logout function using sign out method
const logout = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};

const LogOutButton = () => {
  return (
    <Text onPress={logout} style={{margin: 40}}>
      Log out
    </Text>
  );
};

export default React.memo(LogOutButton);
