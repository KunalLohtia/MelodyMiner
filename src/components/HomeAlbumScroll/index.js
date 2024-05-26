import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import styles from './styles';

// component takes in array of images found in home screen
const HomeAlbumScroll = ({imagesArray}) => {
  // use state for index of array
  const [currentIndex, setCurrentIndex] = useState(0);

  // render item function, takes in each image from array to render component
  const renderItem = ({item}) => (
    // image component uses image source property to displau the image from item
    <Image source={item.imageSource} style={styles.image} />
  );

  return (
    <View style={styles.scrollContainer}>
      <FlatList
        // data prop takes in image array
        data={imagesArray}
        // use render item prop to specify component to render for each item
        renderItem={renderItem}
        // retireve unique key for each item
        keyExtractor={item => item.id}
        // scrollable horizontally
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default React.memo(HomeAlbumScroll);
