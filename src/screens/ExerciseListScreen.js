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
import ExerciseCard from 'components/exercise';

class ExerciseListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      keyPrefix: 'a'
    };
  }

  renderExercises() {
    var items = [];
    for (const [index, value] of Exercises.entries()) {
      items.push(<ExerciseCard key={this.state.keyPrefix+index} text={value.name} id={value.id} />);
    }
    return items;
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" >
          <View style={styles.body}>
            {this.renderExercises()}
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
  },
});

export default ExerciseListScreen;
