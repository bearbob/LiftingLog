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
import { Exercises } from 'components/content';
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
      items.push(<Text key={indexOne}>{value.name}</Text>);
      items.push(<PerformanceGraph key={indexTwo} id={value.id} />);
    }
    return items;
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
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
