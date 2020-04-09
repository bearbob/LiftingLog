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
import { formatDate } from 'components/utils';
import { Theme } from 'components/stylesheet.js';
import { storeObjectInArray, retrieveData } from 'components/storage';
import { getSingleExerciseStrengthScore, getOneRepMaximum } from 'components/strengthScore';
import moment from 'moment';

class ExerciseInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      weight: null,
      reps: null,
      showDatepicker: false,
      date: new Date() //default date is today
    };
  }

  /**
   * @private
   * Save the new lift data to the database
   * @param {double} weight - The weight lifted
   * @param {integer} reps - The repitition the weight was lifted for
   * @param {date} date - The date of the lift
   */
  storeData (weight, reps, date) {
    retrieveData(["bodyweight", "birthday", "isMale"], (values) => {
      var defaultBirthday = moment().subtract(20, 'years');
      if(!values) {
        values = { bodyweight: 75, birthday: defaultBirthday, isMale: false};
      }
      values.bodyweight = values.bodyweight?values.bodyweight:75;
      values.birthday = new Date(values.birthday?values.birthday:defaultBirthday);
      values.isMale = values.isMale?values.isMale:false;
      var age = moment().diff(moment(values.birthday), 'years');
      var oneRm = getOneRepMaximum(weight, reps, 2.5);
      var strengthScore = getSingleExerciseStrengthScore(
        values.isMale,
        age,
        values.bodyweight,
        this.state.id,
        oneRm
      );
      storeObjectInArray(
        this.state.id,
        { weight: weight, reps: reps, date: date, oneRM: oneRm, score: strengthScore},
        true
      );
    });
  }

  render() {
    return (
      <View>
        <View style={Theme.inputContainer}>
        <TextInput
          style={Theme.input}
          keyboardType="numeric"
          onChangeText={(text, eventCount, target) => {
              this.setState({
                weight: text
              });
          }}
        />
        <Text style={Theme.buttonText}> x </Text>
        <TextInput
          style={Theme.input}
          keyboardType="numeric"
          onChangeText={(text, eventCount, target) => {
              this.setState({
                reps: text
              });
          }}
        />
        <Text style={Theme.buttonText}> @ </Text>
        <TouchableOpacity
         style={Theme.picker}
         onPress={() => this.setState({ showDatepicker:true })}
         >
          <Text style={Theme.buttonText}>{formatDate(this.state.date)}</Text>
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
        </View>
        <TouchableOpacity
         style={Theme.button}
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
             this.storeData(parseInt(this.state.weight), parseInt(this.state.reps), this.state.date);
           }
         }}
         >
          <Text style={Theme.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ExerciseInput;
