import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import StaticBar from '../../components/StaticBar';
import Recommendation from '../../components/Recomendation';
import {getTracks} from '../../Spotify/SpotifyAPI';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Profile = () => {
  // saved songs state for fetching the saved songs from user doc in firestore
  const [savedSongs, setSavedSongs] = useState([]);
  // loading state for loading times while fetching the data
  const [loading, setLoading] = useState(true);
  // saved songs state for fetching the saved songs track info from get tracks spotify endpoint
  const [savedTracksInfo, setSavedTracksInfo] = useState([]);

  useEffect(() => {
    const fetchSavedSongs = async () => {
      try {
        // get the current user
        const currUser = auth().currentUser;

        // fetch the user doc from Firestore
        const userDoc = await firestore()
          .collection('users')
          .doc(currUser.uid)
          .get();

        // if doc exists
        if (userDoc.exists) {
          // get the savedSongs field
          const userData = userDoc.data();
          setSavedSongs(userData.savedSongs || []);
          console.log(savedSongs);
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching saved songs: ', error);
      }
    };

    // fetch saved songs when component mounts
    fetchSavedSongs();
  }, []);

  // use effect for fetching track info for the saved songs
  useEffect(() => {
    const fetchTracks = async () => {
      if (savedSongs.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // get track info via spotify track endpoint
        const songs = await getTracks(savedSongs);
        // set savedtracksinfo state
        setSavedTracksInfo(songs);
      } catch (error) {
        console.error('Error fetching track details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [savedSongs]);

  // render loading spinner while fetching data
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleDelete = async trackId => {
    try {
      // get curr user
      const currUser = auth().currentUser;
      // filter the savedSongs array to not have the trackID
      // and save it as a new array
      const updatedSongs = savedSongs.filter(song => song !== trackId);
      console.log(`this is updated songs: ${updatedSongs}`);
      // set the SavedSongs state to the new array
      setSavedSongs(updatedSongs);

      // update the savedSongs field in the user's doc
      await firestore().collection('users').doc(currUser.uid).update({
        savedSongs: updatedSongs,
      });
    } catch (error) {
      console.error('Error deleting track: ', error);
    }
  };

  // renders recommendation component with following attributes
  const renderItem = ({item}) => (
    // track name
    // artist name
    // album name
    // external url (for spotify button)
    // preview url
    // album / track image
    // item id to save track id to array to render results in the saved songs section of profile

    <Recommendation
      trackName={item.name}
      trackURL={item.external_urls.spotify}
      artistName={item.artists[0].name}
      artistURL={item.artists[0].external_urls.spotify}
      albumName={item.album.name}
      albumURL={item.album.external_urls.spotify}
      previewURL={item.preview_url}
      img={item.album.images[0].url}
      id={item.id}
      isProfilePage={true} // use trash can image
      onDelete={id => handleDelete(id)} // use the delete function
      imageStyle="2"
    />
  );

  return (
    <View>
      <StaticBar isProfilePage={true} />

      <View style={{marginTop: 45}}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            paddingTop: 27,
            paddingBottom: 14,
            textAlign: 'center',
            color: '#4A2C25',
          }}>
          Your Saved Songs
        </Text>
      </View>

      <FlatList
        data={savedTracksInfo}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{flexGrow: 3, maxHeight: 650}}
      />
    </View>
  );
};

export default React.memo(Profile);
