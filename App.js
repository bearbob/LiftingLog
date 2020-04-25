/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ExerciseListHomeScreen,
  ExerciseDetailsScreen,
  ExerciseGraphsScreen
} from 'screens/lifts';
import { createStackNavigator } from '@react-navigation/stack';
import { Color } from 'components/stylesheet';
import  {
  DevToolScreen,
  SettingsScreen,
  GeneralStatisticsScreen
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
      <ExerciseStack.Screen
        name="Exercises"
        component={ExerciseListHomeScreen}
        options={{ title: 'Weight Based Exercises' }}
      />
      <ExerciseStack.Screen name="Details" component={ExerciseDetailsScreen} />
      <ExerciseStack.Screen name="Graphs" component={ExerciseGraphsScreen} />
    </ExerciseStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      initialRouteName="Settings">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="DevTools" component={DevToolScreen} />
    </SettingsStack.Navigator>
  );
}

const StatisticStack = createStackNavigator();

function StatisticStackScreen() {
  return (
    <StatisticStack.Navigator
      initialRouteName="Stats">
      <StatisticStack.Screen name="Stats" component={GeneralStatisticsScreen} />
    </StatisticStack.Navigator>
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
              iconName = 'ios-fitness';
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
            title: 'Lifts'
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatisticStackScreen}
          options={{
            title: 'Stats'
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            title: 'Settings'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
