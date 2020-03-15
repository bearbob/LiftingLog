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
import { Color } from 'components/stylesheet'
import  {
  ExerciseListScreen,
  DevToolScreen,
  GraphScreen,
  SettingsScreen
  } from 'screens';

const Tab = createBottomTabNavigator();
const test = "Exercises";

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Exercises"
        tabBarOptions={{
          activeTintColor: Color.active,
          inactiveTintColor: Color.inactive,
          activeBackgroundColor: Color.activeBackgroundColor,
          style: {
            backgroundColor: Color.backgroundColor,
            fontWeight: 'bold'
          }
        }}
      >
        <Tab.Screen
          name="ExerciseList"
          component={ExerciseListScreen}
          options={{
            title: 'Exercises'
          }}
        />
        <Tab.Screen
          name="Graphs"
          component={GraphScreen}
          options={{
            title: 'Statistics'
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings'
          }}
        />
        <Tab.Screen
          name="DevTools"
          component={DevToolScreen}
          options={{
            title: 'DevTools'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
