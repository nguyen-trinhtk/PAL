
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './pages/HomePage';
import ColorPage from './pages/ColorPage';
import PhotoPage from './pages/PhotoPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage" >
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
