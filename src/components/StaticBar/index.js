import React from 'react';
import auth from '@react-native-firebase/auth';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import LogOutButton from '../LogOutButton';

// stack navigator
const Stack = createStackNavigator();

const StaticBar = ({isProfilePage = false}) => {
  // navigation functions on static bar
  const navigation = useNavigation();

  const handleTitlePress = () => {
    console.log('got here');
    navigation.navigate('Home');
  };

  const handleProfilePress = () => {
    console.log('got here');
    navigation.navigate('Profile');
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <SafeAreaView>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleTitlePress}>
            <Text style={styles.title}>Melody Miner</Text>
          </TouchableOpacity>
          {isProfilePage ? (
            <TouchableOpacity onPress={logout}>
              <Image
                source={require('../../assets/logout.png')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          ) : (
            //<LogOutButton />
            <TouchableOpacity onPress={handleProfilePress}>
              <Image
                source={require('../../assets/user.png')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(StaticBar);
