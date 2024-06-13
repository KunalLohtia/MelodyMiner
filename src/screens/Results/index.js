import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import StaticBar from '../../components/StaticBar';
import {getRecs} from '../../Spotify/SpotifyAPI';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import Recommendation from '../../components/Recomendation';
import Button from '../../components/Button';

const Results = ({route, navigation}) => {
  // array of track ids from input page
  const {entries} = route.params;

  // state vars recommendations and loading spinner
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const saveSongToUser = async (trackID, remove = false) => {
    try {
      // get curr user
      const currUser = auth().currentUser;
      // get curr user doct
      const userDoc = firestore().collection('users').doc(currUser.uid);
      console.log(`Saving track ID: ${trackID} for user: ${currUser.uid}`);

      // if the heart is tapped to show the unfilled image
      // remove the trackID from the users saved songs when remove param to true
      if (remove) {
        console.log(`Removing track ID: ${trackID}`);
        await userDoc.update({
          savedSongs: firestore.FieldValue.arrayRemove(trackID),
        });
        // otherwise, if remove param is false, add trackid to firestore array
      } else {
        console.log(`Adding track ID: ${trackID}`);
        await userDoc.update({
          savedSongs: firestore.FieldValue.arrayUnion(trackID),
        });
      }
    } catch (error) {
      console.error('Error updating saved songs: ', error);
    }
  };

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        // call get recs function from spotify api, and feed it array of trackids
        const recs = await getRecs(entries.join(','));

        //console.log('Fetched Recommendations:', recs);

        // set recommendation state w/ fetched recs
        setRecommendations(recs);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        // sets loading state to false after fetching is complete
        setLoading(false);
      }
    };

    // calls fetchRecs function when  component mounts or entries change

    fetchRecs();
  }, [entries]);

  // handlelike onpress function
  const handleLike = async (trackID, remove) => {
    console.log(`Track ID: ${trackID}, Remove: ${remove}`);
    await saveSongToUser(trackID, remove);
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
      onLike={(id, remove) => handleLike(id, remove)}
    />
  );

  // if loading state is true, display loading spinner
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <StaticBar />

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
          Your Recs
        </Text>
      </View>

      <FlatList
        data={recommendations}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        //contentContainerStyle={{padding: 20}}
        style={{flexGrow: 3, maxHeight: 520}}
      />
      <View style={{paddingHorizontal: 20}}>
        <Button>New Recommendations</Button>
      </View>
    </View>
  );
};

export default React.memo(Results);
