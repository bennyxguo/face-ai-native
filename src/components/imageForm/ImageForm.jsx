import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import tailwind from 'tailwind-rn';
import Card from '../common/Card';
import InfoSvg from '../svg/InfoSvg';

const ImageForm = ({ imageUrl, onInputChange, onSubmit, onFocusInput, onFocusOut }) => {
  return (
    <Card>
      <View style={tailwind('flex flex-col w-full')}>
        <Text style={tailwind('flex text-purple-300')}>
          <InfoSvg />
          <Text>Face AI will detect faces in your picture. Give it a try.</Text>
        </Text>
        <View style={tailwind('mt-6')}>
          <Text style={tailwind('text-sm font-bold text-gray-600 tracking-wide')}>Image URL</Text>
          <TextInput
            style={tailwind(
              'bg-transparent w-full text-lg text-white py-2 border-b border-gray-700'
            )}
            placeholder="Input image URL"
            placeholderTextColor="#9CA3AF"
            value={imageUrl}
            onChangeText={onInputChange}
            onFocus={onFocusInput}
            onBlur={onFocusOut}
            clearButtonMode="always"
          />
        </View>
        <TouchableOpacity
          onPress={onSubmit}
          style={tailwind(
            'mt-10 bg-purple-500 text-gray-100 p-4 w-full rounded-2xl flex justify-center items-center'
          )}
        >
          <Text style={tailwind('text-lg tracking-wide font-semibold text-gray-100')}>Detect</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default ImageForm;
