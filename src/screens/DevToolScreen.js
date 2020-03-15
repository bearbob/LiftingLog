/**
 * Show developer tools
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
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class DevToolScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fillWithTestData: true,
      testDataButtonColor: '#14A76C'
    };
  }

  async _storeMockData() {
    try {
      var array = [];
      const value = await AsyncStorage.getItem("benchpress");
      if (value !== null) {
          array = JSON.parse(value);
      }
      array.push({ weight: 10, reps: 5, date: new Date('2020-01-05T03:00:00')});
      array.push({ weight: 15, reps: 5, date: new Date('2020-01-06T03:00:00')});
      array.push({ weight: 27.5, reps: 4, date: new Date('2020-01-08T03:00:00')});
      array.push({ weight: 15, reps: 8, date: new Date('2020-01-18T03:00:00')});
      array.push({ weight: 20, reps: 5, date: new Date('2020-01-20T03:00:00')});
      array.push({ weight: 22.5, reps: 5, date: new Date('2020-01-22T03:00:00')});
      array.push({ weight: 20, reps: 5, date: new Date('2020-01-25T03:00:00')});
      array.push({ weight: 20, reps: 5, date: new Date('2020-01-26T03:00:00')});
      array.push({ weight: 25, reps: 5, date: new Date('2020-01-29T03:00:00')});
      await AsyncStorage.setItem("benchpress", JSON.stringify(array));
      this.state.fillWithTestData = false;
      this.setState({
        fillWithTestData: false,
        testDataButtonColor: '#0c6340'
      });
    } catch (error) {
        // Error saving data
        console.log(error.message);
    }
  }

  getButtonStyle(color) {
    return {
      alignItems: 'center',
      backgroundColor: this.state.testDataButtonColor,
      padding: 20,
      borderWidth: 2,
      borderColor: '#747474',
    };
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <TouchableOpacity
           style={this.getButtonStyle(this.state.testDataButtonColor)}
           onPress={() => {
             if(this.state.fillWithTestData) {
               this._storeMockData();
             }
           }}
           >
            <Text style={styles.buttonText}>Fill with test data</Text>
          </TouchableOpacity>
          <TouchableOpacity
           style={this.getButtonStyle('#14A76C')}
           onPress={() => this.props.navigation.navigate('ExerciseList')}
           >
            <Text style={styles.buttonText}>Go to Exercises</Text>
          </TouchableOpacity>
          <TouchableOpacity
           style={this.getButtonStyle('#14A76C')}
           onPress={() => this.props.navigation.navigate('Graphs')}
           >
            <Text style={styles.buttonText}>Go to data visualization</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#14A00C',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#000000',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#e0e0e0'
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#e0e0e0',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },

  buttonText: {
    color: '#fdfffc',
    fontWeight: 'bold'
  }
});

export default DevToolScreen;
