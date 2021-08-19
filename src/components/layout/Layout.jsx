import React from 'react';
import { ScrollView, View } from 'react-native';
import { tailwind } from '../../utils/tailwind';

const Layout = ({ children }) => {
  return (
    <ScrollView keyboardDismissMode="interactive">
      <View
        style={tailwind(
          'h-full w-full flex flex-1 pt-36 pb-20 px-6 text-purple-500 bg-dark-primary'
        )}
      >
        {children}
      </View>
    </ScrollView>
  );
};

export default Layout;
