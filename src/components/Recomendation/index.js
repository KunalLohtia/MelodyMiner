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
  isProfilePage,
  onDelete,
  imageStyle,
}) => {
  // open url using linking.openURL
  const onLinkPress = url => {
    Linking.openURL(url);
  };

  // state vars for like
  const [like, setLike] = useState(false);

  // determines whether full heart or open heart displayed to user after clicking

  const handleLike = () => {
    const newLikeStatus = !like;
    setLike(newLikeStatus);
    console.log(`Track ID: ${id}, Like Status: ${newLikeStatus}`);
    onLike(id, !newLikeStatus);
    console.log(`Liking song with ID: ${id}`); // Log the ID
  };

  const handleDelete = () => {
    onDelete(id); // call the onDelete function passed as a prop
  };

  // function to shorten the text in component for easier readability

  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
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
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.txt2}
              onPress={() => onLinkPress(trackURL)}>
              {shortenText(trackName, 17)}
            </Text>
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.txt1}
            onPress={() => onLinkPress(artistURL)}>
            Artist:{' '}
            <Text style={styles.txt2}>{shortenText(artistName, 17)}</Text>
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.txt1}
            onPress={() => onLinkPress(albumURL)}>
            Album:{' '}
            <Text style={styles.txt2}>{shortenText(artistName, 17)}</Text>
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 6,
            right: 1.5,
            paddingRight: 7,
          }}>
          <TouchableOpacity onPress={isProfilePage ? handleDelete : handleLike}>
            <Image
              source={
                isProfilePage
                  ? require('../../assets/bin.png') // if isprofilepage prop set to true
                  : // use the handledelete function to delete the track id and use bin png
                  like
                  ? require('../../assets/Heart-Filled.png')
                  : require('../../assets/Heart-Not-Filled.png')
              }
              style={[styles.img, imageStyle === '2' ? styles.img2 : {}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Recommendation;
