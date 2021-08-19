import React from 'react';
import { Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import Card from './Card';
import EntriesSVG from '../svg/EntriesSvg';

const Rank = ({ entries }) => {
  return (
    <Card>
      <View
        style={tailwind('flex bg-purple-800 p-2 rounded-lg w-16 h-16 justify-center items-center')}
      >
        <EntriesSVG />
      </View>
      <View style={tailwind('flex flex-col flex-1 pl-6 justify-center')}>
        <Text style={tailwind('text-2xl text-purple-500')}>{entries}</Text>
        <Text style={tailwind('text-gray-500')}>Your current entry count</Text>
      </View>
    </Card>
  );
};

export default Rank;
