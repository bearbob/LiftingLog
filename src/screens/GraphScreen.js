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
  StyleSheet,
  StatusBar
} from 'react-native';
import { Exercises } from 'components/content';
import { Theme } from 'components/stylesheet';
import PerformanceGraph from "components/stats";

class GraphScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  renderExercises() {
    var items = [];
    for (const [index, value] of Exercises.entries()) {
      let indexOne = index+"-"+1;
      let indexTwo = index+"-"+2;
      items.push(<Text style={Theme.title} key={indexOne}>{value.name}</Text>);
      items.push(<PerformanceGraph key={indexTwo} id={value.id} />);
    }
    return items;
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={Theme.safeArea}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          {this.renderExercises()}
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

export default GraphScreen;
