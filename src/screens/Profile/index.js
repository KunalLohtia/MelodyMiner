import React from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import StaticBar from '../../components/StaticBar';

const Profile = () => {
  return (
    <View>
      <StaticBar isProfilePage={true} />

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
          Your Saved Songs
        </Text>
      </View>
    </View>
  );
};

export default React.memo(Profile);
