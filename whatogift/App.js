import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TabsNavigator, AccountStack } from './src/navigation';
import React, { useState } from 'react';



export default function App() {

  const [isLogin, setIsLogin] = useState(false);

  return (
    <NavigationContainer>
      {
        isLogin ? (<TabsNavigator />) : (<AccountStack />)
      }
    </NavigationContainer>
  );
}
