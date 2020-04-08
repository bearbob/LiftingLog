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
import { getLastLogs, formatDate, printLogLine } from 'components/utils';
import { storeObjectInArray, retrieveData } from 'components/storage';

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
          <Text style={styles.sectionDescription} key={"lastLogs"+i}>
            {formatDate(new Date(value.date), true)+": "+value.weight + "kg x" +value.reps}
          </Text>
        );
      }
      return items;
    }
    return (<Text style={styles.sectionDescription}>No recent logs available</Text>);
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" >
          <View>
            <ExerciseDetailsCard text={this.state.name} id={this.state.id} />
            <Text style={styles.title}>Weight progress last weeks</Text>
            <PerformanceGraph id={this.state.id} />
            <View style={styles.maincontainer}>
              <Text style={styles.title}>Last logs</Text>
              {this.renderLastLogs()}
            </View>
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
  maincontainer: {
    borderRadius: 20,
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: Color.backgroundColor,
    backgroundColor: Color.mainBackgroundColor
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    color: Color.buttonBackgroundColor,
  },
});

export default ExerciseDetailsScreen;
