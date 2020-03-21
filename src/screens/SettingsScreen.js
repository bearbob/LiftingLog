/**
 * Settings for the app
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import { storeData, retrieveData } from 'components/storage';
import { formatDate } from 'components/utils';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Color } from 'components/stylesheet';
import moment from 'moment';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMale: false,
      birthday: new Date(),
      showDatepicker: false,
      age: -1
    };
    this.flipGender = this.flipGender.bind(this);
    retrieveData("isMale", (value) => {
      if (value !== null) {
          this.setState({
            isMale: JSON.parse(value)
          });
        }
    });
    retrieveData("birthday", (value) => {
      if (value !== null) {
        var birthday = JSON.parse(value);
        var years = moment(birthday).fromNow();
        this.setState({
          birthday: birthday,
          age: years
        });
      }
    });
  }

  getButtonStyle(color) {
    return {
      alignItems: 'center',
      backgroundColor: color,
      padding: 20,
      borderWidth: 2,
      borderColor: '#747474',
    };
  }

  flipGender() {
    console.log("Called flipGender()");
    console.log(this.state.isMale);
    this.setState({
        isMale: !this.state.isMale
    });
    storeData("isMale", this.state.isMale);
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">

          <TouchableOpacity
           style={this.getButtonStyle('#14A76C')}
           onPress={this.flipGender}
           >
            <Text style={styles.buttonText}>Sex: {this.state.isMale?"Male":"Female"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.picker}
            onPress={() => this.setState({ showDatepicker:true })}
           >
            <Text style={styles.buttonText}>{formatDate(this.state.birthday)}</Text>
          </TouchableOpacity>
          {this.state.showDatepicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.birthday}
              mode='date'
              display="default"
              onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || this.state.birthday;
                  var years = moment(currentDate).fromNow();
                  this.setState({
                    birthday:currentDate,
                    age: years,
                    showDatepicker:false
                  });
                  storeData("birthday", currentDate);
              }}
            />
          )}
          <Text style={styles.buttonText}>Age: {this.state.age}</Text>
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
  },

  picker: {
    alignItems: 'center',
    backgroundColor: Color.buttonBackgroundColor,
    padding: 5,
    borderRadius: 10,
    marginLeft: 5
  },

  buttonText: {
    color: '#fdfffc',
    fontWeight: 'bold'
  }
});

export default SettingsScreen;
