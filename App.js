import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { theme } from "./src/infrastructure/theme/index";
import { AuthContextProvider } from './src/services/authentication/authentication.context';

// COMPONENTS

import { Navigation } from './src/infrastructure/navigations';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
      <AuthContextProvider>
      <Navigation />
      <StatusBar style="auto" />
      </AuthContextProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}

