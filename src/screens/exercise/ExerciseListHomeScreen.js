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
import { Theme } from 'components/stylesheet';
import { ExerciseCard } from 'components/exercise';


class ExerciseListHomeScreen extends React.Component {
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
      items.push(<ExerciseCard key={this.state.keyPrefix+index} text={value.name} id={value.id} onTouch={() => { this.props.navigation.navigate('Details', {value: value}) }}/>);
    }
    return items;
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={Theme.safeArea}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" >
          <View>
            {this.renderExercises()}
          </View>
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

export default ExerciseListHomeScreen;
