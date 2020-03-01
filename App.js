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

import ExerciseListScreen from 'screens/ExerciseListScreen.js';
import DevToolScreen from 'screens/DevToolScreen.js';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DevTools">
        <Stack.Screen
          name="ExerciseList"
          component={ExerciseListScreen}
          options={{title: 'Exercise List'}}
        />
        <Stack.Screen
          name="DevTools"
          component={DevToolScreen}
          options={{title: 'Developer Tools'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
