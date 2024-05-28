import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {View, Text, FlatList} from 'react-native';
import LogOutButton from '../../components/LogOutButton';
import StaticBar from '../../components/StaticBar';
import styles from './styles';
import HomeAlbumScroll from '../../components/HomeAlbumScroll';
import Button from '../../components/Button';

// home screen component mounts, useEffect runs the fetchUserData function
// fetchUserData then fetches current user's data from Firestore
// after user data successfully fetched, setUserName updates userName state var with user display name
// component re-renders with updated userName and displays welcome user name

const Home = ({navigation}) => {
  // use state for holding the user name
  const [userName, setUserName] = useState('');

  // use state for changing index for images array
  const [currentIndex, setCurrentIndex] = useState(0);

  // array of potential albums users may be interested in
  const imagesArray = [
    {id: 'Frank Ocean', imageSource: require('../../assets/blond.jpg')},
    {id: 'Sza', imageSource: require('../../assets/sos.jpg')},
    {id: 'Tame Impala', imageSource: require('../../assets/currents.jpg')},
    {
      id: 'Tyler, the Creator',
      imageSource: require('../../assets/flowerboy.jpg'),
    },
    {
      id: 'Your Next Favorite Artist',
      imageSource: require('../../assets/Untitled.png'),
    },
  ];

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

  // Update index every 2.5 seconds to display image id (aka the artist names)
  useEffect(() => {
    const timer = setInterval(() => {
      // change index every five sec to display next id
      // mod with length of images array so that it endlessly loops
      setCurrentIndex(prevIndex => (prevIndex + 1) % imagesArray.length);
    }, 2500);

    // Clear the timer on component unmount
    return () => clearInterval(timer);
  }, [imagesArray.length]);

  return (
    <View>
      <StaticBar />

      <View style={styles.txtcontainer}>
        <Text style={styles.txt}>Welcome</Text>
        <Text style={styles.txt2}>{userName}!</Text>
      </View>

      <View style={styles.enterContainer}>
        <Text style={styles.enter}>
          Enter your favorite songs to discover similar ones!
        </Text>
      </View>

      <HomeAlbumScroll imagesArray={imagesArray} />

      <View style={{marginBottom: 65}}>
        <Text style={styles.idText}>
          Find songs by
          <Text style={styles.artistName}>
            {' '}
            {imagesArray[currentIndex].id}{' '}
          </Text>
        </Text>
      </View>

      <View style={{paddingHorizontal: 46}}>
        <Button onPress={() => navigation.navigate('Input')}>
          Mine Melodies!
        </Button>
      </View>
    </View>
  );
};

export default React.memo(Home);
