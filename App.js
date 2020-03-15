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

var getScreenProperties = ( title ) => {
  return {
    title: title,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#14A76C',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };
}

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Exercises">
        <Tab.Screen
          name="ExerciseList"
          component={ExerciseListScreen}
          options={this.getScreenProperties('Exercises')}
        />
        <Tab.Screen
          name="DevTools"
          component={DevToolScreen}
          options={this.getScreenProperties('DevTools')}
        />
        <Tab.Screen
          name="Graphs"
          component={GraphScreen}
          options={this.getScreenProperties('Statistics')}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
