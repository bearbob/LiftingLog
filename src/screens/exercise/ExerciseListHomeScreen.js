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
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';

import { Exercises } from 'components/content';
import { Theme } from 'components/stylesheet';
import { ExerciseCard } from 'components/exercise';
import { dataExists } from 'components/storage';


class ExerciseListHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      keyPrefix: 'a',
    };
    this.alertSettingsIncomplete = this.alertSettingsIncomplete.bind(this);
    dataExists(["birthday", "bodyweight"], this.alertSettingsIncomplete);
  }

  alertSettingsIncomplete(hideAlert) {
    if(!hideAlert) {
      Alert.alert(
        "Settings incomplete",
        "You need to finish the setup before you start logging exercises. Otherwise your scores will be inacurate.",
        [{ text: "Go to Settings", onPress: () => this.props.navigation.navigate('Settings') }],
        { cancelable: false }
      );
    }
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
