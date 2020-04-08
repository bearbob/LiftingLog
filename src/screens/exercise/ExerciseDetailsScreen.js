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
import { ExerciseDetailsCard, ExerciseInput } from 'components/exercise';
import PerformanceGraph from "components/stats";
import { getLastLogs, formatDate, printLogLine } from 'components/utils';
import { retrieveData } from 'components/storage';

class ExerciseDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.value.id,
      name: this.props.route.params.value.name,
    };
    this.props.navigation.setOptions({ title: this.state.name });
    this.refresh = this.refresh.bind(this);
    retrieveData(this.state.id, this.refresh);
  }

  /**
   * @private
   * After the data has been loaded from the storage, update the state
   */
  refresh(value) {
    let last = null;
    if (value !== null) {
        let item = JSON.parse(value);
        last = getLastLogs(item, 8);
    }
    this.setState({
      lastLogs: last
    });
  }

  renderLastLogs() {
    if(this.state.lastLogs) {
      var items = [];
      for (let i=0; i < this.state.lastLogs.length; i++) {
        let value = this.state.lastLogs[i];
        items.push(
          <Text style={Theme.sectionDescription} key={"lastLogs"+i}>
            {formatDate(new Date(value.date), true)+": "+value.weight + "kg x" +value.reps}
          </Text>
        );
      }
      return items;
    }
    return (<Text style={Theme.sectionDescription}>No recent logs available</Text>);
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={Theme.safeArea}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" >
          <View>
            <ExerciseDetailsCard text={this.state.name} id={this.state.id} />
            <View style={Theme.maincontainer}>
              <Text style={Theme.title}>Add new entry</Text>
              <ExerciseInput />
            </View>
            <View style={Theme.maincontainer}>
              <Text style={Theme.title}>Last logs</Text>
              {this.renderLastLogs()}
            </View>
            <TouchableOpacity style={Theme.button}
             onPress={() => { this.props.navigation.navigate('Graphs', {id: this.state.id, name: this.state.name}) }}
             >
              <Text style={Theme.buttonText}>Show Graphs</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

export default ExerciseDetailsScreen;
