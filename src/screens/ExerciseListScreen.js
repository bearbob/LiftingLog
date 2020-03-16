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
  RefreshControl,
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

  _onRefresh () {
    let newVal = (this.state.keyPrefix == 'a')? 'b' : 'a';
    this.setState({
      keyPrefix: newVal
    });
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
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
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
  scrollView: {
    backgroundColor: Color.backgroundColor,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#e0e0e0'
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#e0e0e0',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default ExerciseListScreen;
