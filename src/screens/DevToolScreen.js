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
import { Color } from 'components/stylesheet';
import AsyncStorage from '@react-native-community/async-storage';
import { storeObjectInArray, retrieveData } from 'components/storage';
import { getSingleExerciseStrengthScore, getOneRepMaximum } from 'components/strengthScore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import moment from 'moment';

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
      var dataContainer = [];
      for(let i=0; i<amount; i++){
        let randWeight = Math.floor(Math.random() * (40+i)) + i;
        randWeight = Math.floor(randWeight/2.5)*2.5;
        let randreps = Math.floor(Math.random() * 10) + 1;
        let randDate = new Date(new Date(2020, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime()));
        await retrieveData(["bodyweight", "birthday", "isMale"], (values) => {
          var defaultBirthday = moment().subtract(20, 'years');
          if(!values) {
            values = { bodyweight: 75, birthday: defaultBirthday, isMale: false};
          }
          values.bodyweight = values.bodyweight?values.bodyweight:75;
          values.birthday = new Date(values.birthday?values.birthday:defaultBirthday);
          values.isMale = values.isMale?values.isMale:false;

          var age = moment(randDate).diff(moment(values.birthday), 'years');
          var oneRm = getOneRepMaximum(randWeight, randreps, 2.5);
          var strengthScore = getSingleExerciseStrengthScore(
            values.isMale,
            age,
            values.bodyweight,
            sExerciseID,
            oneRm
          );
          console.log(
            "Adding to "+sExerciseID+": "+randWeight+"kg x "+randreps+" @ "+randDate+
            " (oneRM: "+oneRm+"kg, strengthScore: "+strengthScore+")"
          );
          dataContainer.push({
              weight: randWeight,
              reps: randreps,
              date: randDate,
              oneRM: oneRm,
              score: strengthScore
            }
          );
        });
      }
      await AsyncStorage.setItem(sExerciseID, JSON.stringify(dataContainer));
      this.setState({
        fillWithTestData: false,
        testDataButtonColor: '#0c6340'
      });
    } catch (error) {
        // Error saving data
        console.log(error.message);
    }
  }

  getButtonStyle(isActive) {
    var color = Color.buttonBackgroundColor;
    if(!isActive) {
      color = Color.inactiveButtonBackgroundColor;
    }
    return {
      alignItems: 'center',
      backgroundColor: color,
      padding: 20,
      borderWidth: 2,
      borderColor: Color.buttonBorderColor,
      marginTop: 7,
    };
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text style={styles.title}>Developer Tools</Text>
          <Text style={styles.buttonText}>Some quick tools that help developing the app.</Text>
          <TouchableOpacity
           style={this.getButtonStyle(this.state.fillWithTestData)}
           onPress={() => {
             if(this.state.fillWithTestData) {
              Exercises.forEach( entry => {
                //don't always fill all fields
                if(Math.random() > 0.15) {
                  this._storeMockData(entry.id);
                }else {
                  console.log("Adding no entries to "+entry.id);
                }
              });

             }
           }}
           >
            <Text style={styles.buttonText}>Fill with test data</Text>
          </TouchableOpacity>
          <TouchableOpacity
           style={this.getButtonStyle(true)}
           onPress={async () => {
               try {
                 await AsyncStorage.clear()
                 this.setState({
                   fillWithTestData: true,
                   testDataButtonColor: '#14A76C'
                 });
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

  buttonText: {
    color: Color.mainFontColor,
    fontWeight: 'bold'
  }
});

export default DevToolScreen;
