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
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from 'react-native';
import { storeData, retrieveData } from 'components/storage';
import { formatDate } from 'components/utils';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Theme, Color } from 'components/stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
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
    storeData("isMale", !this.state.isMale);
    this.setState({
        isMale: !this.state.isMale
    });
  }

  render() {
    return (
      <>
      <SafeAreaView style={Theme.safeArea}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={Theme.maincontainer}>
            <Text style={Theme.text}>Here you can change your personal data.</Text>
            <Text style={Theme.text}>This information is needed to calculate your Wilks and strength scores.</Text>
          </View>
          <TouchableOpacity style={Theme.maincontainer}
           onPress={this.flipGender}
           >
            <View style={Theme.rowContainer}>
              <View style={Theme.sectionContainer}>
                <Text style={Theme.sectionTitle}>Biological gender: </Text>
                <Text style={Theme.sectionDescription}>{this.state.isMale?"Male":"Female"}</Text>
              </View>
              <View style={{marginLeft: 'auto'}}>
                <Text style={{marginRight: 10}}>
                  <Icon
                    name="ios-swap"
                    color={Color.active}
                    size={35}
                  />
                </Text>
              </View>
            </View>

          </TouchableOpacity>
          <TouchableOpacity
            style={Theme.button}
            onPress={() => this.setState({ showDatepicker:true })}
           >

            <Text style={Theme.buttonText}>Birthday: {formatDate(this.state.birthday)} (age: {this.state.age})</Text>
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
           style={Theme.button}
           onPress={() => { this.setState({ showWeightInput: !this.state.showWeightInput})}}
           >
            <Text style={Theme.buttonText}>Bodyweight: {this.state.bodyweight} kg</Text>
            {this.state.showWeightInput && (
              <TextInput
                style={Theme.input}
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
          <TouchableOpacity
            style={Theme.iconButton}
            onPress={() => { this.props.navigation.navigate('DevTools') }}>
            <Icon
              name="ios-bug"
              color={Color.buttonFontColor}
              size={16}
            />
            <Text style={Theme.buttonText}> Open DevTools</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

export default SettingsScreen;
