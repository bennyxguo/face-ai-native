import React from 'react';
import { Image, Text } from 'react-native';
import { tailwind } from '../../utils/tailwind';

const LogoTitle = () => {
  return (
    <>
      <Image style={{ width: 25, height: 25 }} source={require('../../assets/logo.png')} />
      <Text style={tailwind('text-xl text-dark-primary pl-2 font-semibold')}>Face AI</Text>
    </>
  );
};

export default LogoTitle;
