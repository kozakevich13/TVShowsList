import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ShearchScreen from './components/ShearchScreen';
import ShowDetailsScreen from './components/ShowDetailsScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Shearch" component={ShearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
