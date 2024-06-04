import React from 'react';
import {View, Text} from 'react-native';
import StaticBar from '../../components/StaticBar';

const Results = ({route}) => {
  const {results} = route.params;
  //console.log('Reached');
  //console.log(results);
  return (
    <View>
      <StaticBar />
      <Text>Hi this is Results</Text>
    </View>
  );
};

export default React.memo(Results);
