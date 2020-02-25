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
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
                Alert.alert('Not enough values', 'You cannot log a new entry if values are missing.');
              } else if(this.state.weight == null && this.state.reps) {
                Alert.alert('Not enough values', 'Please enter a weight value.');
              } else {
                Alert.alert('Not enough values', 'Please enter a repetition value.');
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

export default ExerciseInput;
