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
  Button,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

class ExerciseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //TODO
    };
  }

  render() {
    return (
      <View style={cardStyle.maincontainer}>
        <Text style={cardStyle.title}>{ this.props.text }</Text>
        <Text style={cardStyle.sectionDescription}>Last: { this.props.lastWeight }kg x{ this.props.lastReps } @ { this.props.lastDate }</Text>
        <Text style={cardStyle.sectionDescription}>Best: { this.props.bestWeight }kg x{ this.props.bestReps } @ { this.props.bestDate }</Text>
        <ExerciseInput />
      </View>
    );
  }
}

class ExerciseInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatepicker: false,
      date: new Date()
    };
  }

  formatDate (date) {
    return date.getDate() +"."+date.getMonth()+"."+date.getFullYear();
  }

  render() {
    return (
      <View style={cardStyle.inputContainer}>
        <TextInput
          style={cardStyle.input}
          keyboardType="numeric"
          value="Weight"
        />
        <Text>x</Text>
        <TextInput
          style={cardStyle.input}
          keyboardType="numeric"
        />
        <Text>@</Text>
        <TextInput
          style={cardStyle.inputDate}
          value={this.formatDate(this.state.date)}
          onFocus={() => {
            this.setState({ showDatepicker:true });
          }}
        />
        {this.state.showDatepicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode='date'
            display="default"
            onChange={(event, selectedDate) => {
                const currentDate = selectedDate || this.state.date;
                this.setState({ date:currentDate });
            }}
          />
        )}
        <Button
          title="Add"
          onPress={() => Alert.alert('Cannot press this one')}
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

  inputDate: {
    height: 35,
    width: 90,
    borderColor: 'green',
    borderWidth: 1
  }
});

export default ExerciseCard;
