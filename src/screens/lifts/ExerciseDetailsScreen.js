/**
 * Defines the exercise cards with weight and rep tracks
 * This screen is used to give an overview over the exercises
 * that can be tracked.
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, ScrollView, View, Text, TouchableOpacity, StatusBar} from 'react-native';
import {Theme, Color} from 'components/stylesheet';
import {ExerciseDetailsCard, ExerciseInput, ExerciseHistoryCard} from 'components/exercise';
import Icon from 'react-native-vector-icons/Ionicons';

class ExerciseDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.value.id,
      name: this.props.route.params.value.name,
    };
    this.props.navigation.setOptions({title: this.state.name});
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={Theme.safeArea}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View>
              <ExerciseDetailsCard text={this.state.name} id={this.state.id} />
              <View style={Theme.maincontainer}>
                <Text style={Theme.title}>Add new entry</Text>
                <ExerciseInput id={this.state.id} />
              </View>
              <ExerciseHistoryCard id={this.state.id} />
              <TouchableOpacity
                style={Theme.iconButton}
                onPress={() => {
                  this.props.navigation.navigate('Graphs', {
                    id: this.state.id,
                    name: this.state.name,
                  });
                }}>
                <Icon name="ios-stats" color={Color.buttonFontColor} size={16} />
                <Text style={Theme.buttonText}> Show Graphs</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default ExerciseDetailsScreen;
