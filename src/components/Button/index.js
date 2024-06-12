import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const Button = ({onPress, children, type, txt}) => {
  return (
    // if button type prop is blue give the button the blue background
    // otherwise leave it as default brown
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, type === 'blue' ? styles.blueBg : {}]}>
      <Text style={[styles.text, txt === '2' ? styles.text2 : {}]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
