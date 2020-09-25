/**
 *
 * @format
 * @flow
 */

import React from 'react';
import {Alert, TextInput, View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {formatDate} from 'components/utils';
import {Theme} from 'components/stylesheet.js';
import {dataExists, storeWeightLog} from 'components/storage';

class ExerciseInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      submitButtonActive: false,
      weight: null,
      reps: null,
      showDatepicker: false,
      date: new Date(), //default date is today
    };
  }

  /**
   * @private
   * @param {array} conditions
   * @returns true if both input arguments are not null and not empty strings
   */
  isButtonActive(conditions) {
    for (let i = 0; i < conditions.length; i++) {
      let c = conditions[i];
      if (c === null || c === undefined || c === '') {
        return false;
      }
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
                  submitButtonActive: this.isButtonActive([text, this.state.reps]),
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
                  submitButtonActive: this.isButtonActive([this.state.weight, text]),
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
              onPress={() => this.setState({showDatepicker: true})}>
              <Text style={Theme.buttonText}>{formatDate(this.state.date)}</Text>
            </TouchableOpacity>
            <Text style={Theme.text}>Date</Text>
          </View>
          {this.state.showDatepicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || this.state.date;
                this.setState({
                  date: currentDate,
                  showDatepicker: false,
                });
              }}
            />
          )}
        </View>

        <TouchableOpacity
          style={this.state.submitButtonActive ? Theme.button : Theme.buttonInactive}
          onPress={() => {
            if (this.isButtonActive([this.state.weight, this.state.reps])) {
              //before we add the data to storage, we check if the settings have
              //been completed. Otherwise a warning is shown and we don't store
              let checkSettings = function(bDataExists) {
                if (bDataExists) {
                  storeWeightLog({
                    id: this.state.id,
                    weight: parseInt(this.state.weight, 10),
                    reps: parseInt(this.state.reps, 10),
                    date: this.state.date,
                  });
                  this.setState({
                    submitButtonActive: false,
                    reps: null,
                    weight: null,
                  });
                } else {
                  Alert.alert(
                    'Settings incomplete',
                    'You need to finish the setup before you start logging exercises. Otherwise your scores will be inacurate.',
                    [{text: 'Ok', onPress: () => {}}],
                    {cancelable: true},
                  );
                }
              };
              checkSettings = checkSettings.bind(this);
              dataExists(['birthday', 'bodyweight'], checkSettings);
            }
          }}>
          <Text style={this.state.submitButtonActive ? Theme.buttonText : Theme.buttonTextInactive}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ExerciseInput;
