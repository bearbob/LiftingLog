/**
 * Defines the exercise cards with weight and rep tracks
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ExerciseInput from './card-input';
import { getBestLog, getLastLog, formatDate } from 'components/logger/utils';

class ExerciseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.text,
      id: this.props.id,
      showInput: false
    };
    this.updateStats = this.updateStats.bind(this);
    this._retrieveData();
  }

  // fetch the data back asyncronously
  async _retrieveData() {
      try {
          const value = await AsyncStorage.getItem(this.state.id);
          if (value !== null) {
              let item = JSON.parse(value);
              // Our data is fetched successfully
              let best = getBestLog(item);
              let last = getLastLog(item);
              this.setState({
                bestWeight: best.weight,
                bestReps: best.reps,
                bestDate: new Date(best.date)
              });
              this.setState({
                lastWeight: last.weight,
                lastReps: last.reps,
                lastDate: new Date(last.date)
              });
          }
      } catch (error) {
          // Error retrieving data
          console.log(error.message);
      }
  }

  // create a function that saves your data asyncronously
  async _storeData(logItem) {
      try {
        var array = [];
        const value = await AsyncStorage.getItem(this.state.id);
        if (value !== null) {
            array = JSON.parse(value);
        }
        array.push(logItem);
        await AsyncStorage.setItem(this.state.id, JSON.stringify(array));
      } catch (error) {
          // Error saving data
          console.log(error.message);
      }
  }

  updateStats (weight, reps, date) {
    if(!weight || !reps || !date) return;
    if(this.state.date < date) {
      //only update last if the date is later
      this.setState({
        lastWeight: weight,
        lastReps: reps,
        lastDate: date
      });
    }
    if((!this.state.bestWeight || !this.state.bestReps) || weight > this.state.bestWeight || (weight >= this.state.bestWeight && reps > this.state.bestReps)) {
      this.setState({
        bestWeight: weight,
        bestReps: reps,
        bestDate: date
      });
    }
    this._storeData({ weight: weight, reps: reps, date: date});
  }


  printLogLine (name, weight, reps, date) {
    if(!weight || !reps) {
      return name+": No data available yet";
    }
    return name+": "+ weight + "kg x" +reps+ " @ " + formatDate(date);
  }

  render() {
    return (
      <View style={cardStyle.maincontainer}>
        <TouchableOpacity onPress={() => this.setState({ showInput:!this.state.showInput })}>
          <Text style={cardStyle.title}>{ this.state.name }</Text>
          <Text style={cardStyle.sectionDescription}>{this.printLogLine("Last", this.state.lastWeight, this.state.lastReps, this.state.lastDate) }</Text>
          <Text style={cardStyle.sectionDescription}>{this.printLogLine("Best", this.state.bestWeight, this.state.bestReps, this.state.bestDate) }</Text>
        </TouchableOpacity>
        {this.state.showInput && (<ExerciseInput updateCallback={this.updateStats}/>)}
      </View>
    );
  }
}

const cardStyle = StyleSheet.create({
  maincontainer: {
    borderRadius: 0,
    padding: 10,
    borderWidth: 1,
    borderColor: '#747474',
    backgroundColor: '#272727'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FDFDFD'
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    color: '#14A76C'
  }
});

export default ExerciseCard;
