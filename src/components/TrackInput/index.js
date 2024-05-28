import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import styles from './styles';

const TrackInput = ({trackNum}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track {trackNum}</Text>
      <TextInput style={styles.input} placeholder="Track Name" />
      <TextInput style={styles.input} placeholder="Artist Name" />
    </View>
  );
};

export default React.memo(TrackInput);
