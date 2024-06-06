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
import styles from './styles';
import Recommendation from '../../components/Recomendation';
import Button from '../../components/Button';

const Results = ({route, navigation}) => {
  const {entries, resetFields} = route.params;

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const recs = await getRecs(entries.join(','));
        //console.log('Fetched Recommendations:', recs);
        setRecommendations(recs);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecs();
  }, [entries]);

  const handleLike = id => {};

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
      onLike={handleLike}
    />
  );

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
        <Button
          onPress={() => {
            resetFields;
            navigation.navigate('Input');
          }}>
          New Recommendations
        </Button>
      </View>
    </View>
  );
};

export default React.memo(Results);
