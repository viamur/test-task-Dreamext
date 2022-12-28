/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import NetInfo from "@react-native-community/netinfo";
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  const [netInfo, setNetInfo] = useState(true);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state.isConnected)
    });

    // Unsubscribe
    return () => {
      unsubscribe();
    }
  }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: !netInfo, headerTitleAlign: 'center', title: 'Відсутнє інтернет з’яднання', headerStyle: { backgroundColor: '#ff8080' } }} />
        <Stack.Screen name="Home" component={HomeScreen} options={({ navigation, route }) => ({
          headerRight: props => (
            netInfo && <Button title='logOut' color='#3EB489' onPress={() => { navigation.navigate('Login') }} />
          ),
          headerStyle: {
            backgroundColor: !netInfo ? '#ff8080' : null,
          },
          title: netInfo ? 'Home' : 'Відсутнє інтернет з’яднання',
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
