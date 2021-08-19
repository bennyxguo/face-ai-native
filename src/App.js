import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from './app/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { fetchToken, selectToken } from './components/auth/userSlice';

import withLayout from './components/hoc/withLayout';
import LogoTitle from './components/layout/LogoTitle';
import HomeScreen from './components/home-screen/HomeScreen';
import SignInScreen from './components/auth/SignInScreen';
import { View, Text, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const Main = () => {
  let authToken;
  const dispatch = useDispatch();
  const authTokenState = useSelector(selectToken);
  authToken = authTokenState;

  // Fetch the stored token locally.
  const fetchStoredToken = async () => {
    authToken = await dispatch(fetchToken()).unwrap();
  };
  if (!authToken) fetchStoredToken();

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerLargeTitle: true,
            headerStyle: { backgroundColor: '#9e61f4' },
            headerBackTitleVisible: false,
            headerTransparent: true,
            headerBlurEffect: 'systemMaterialDark',
            headerTitle: (props) => <LogoTitle {...props} />
          }}
        >
          {authToken == null ? (
            <Stack.Screen
              name="SignIn"
              component={withLayout(SignInScreen)}
              options={{
                title: 'Sign in'
              }}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={withLayout(HomeScreen)}
              options={{
                title: 'Detect faces'
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // Set content's vertical alignment.
    justifyContent: 'center',
    // Set content's horizontal alignment.
    alignItems: 'center',
    // Set hex color code here.
    backgroundColor: '#1a1a1a'
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
