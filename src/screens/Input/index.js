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
import styles from './styles';

const Input = ({navigation}) => {
  // use state to manage the input rows
  // have row be an array of TrackInput objects
  // give each TrackInput a id starting with 1
  // default state is the array containing one TrackInput object with an id of 1
  const [rows, setRows] = useState([{id: 1}]);

  // adds new row to the rows array state var with updated id
  // limit user to just 10 tracks and give an alert if limit is reached
  const addRow = () => {
    if (rows.length < 10) {
      setRows([...rows, {id: rows.length + 1}]);
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
      Alert.alert('Limit Reached', 'You cannot remove anymore tracks.');
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
            //map over rows state array to render trackinput component
            // and set trackNum prop to be row id to represent which track user is on
            <TrackInput key={row.id} trackNum={row.id} />
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
        <Button onPress={() => navigation.navigate('Results')}>
          Get Recommendations
        </Button>
      </View>
    </View>
  );
};

export default React.memo(Input);
