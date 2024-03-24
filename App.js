import 'react-native-gesture-handler';
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { BottomTabNavigator } from './src/presentation/navigator/BottomTabNavigator'
import { PaperProvider } from 'react-native-paper';
import { StackNavigator } from './src/presentation/navigator/StackNavigator';
import { AuthProvider } from './src/presentation/providers/AuthProvider';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </PaperProvider>
    </NavigationContainer>
  )
}
