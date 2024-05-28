import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {View, Image, Text, SafeAreaView, Alert, TextInput} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import GoogleButton from '../../components/GoogleButton';

const SignIn = ({navigation}) => {
  // use states for setting email and password
  const [email, onChangeemail] = React.useState('');
  const [pass, onChangePass] = React.useState('');

  const onSubmit = () => {
    // use auth sign in method
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        console.log('User signed in!');
      })
      // errors if email is invalid or in use
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        } else {
          Alert.alert(error.message);
        }
      });
  };

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 24}}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          paddingVertical: 24,
          textAlign: 'center',
          color: '#4A2C25',
        }}>
        Welcome back!
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeemail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#707070"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePass}
        value={pass}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#707070"
      />
      <Button onPress={onSubmit}>Login</Button>
      <GoogleButton />
    </SafeAreaView>
  );
};

export default React.memo(SignIn);
