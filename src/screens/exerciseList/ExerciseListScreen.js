/**
 * Defines the exercise cards with weight and rep tracks
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
  StatusBar,
} from 'react-native';

import ExerciseCard from 'components/exercise/card.js';

class ExerciseListScreen extends React.Component {

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}

          <View style={styles.body}>
            <ExerciseCard text="Bench Press"
              id="benchpress"
            />
            <ExerciseCard text="Pullup"
              id="pullup"
            />
            <ExerciseCard text="Bent Over Row"
              id="bentoverrow"
            />
            <ExerciseCard text="Military Press"
              id="military"
            />
            <ExerciseCard text="Squat"
              id="squat"
            />
            <ExerciseCard text="Deadlift"
              id="deadlift"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#14A00C',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#000000',
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