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
      submitButtonActive: false,
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

  /**
   * @private
   * @returns true if both input arguments are not null and not empty strings
   */
  isButtonActive(conditions) {
    for(let i=0; i<conditions.length; i++) {
      let c = conditions[i];
      if(c === null || c === undefined || c === '') return false;
    }
    return true;
  }

  render() {
    return (
      <View>
        <View style={Theme.inputContainer}>
          <View style={Theme.centeredContainer}>
            <TextInput
              style={Theme.input}
              keyboardType="numeric"
              onChangeText={(text, eventCount, target) => {
                  this.setState({
                    weight: text,
                    submitButtonActive: this.isButtonActive([text, this.state.reps])
                  });
              }}
              value={this.state.weight}
            />
            <Text style={Theme.text}>Kilogramm</Text>
          </View>

          <Text style={Theme.text}> x </Text>
          <View style={Theme.centeredContainer}>
            <TextInput
              style={Theme.input}
              keyboardType="numeric"
              onChangeText={(text, eventCount, target) => {
                  this.setState({
                    reps: text,
                    submitButtonActive: this.isButtonActive([this.state.weight, text])
                  });
              }}
              value={this.state.reps}
            />
            <Text style={Theme.text}>Reps</Text>
          </View>
          <Text style={Theme.text}> @ </Text>
          <View style={Theme.centeredContainer}>
            <TouchableOpacity
             style={Theme.picker}
             onPress={() => this.setState({ showDatepicker:true })}
             >
              <Text style={Theme.buttonText}>{formatDate(this.state.date)}</Text>
            </TouchableOpacity>
            <Text style={Theme.text}>Date</Text>
          </View>
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
         style={this.state.submitButtonActive?Theme.button:Theme.buttonInactive}
         onPress={() => {
           if(this.isButtonActive([this.state.weight, this.state.reps])){
             this.storeData(parseInt(this.state.weight), parseInt(this.state.reps), this.state.date);
             this.setState({
               submitButtonActive: false,
               reps: null,
               weight: null
             });
           }
         }}
         >
          <Text style={this.state.submitButtonActive?Theme.buttonText:Theme.buttonTextInactive}>
            Add
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default ExerciseInput;
