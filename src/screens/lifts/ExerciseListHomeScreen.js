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
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Exercises} from 'components/content';
import {Theme, Color} from 'components/stylesheet';
import {ExerciseCard} from 'components/exercise';
import {dataExists} from 'components/storage';
import Icon from 'react-native-vector-icons/Ionicons';

class ExerciseListHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      keyPrefix: 'a',
      showInfoBox: false,
    };
    this.alertSettingsIncomplete = this.alertSettingsIncomplete.bind(this);
    dataExists(['birthday', 'bodyweight'], this.alertSettingsIncomplete);
  }

  alertSettingsIncomplete(hideAlert) {
    if (!hideAlert) {
      Alert.alert(
        'Settings incomplete',
        'You need to finish the setup before you start logging exercises.',
        [{text: 'Go to Settings', onPress: () => this.props.navigation.navigate('Settings')}],
        {cancelable: false},
      );
    }
  }

  renderExercises() {
    var items = [];
    for (let [index, value] of Exercises.entries()) {
      items.push(
        <ExerciseCard
          key={this.state.keyPrefix + index}
          text={value.name}
          id={value.id}
          onTouch={() => {
            this.props.navigation.navigate('Details', {value: value});
          }}
        />,
      );
    }
    return items;
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={Theme.safeArea}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View>{this.renderExercises()}</View>
            <TouchableOpacity
              style={Theme.maincontainer}
              onPress={() => this.setState({showInfoBox: !this.state.showInfoBox})}>
              <View style={Theme.rowContainer}>
                <Icon name="ios-information-circle-outline" color={Color.mainFontColor} size={20} />
                <Text style={Theme.sectionDescription}> Tap to show more information</Text>
              </View>
              {this.state.showInfoBox && (
                <View>
                  <Text style={Theme.text}>
                    This list is used to track your strength progress for the main lifts.
                  </Text>
                  <Text style={Theme.text}>
                    The goal is to increase the maximum weight you can lift per exercise. To track
                    your progress, you only record the set with the highest weight and most reps you
                    did.
                  </Text>
                  <Text style={Theme.text}>
                    For example, if you did 2 sets with 100kg and 4 reps and one set with 9 reps and
                    90kg, you track 100kg and 4 reps, even though you lifted more weight in total
                    for the third set.
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default ExerciseListHomeScreen;
