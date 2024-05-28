import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import {useState} from 'react';

// sign up page, takes in navigation prop
const SignUp = ({navigation}) => {
  // state vars to update user information accordingly when signing up
  const [Firstname, onChangeFirstName] = React.useState('');
  const [Lastname, onChangeLastName] = React.useState('');
  const [email, onChangeemail] = React.useState('');
  const [pass, onChangePass] = React.useState('');
  const [confirmPass, onChangeconfirmPass] = React.useState('');

  //function for when user creates an account

  const onSubmit = () => {
    // check if password and confirm password match or alert and return
    if (pass !== confirmPass) {
      Alert.alert('Passwords do not match');
      return;
    }
    // makes sure first name and last name is filled or alert and return
    if (!Firstname || !Lastname) {
      Alert.alert('Please enter first name and last name');
      return;
    }
    // create new user with sign up info
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        const currUser = auth().currentUser;
        currUser.updateProfile({
          displayName: '${Firstname} ${Lastname} ',
        });
      })

      .then(() => {
        // store the user's information in Firestore database
        const currUser = auth().currentUser;
        return firestore()
          .collection('users')
          .doc(currUser.uid)
          .set({
            email: currUser.email,
            displayName: `${Firstname} ${Lastname}`,
          });
      })
      // navigates user to home page
      .then(() => {
        navigation.navigate('Home');
      })
      // error handling such as invalid email
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }

        console.error(error);
      });
  };
  // text inputs for users to fill out sign up info
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 24}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              paddingVertical: 24,
              textAlign: 'center',
              color: '#4A2C25',
            }}>
            Join Melody Miner!
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeFirstName}
            value={Firstname}
            placeholder="First Name"
            placeholderTextColor="#707070"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeLastName}
            value={Lastname}
            placeholder="Last Name"
            placeholderTextColor="#707070"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeemail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#707070"
          />
          <TextInput style={{height: 0.1}} />
          <TextInput
            style={styles.input}
            onChangeText={onChangePass}
            value={pass}
            placeholder="Password"
            secureTextEntry
            autoCorrect={false}
            textContentType="none"
            placeholderTextColor="#707070"
          />
          <TextInput style={{height: 0.1}} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeconfirmPass}
            value={confirmPass}
            placeholder="Confirm Password"
            secureTextEntry
            placeholderTextColor="#707070"
          />
          <Button onPress={onSubmit}>Create Account</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
