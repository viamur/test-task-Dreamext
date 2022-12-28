/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Button, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={({ navigation, route }) => ({
          headerRight: props => (
            <Button title='logOut' color='#3EB489' onPress={() => { navigation.navigate('Login') }} />
          ),
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
