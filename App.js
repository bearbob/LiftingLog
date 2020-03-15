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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import  {
  ExerciseListScreen,
  DevToolScreen,
  GraphScreen
  } from 'screens';

const Tab = createBottomTabNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Exercises">
        <Tab.Screen
          name="ExerciseList"
          component={ExerciseListScreen}
          options={{
            title: 'Exercises',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#14A76C',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Tab.Screen
          name="DevTools"
          component={DevToolScreen}
          options={{
            title: 'DevTools',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#14A76C',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Tab.Screen
          name="Graphs"
          component={GraphScreen}
          options={{
            title: 'Statistics',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#14A76C',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
