import React from 'react';
import auth from '@react-native-firebase/auth';
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

const SignUp = ({navigation}) => {
  const [Firstname, onChangeFirstName] = React.useState('');
  const [Lastname, onChangeLastName] = React.useState('');
  const [email, onChangeemail] = React.useState('');
  const [pass, onChangePass] = React.useState('');
  const [confirmPass, onChangeconfirmPass] = React.useState('');

  const onSubmit = () => {
    if (pass !== confirmPass) {
      Alert.alert('Passwords do not match');
      return;
    }
    if (!Firstname || !Lastname) {
      Alert.alert('Please enter first name and last name');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        auth().currentUser.updateProfile({
          displayName: '${Firstname} ${Lastname} ',
        });
      })
      .then(() => {
        navigation.navigate('Home');
      })
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
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeLastName}
            value={Lastname}
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeemail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
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
          />
          <TextInput style={{height: 0.1}} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeconfirmPass}
            value={confirmPass}
            placeholder="Confirm Password"
            secureTextEntry
          />
          <Button onPress={onSubmit}>Create Account</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
