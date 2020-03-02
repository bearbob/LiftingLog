/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler'; //make sure it's at the top and there's nothing else before it
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ExerciseListScreen from 'screens/ExerciseListScreen';
import DevToolScreen from 'screens/DevToolScreen';
import GraphScreen from 'screens/GraphScreen';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DevTools">
        <Stack.Screen
          name="ExerciseList"
          component={ExerciseListScreen}
          options={{
            title: 'Exercise List',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#14A76C',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="DevTools"
          component={DevToolScreen}
          options={{
            title: 'Developer Tools',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#14A76C',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="Graphs"
          component={GraphScreen}
          options={{
            title: 'Data visualization',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#14A76C',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
