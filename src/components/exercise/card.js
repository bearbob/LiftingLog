/**
 * Sample React Native App
 * https://github.com/facebook/react-native
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
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

class ExerciseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <View style={cardStyle.maincontainer}>
        <TouchableOpacity onPress={() => this.setState({ showInput:!this.state.showInput })}>
          <Text style={cardStyle.title}>{ this.props.text }</Text>
          <Text style={cardStyle.sectionDescription}>Last: { this.state.lastWeight }kg x{ this.state.lastReps } @ { this.formatDate(this.state.lastDate) }</Text>
          <Text style={cardStyle.sectionDescription}>Best: { this.state.bestWeight }kg x{ this.state.bestReps } @ { this.formatDate(this.state.bestDate) }</Text>
        </TouchableOpacity>
        {this.state.showInput && (<ExerciseInput updateCallback={this.updateStats}/>)}
      </View>
    );
  }
}

class ExerciseInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: null,
      reps: null,
      showDatepicker: false,
      date: new Date() //default date is today
    };
  }

  formatDate (date) {
    if(!date) return "none";
    return date.getDate() +"."+date.getMonth()+"."+date.getFullYear();
  }

  render() {
    return (
      <View style={cardStyle.inputContainer}>
        <TextInput
          style={cardStyle.input}
          keyboardType="numeric"
          onChangeText={(text, eventCount, target) => {
              this.setState({
                weight: text
              });
          }}
        />
        <Text>x</Text>
        <TextInput
          style={cardStyle.input}
          keyboardType="numeric"
          onChangeText={(text, eventCount, target) => {
              this.setState({
                reps: text
              });
          }}
        />
        <Text>@</Text>
        <TouchableOpacity
         style={cardStyle.button}
         onPress={() => this.setState({ showDatepicker:true })}
         >
          <Text>{this.formatDate(this.state.date)}</Text>
        </TouchableOpacity>
        {this.state.showDatepicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode='date'
            display="default"
            onChange={(event, selectedDate) => {
                const currentDate = selectedDate || this.state.date;
                this.setState({
                  date:currentDate,
                  showDatepicker:false
                });
            }}
          />
        )}
        <Button
          title="Add"
          onPress={() => {
            if(this.state.weight == null || !this.state.reps) {
              if(this.state.weight == null && !this.state.reps) {
                Alert.alert('Please enter all values');
              } else if(this.state.weight == null && this.state.reps) {
                Alert.alert('Please enter weight value');
              } else {
                Alert.alert('Please enter rep value');
              }
            } else {
              this.props.updateCallback(this.state.weight, this.state.reps, this.state.date);
            }
          }}
        />
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
  },

  inputContainer: {
    borderWidth: 1,
    flexDirection: 'row'
  },

  input: {
    height: 35,
    width: 70,
    borderColor: 'green',
    borderWidth: 1
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#8ee8ff',
    padding: 5
  },
});

export default ExerciseCard;
