import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';

// welcome screen, takes in navigation prop
// spalsh image with footer containing buttons taking user to
// sign up or log in page
const Welcome = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Image
          style={{width: '100%', flex: 1}}
          source={require('../../assets/splashback.jpg')}
        />
        <View style={styles.footer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Melody Miner</Text>
        <Text style={styles.subtitle}>
          Get started on your song discovery journey!
        </Text>
        <Button onPress={() => navigation.navigate('SignIn')}>Log In</Button>
        <Button onPress={() => navigation.navigate('SignUp')}>Sign Up</Button>
      </View>
    </View>
  );
};

export default Welcome;
