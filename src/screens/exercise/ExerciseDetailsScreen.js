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
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';

import { Exercises } from 'components/content';
import { Color } from 'components/stylesheet';
import { ExerciseDetailsCard } from 'components/exercise';
import PerformanceGraph from "components/stats";

class ExerciseDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.value.id,
      name: this.props.route.params.value.name,
    };
    this.props.navigation.setOptions({ title: this.state.name })
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" >
          <View style={styles.body}>
            <ExerciseDetailsCard text={this.state.name} id={this.state.id} />
            <Text style={styles.title}>Weight progress last weeks</Text>
            <PerformanceGraph id={this.state.id} />
          </View>
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

export default ExerciseDetailsScreen;
