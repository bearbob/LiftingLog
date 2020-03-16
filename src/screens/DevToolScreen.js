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
import { Exercises } from 'components/content';
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

  async _storeMockData(sExerciseID) {
    try {
      var array = [];
      const value = await AsyncStorage.getItem(sExerciseID);
      if (value !== null) {
          array = JSON.parse(value);
      }
      let amount = Math.floor(Math.random() * (40+15)) + 15;
      console.log("Adding "+amount+" new entries to "+sExerciseID);
      for(let i=0; i<amount; i++){
        let randWeight = Math.floor(Math.random() * (40+i)) + i;
        randWeight = Math.floor(randWeight/2.5)*2.5;
        let randreps = Math.floor(Math.random() * 10) + 1;
        let randDate = new Date(new Date(2020, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime()));
        console.log("Adding to "+sExerciseID+": "+randWeight+"kg x "+randreps+" @ "+randDate);
        array.push({
          weight: randWeight,
          reps: randreps,
          date: randDate
        });
      }
      await AsyncStorage.setItem(sExerciseID, JSON.stringify(array));
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
      backgroundColor: color,
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
              Exercises.forEach( entry => {
                //don't always fill all fields
                if(Math.random() > 0.15) {
                  this._storeMockData(entry.id);
                }
              });

             }
           }}
           >
            <Text style={styles.buttonText}>Fill with test data</Text>
          </TouchableOpacity>
          <TouchableOpacity
           style={this.getButtonStyle('#14A76C')}
           onPress={async () => {
               try {
                 await AsyncStorage.clear()
               } catch(e) {
                 // clear error
               }
               console.log('Cleared data.')
           }}
           >
            <Text style={styles.buttonText}>Clear all data</Text>
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
