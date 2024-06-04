import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import StaticBar from '../../components/StaticBar';
import TrackInput from '../../components/TrackInput';
import Button from '../../components/Button';
import {searchTracks} from '../../Spotify/SpotifyAPI';
import styles from './styles';

const Input = ({navigation}) => {
  // use state to manage the input rows
  // have row be an array of TrackInput objects
  // give each TrackInput props of id starting with 1, track name, and artist name
  // default state is the array containing one TrackInput object with an id of 1
  const [rows, setRows] = useState([{id: 1, trackName: '', artistName: ''}]);

  // adds new blank row to the rows array state var with updated id
  // limit user to just 10 tracks and give an alert if limit is reached
  const addRow = () => {
    if (rows.length < 10) {
      setRows([...rows, {id: rows.length + 1, trackName: '', artistName: ''}]);
    } else {
      Alert.alert('Limit Reached', 'You can only add up to 10 tracks.');
    }
  };

  //removes most recent row from the rows array state var
  const removeRow = () => {
    if (rows.length > 1) {
      // pops last element from array
      rows.pop();
      // Update state with modified array
      setRows([...rows]);
    } else {
      Alert.alert('Error', "You can't remove anymore tracks.");
    }
  };

  // Function to handle text input changes for each row
  const onInputChange = (id, field, value) => {
    // Update the curr row state with an array containing the new input values
    // map each elem of new array from og array by checking
    // if id of curr row array matches id passed in
    // if true, create a new array object that is a copy of row
    // and update given property of that row via field
    // example: field is trackName and value is 'Yellow Submarine' from old value 'Strawberry Fields Forever'
    // if false, return og row unchanged
    setRows(rows.map(row => (row.id === id ? {...row, [field]: value} : row)));
  };

  // async function for handling
  const onSubmit = async () => {
    try {
      // use filter to create new array with only items that have
      // trackname and artistname filled (or true)
      // set each row's track and artist name as an elem of a new array
      // each elem is in the format "track: trackname artist: artistname"
      const queries = rows
        .filter(row => row.trackName && row.artistName)
        .map(row => `track:${row.trackName} artist:${row.artistName}`);

      const allEntries = [];

      for (const query of queries) {
        // get JSON object of result by calling searchTracks function

        const result = await searchTracks(query);

        //console.log('printing result');
        //console.log(result);

        // get track data (first and only item in JSON object result)
        const data = result[0];

        // if data exists and has items for us to parse

        // get first item from tracks

        //const artistName = data.artists[0].name;
        //const trackName = data.name;

        const trackID = data.id;

        //console.log(`this is artist name ${artistName}`);
        //console.log(`this is track name ${trackName}`);

        console.log(`this is track id ${trackID}`);

        // push trackID into allEntries array
        allEntries.push(trackID);
      }

      // navigate to results page with allEntries as a route param
      navigation.navigate('Results', {entries: allEntries});
    } catch (error) {
      // error if user can't get to results page

      Alert.alert('Error', 'Unable to fetch track recommendations.');
    }
  };

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
          Let's Get Started!
        </Text>
      </View>

      <Text
        style={{
          fontSize: 19,
          color: '#25434A',
          textAlign: 'center',
          marginBottom: 25,
        }}>
        Enter Track Names and Artist Names
      </Text>
      <View
        style={{
          flex: 0,
        }}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {rows.map(row => (
            // map over rows state array to render trackinput component
            // and set trackNum prop to be row id to represent which track user is on

            // set event handlers onTrackNameChange and onArtistNameChange to be functions that
            // take in value and return onInputChange with its updated respective field
            <TrackInput
              key={row.id}
              trackNum={row.id}
              onTrackNameChange={value =>
                onInputChange(row.id, 'trackName', value)
              }
              onArtistNameChange={value =>
                onInputChange(row.id, 'artistName', value)
              }
            />
          ))}
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View style={{flex: 1, marginRight: 10}}>
          <Button onPress={addRow}>Add Track</Button>
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Button onPress={removeRow} type={'blue'}>
            Remove Track
          </Button>
        </View>
      </View>

      <View style={{paddingHorizontal: 20}}>
        <Button
          onPress={onSubmit} /*onPress={() => navigation.navigate('Results')}*/
        >
          Get Recommendations
        </Button>
      </View>
    </View>
  );
};

export default React.memo(Input);
