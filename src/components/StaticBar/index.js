import React from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';

// stack navigator
const Stack = createStackNavigator();

const StaticBar = () => {
  // navigation functions on static bar
  const navigation = useNavigation();

  const handleTitlePress = () => {
    navigation.navigate('Home');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleTitlePress}>
            <Text style={styles.title}>Melody Miner</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image
              source={require('../../assets/user.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(StaticBar);
