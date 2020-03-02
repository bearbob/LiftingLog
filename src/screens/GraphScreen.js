'use strict';
/**
 * Defines the exercise cards with weight and rep tracks
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class GraphScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">

          
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

export default GraphScreen;
