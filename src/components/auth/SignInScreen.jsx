import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { tailwind } from '../../utils/tailwind';
import { useDispatch } from 'react-redux';
import { signinUser, signToken } from './userSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmitSignIn = async () => {
    const response = await dispatch(signinUser({ email, password })).unwrap();
    dispatch(signToken(response.token));
  };

  return (
    <View style={tailwind('w-full')}>
      <View style={tailwind('mt-12')}>
        <Text style={tailwind('text-sm font-bold text-gray-600 tracking-wide')}>Email Address</Text>
        <TextInput
          style={tailwind('bg-transparent w-full text-lg text-white py-2 border-b border-gray-700')}
          placeholderTextColor="#9CA3AF"
          placeholder="Enter your email address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={tailwind('mt-12')}>
        <Text style={tailwind('text-sm font-bold text-gray-600 tracking-wide')}>Password</Text>
        <TextInput
          style={tailwind('bg-transparent w-full text-lg text-white py-2 border-b border-gray-700')}
          placeholder="Enter your email password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        onPress={onSubmitSignIn}
        style={tailwind(
          'mt-12 bg-purple-500 text-gray-100 p-4 w-full rounded-2xl flex justify-center items-center'
        )}
      >
        <Text style={tailwind('text-lg tracking-wide font-semibold text-gray-100')}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
