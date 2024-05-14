import React from 'react';
import {View, Text} from 'react-native';
import LogOutButton from '../../components/LogOutButton';
import StaticBar from '../../components/StaticBar';

const Home = ({Firstname, Lastname}) => {
  return (
    <View>
      <StaticBar />
      <Text>User's First Name: {Firstname}</Text>
      <Text>User's Last Name: {Lastname}</Text>
    </View>
  );
};

export default React.memo(Home);
