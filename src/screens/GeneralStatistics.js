/**
 * Defines the exercise cards with weight and rep tracks
 * This screen is used to give an overview over the exercises
 * that can be tracked.
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import { Theme } from 'components/stylesheet';
import { CalendarGraph } from "components/stats";

class GeneralStatisticsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={Theme.safeArea}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" >
          <View>
            <Text style={Theme.title}>Overall strength score progress last weeks</Text>
            <CalendarGraph />
          </View>
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

export default GeneralStatisticsScreen;
