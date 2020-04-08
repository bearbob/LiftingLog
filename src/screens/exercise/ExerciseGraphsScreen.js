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
import PerformanceGraph from "components/stats";

class ExerciseGraphsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      name: this.props.route.params.name,
    };
    this.props.navigation.setOptions({ title: this.state.name });
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={Theme.safeArea}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" >
          <View>
            <Text style={Theme.title}>Weight progress last weeks</Text>
            <PerformanceGraph id={this.state.id} />
          </View>
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

export default ExerciseGraphsScreen;
