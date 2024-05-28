import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {View, Alert} from 'react-native';
import {WEB_CLIENT_ID} from '@env';

// use google sign in and access web client id
GoogleSignin.configure({
  //WEB_CLIENT_ID,
  webClientId: `${WEB_CLIENT_ID}`,
});

async function onGoogleButtonPress() {
  try {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    Alert.alert('Success login');

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);

    // Retrieve user's UID, display name, and email from userCredential object
    const {uid, displayName, email} = userCredential.user;

    // Store user to firestore
    await firestore().collection('users').doc(uid).set({
      displayName: displayName,
      email: email,
    });

    console.log(idToken);

    console.log('Signed in with Google!');
  } catch (error) {
    console.error('Error signing in with Google:', error);
    Alert.alert('Error', 'Failed to sign in with Google.');
  }
}

function GoogleButton() {
  return (
    <View>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
      />
    </View>
  );
}

export default GoogleButton;
