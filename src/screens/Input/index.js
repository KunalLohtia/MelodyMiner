import React from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import LogOutButton from '../../components/LogOutButton';

const Input = () => {
  return (
    <View>
      <Text>Hi this is Input</Text>
      <LogOutButton />
    </View>
  );
};

export default React.memo(Input);
