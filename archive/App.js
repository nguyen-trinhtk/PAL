
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroPage from './pages/IntroPage';
import HomePage from './pages/HomePage';
import ColorPage from './pages/ColorPage';
import PhotoPage from './pages/PhotoPage';
import PhotoResultPage from './pages/PhotoResultPage';
import ColorResultPage from './pages/ColorResultPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IntroPage" >
      <Stack.Screen
          name="IntroPage"
          component={IntroPage}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="ColorPage"
          component={ColorPage}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="PhotoPage"
          component={PhotoPage}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="PhotoResultPage"
          component={PhotoResultPage}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="ColorResultPage"
          component={ColorResultPage}
          options={{ headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
