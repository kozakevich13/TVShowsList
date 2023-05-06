import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ShearchScreen from './components/ShearchScreen';
import DetailsScreen from './components/DetailsScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={{
        headerStyle: {
          backgroundColor: '#0a192f', 
        },
        headerTitleStyle: {
          color: '#bbbbbb', 
        },
        headerTintColor: '#ffffff', 
      }}
      >
        <Stack.Screen name="Shearch" component={ShearchScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
