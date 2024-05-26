import React from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import StaticBar from '../../components/StaticBar';
import LogOutButton from '../../components/LogOutButton';

const Profile = () => {
  return (
    <View>
      <Text>Hi this is profile</Text>
      <LogOutButton />
    </View>
  );
};

export default React.memo(Profile);
