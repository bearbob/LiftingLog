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
        <Text style={cardStyle.buttonText}>x</Text>
        <TextInput
          style={cardStyle.input}
          keyboardType="numeric"
          onChangeText={(text, eventCount, target) => {
              this.setState({
                reps: text
              });
          }}
        />
        <Text style={cardStyle.buttonText}>@</Text>
        <TouchableOpacity
         style={cardStyle.picker}
         onPress={() => this.setState({ showDatepicker:true })}
         >
          <Text style={cardStyle.buttonText}>{formatDate(this.state.date)}</Text>
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
        <TouchableOpacity
         style={cardStyle.button}
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
             this.props.updateCallback(
               parseInt(this.state.weight),
               parseInt(this.state.reps),
               this.state.date
             );
           }
         }}
         >
          <Text style={cardStyle.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const cardStyle = StyleSheet.create({

  inputContainer: {
    borderWidth: 0,
    flexDirection: 'row',
    paddingTop: 10
  },

  input: {
    height: 35,
    width: 70,
    borderColor: '#D79922',
    backgroundColor: '#747474',
    color: '#EDF5E1',
    borderWidth: 1,
    marginRight: 5
  },

  picker: {
    alignItems: 'center',
    backgroundColor: '#14A76C',
    padding: 5,
    marginLeft: 5
  },

  text: {
    color: '#fdfffc',
    fontWeight: 'bold',
    padding: 5
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#14A76C',
    padding: 5,
    marginLeft: 10
  },

  buttonText: {
    color: '#fdfffc',
    fontWeight: 'bold',
    padding: 5
  }
});

export default ExerciseInput;
