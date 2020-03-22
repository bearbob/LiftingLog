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
  TextInput,
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
      showWeightInput: false,
      age: 0,
      bodyweight: 0,
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
        var years = moment().diff(moment(birthday), 'years');
        this.setState({
          birthday: new Date(birthday),
          age: years
        });
      }
    });
    retrieveData("bodyweight", (value) => {
      if (value !== null) {
        this.setState({
          bodyweight: JSON.parse(value)
        });
      }else{
        this.setState({
          bodyweight: "Undefined"
        });
      }
    });
  }

  flipGender() {
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
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.buttonText}>Here you can change your personal data.</Text>
          <Text style={styles.buttonText}>This information is used to calculate your Wilks and strength scores.</Text>
          <TouchableOpacity
           style={styles.button}
           onPress={this.flipGender}
           >
            <Text style={styles.buttonText}>Sex: {this.state.isMale?"Male":"Female"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ showDatepicker:true })}
           >
            <Text style={styles.buttonText}>Birthday: {formatDate(this.state.birthday)} (age: {this.state.age})</Text>
          </TouchableOpacity>
          {this.state.showDatepicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.birthday}
              mode='date'
              display="default"
              onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || this.state.birthday;
                  var years = moment().diff(moment(currentDate), 'years');
                  this.setState({
                    birthday:currentDate,
                    age: years,
                    showDatepicker:false
                  });
                  storeData("birthday", currentDate);
              }}
            />
          )}
          <TouchableOpacity
           style={styles.button}
           onPress={() => { this.setState({ showWeightInput: !this.state.showWeightInput})}}
           >
            <Text style={styles.buttonText}>Bodyweight: {this.state.bodyweight} kg</Text>
            {this.state.showWeightInput && (
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(input, eventCount, target) => {
                    this.setState({
                      bodyweight: parseInt(input)
                    });
                    storeData("bodyweight", parseInt(input));
                }}
              />
            )}
          </TouchableOpacity>

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
    color: Color.headerColor,
    marginBottom: 5,
  },

  button: {
    alignItems: 'center',
    backgroundColor: Color.buttonBackgroundColor,
    padding: 20,
    borderWidth: 2,
    borderColor: Color.borderColor,
    borderRadius: 10,
    marginTop: 7,
  },

  input: {
    height: 35,
    width: 75,
    marginTop: 5,
    borderColor: Color.buttonBorderColor,
    backgroundColor: Color.mainBackgroundColor,
    color: Color.mainFontColor,
    borderWidth: 1,
  },

  buttonText: {
    color: Color.mainFontColor,
    fontWeight: 'bold'
  }
});

export default SettingsScreen;
