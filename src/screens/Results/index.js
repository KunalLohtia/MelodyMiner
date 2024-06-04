import React from 'react';
import {View, Text} from 'react-native';
import StaticBar from '../../components/StaticBar';

const Results = ({route}) => {
  // get entries array from input page
  const {entries} = route.params;
  console.log('Reached');
  console.log(entries);

  return (
    <View>
      <StaticBar />
      <Text>Hi this is Results</Text>
    </View>
  );
};

export default React.memo(Results);
