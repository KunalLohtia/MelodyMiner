import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const Button = ({onPress, children, type}) => {
  return (
    // if button type prop is blue give the button the blue background
    // otherwise leave it as default brown
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, type === 'blue' ? styles.blueBg : {}]}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
