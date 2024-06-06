import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

import styles from './styles';

const Recommendation = ({
  trackName,
  trackURL,
  artistName,
  artistURL,
  albumName,
  albumURL,
  previewURL,
  img,
  id,
  onLike,
}) => {
  const onLinkPress = url => {
    Linking.openURL(url);
  };

  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
    onLike(id);
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={{uri: img}} style={styles.image} />
        <View
          style={{
            marginHorizontal: 5,
            flex: 1,
            paddingLeft: 4,
          }}>
          <Text style={styles.txt1}>
            Track:{' '}
            <Text style={styles.txt2} onPress={() => onLinkPress(trackURL)}>
              {trackName}
            </Text>
          </Text>
          <Text style={styles.txt1} onPress={() => onLinkPress(artistURL)}>
            Artist: <Text style={styles.txt2}>{artistName}</Text>
          </Text>
          <Text style={styles.txt1} onPress={() => onLinkPress(albumURL)}>
            Album: <Text style={styles.txt2}>{albumName}</Text>
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 6,
            right: 1.5,
            paddingRight: 7,
          }}>
          <TouchableOpacity onPress={handleLike}>
            <Image
              source={
                like
                  ? require('../../assets/Heart-Filled.png')
                  : require('../../assets/Heart-Not-Filled.png')
              }
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Recommendation;
