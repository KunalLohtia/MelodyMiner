import React from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';

import styles from './styles';

const Recommendation = ({
  trackName,
  artistName,
  albumName,
  externalURL,
  previewURL,
  img,
  id,
  onLike,
}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={{uri: img}} style={styles.image} />
        <View style={{marginHorizontal: 5, flex: 1}}>
          <Text style={styles.txt1}>
            Track: <Text style={styles.txt2}>{trackName}</Text>
          </Text>
          <Text style={styles.txt1}>
            Artist: <Text style={styles.txt2}>{artistName}</Text>
          </Text>
          <Text style={styles.txt1}>
            Album: <Text style={styles.txt2}>{albumName}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Recommendation;
