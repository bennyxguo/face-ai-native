import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';

const Card = ({ children }) => {
  return (
    <View style={tailwind('flex flex-row bg-purple-500 bg-opacity-10 rounded-xl p-6 mb-3')}>
      {children}
    </View>
  );
};

export default Card;
