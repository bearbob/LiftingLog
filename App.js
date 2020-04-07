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
import {
  ExerciseListHomeScreen,
  ExerciseDetailsScreen
} from 'screens/exercise';
import { createStackNavigator } from '@react-navigation/stack';
import { Color } from 'components/stylesheet';
import  {
  ExerciseListScreen,
  DevToolScreen,
  GraphScreen,
  SettingsScreen
  } from 'screens';
  import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MyTheme = {
  dark: true,
  colors: {
    primary: Color.active,
    background: Color.backgroundColor,
    card: Color.mainBackgroundColor,
    text: Color.mainFontColor,
    border: Color.borderColor
  }
};

const ExerciseStack = createStackNavigator();

function ExerciseStackScreen() {
  return (
    <ExerciseStack.Navigator
      initialRouteName="Exercises">
      <ExerciseStack.Screen name="Exercises" component={ExerciseListHomeScreen} />
      <ExerciseStack.Screen name="Details" component={ExerciseDetailsScreen} />
    </ExerciseStack.Navigator>
  );
}

const App: () => React$Node = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        initialRouteName="ExerciseList"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'ios-list-box' : 'ios-list';

            if (route.name === 'ExerciseList') {
              iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
            } else if (route.name === 'Graphs') {
              iconName = 'ios-trending-up';
            } else if (route.name === 'Settings') {
              iconName = 'ios-options';
            } else if (route.name === 'DevTools') {
              iconName = 'ios-bug';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Color.active,
          inactiveTintColor: Color.inactive,
          activeBackgroundColor: Color.activeBackgroundColor,
          style: {
            backgroundColor: Color.backgroundColor,
            fontWeight: 'bold',
          }
        }}
      >
        <Tab.Screen
          name="ExerciseList"
          component={ExerciseStackScreen}
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
