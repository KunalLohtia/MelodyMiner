import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {View, Text} from 'react-native';
import LogOutButton from '../../components/LogOutButton';
import StaticBar from '../../components/StaticBar';
import styles from './styles';

// home screen component mounts, useEffect runs the fetchUserData function
// fetchUserData then fetches current user's data from Firestore
// after user data successfully fetched, setUserName updates userName state var with user display name
// component re-renders with updated userName and displays welcome user name

const Home = () => {
  // use state for holding the user name
  const [userName, setUserName] = useState('');

  // use effect for fetching the user data
  useEffect(() => {
    // set function for fetching user data
    const fetchUserData = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        // get user doc
        const userDoc = await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .get();
        // if user doc exists, get user doc data
        if (userDoc.exists) {
          const userData = userDoc.data();
          // update userName state var with user's display name
          setUserName(userData.displayName);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <View>
      <StaticBar />
      <LogOutButton />
      <Text style={{fontSize: 24, fontWeight: 'bold', color: '#4A2C25'}}>
        Welcome {userName}!
      </Text>
    </View>
  );
};

export default React.memo(Home);
