import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from '../src/screens/WelcomeScreen';

export default function Index() {
  return (
    <SafeAreaProvider>
      <WelcomeScreen />
    </SafeAreaProvider>
  );
}