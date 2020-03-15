/**
 * Defines the exercise cards with weight and rep tracks
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar
} from 'react-native';
import PerformanceGraph from "components/stats";

class GraphScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <Text>Sample line graph</Text>
          <PerformanceGraph id="benchpress" />
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

export default GraphScreen;
