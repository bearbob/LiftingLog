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
import { Color } from 'components/stylesheet';
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
      items.push(<Text style={styles.title} key={indexOne}>{value.name}</Text>);
      items.push(<PerformanceGraph key={indexTwo} id={value.id} />);
    }
    return items;
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          {this.renderExercises()}
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Color.headerColor
  },
});

export default GraphScreen;
