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
import ExerciseInput from './card-input.js';

class ExerciseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.text,
      id: this.props.id,
      lastWeight: this.props.lastWeight,
      lastReps: this.props.lastReps,
      lastDate: this.props.lastDate,
      bestWeight: this.props.bestWeight,
      bestReps: this.props.bestReps,
      bestDate: this.props.bestDate,
      showInput: false
    };
    this.updateStats = this.updateStats.bind(this);
  }

  formatDate (date) {
    if(!date) return "none";
    return date.getDate() +"."+date.getMonth()+"."+date.getFullYear();
  }

  updateStats (weight, reps, date) {
    if(!weight || !reps || !date) return;
    this.setState({
      lastWeight: weight,
      lastReps: reps,
      lastDate: date
    });
    if((!this.state.bestWeight || !this.state.bestReps) || weight > this.state.bestWeight || (weight >= this.state.bestWeight && reps > this.state.bestReps)) {
      this.setState({
        bestWeight: weight,
        bestReps: reps,
        bestDate: date
      });
    }
  }

  printLogLine (name, weight, reps, date) {
    if(!weight || !reps) {
      return name+": No data available yet";
    }
    return name+": "+ weight + "kg x" +reps+ " @ " + this.formatDate(date);
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
    borderColor: '#d6d7da',
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    color: '#020202',
    borderColor: '#d6d600' //testcolor to see container width
  }
});

export default ExerciseCard;
