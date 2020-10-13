/**
 * Show developer tools
 *
 * @format
 * @flow
 */

import React from 'react';
import {Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {Exercises, getExerciseKeys} from 'components/content';
import {Theme, Color} from 'components/stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {retrieveData, storeWeightLog} from 'components/storage';
import {getSingleExerciseStrengthScore, getOneRepMaximum} from 'components/strengthScore';
import {formatDate} from 'components/utils';
import moment from 'moment';

class DevToolScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async _storeMockData(sExerciseID) {
    try {
      let amount = Math.floor(Math.random() * (10 + 5)) + 5;
      console.log('Adding ' + amount + ' new entries to ' + sExerciseID);
      var dataContainer = [];
      var dateContainer = [];
      for (let i = 0; i < amount; i++) {
        let randWeight = Math.floor(Math.random() * (40 + i)) + i;
        randWeight = Math.floor(randWeight / 2.5) * 2.5;
        let randreps = Math.floor(Math.random() * 10) + 1;
        let randDate = new Date(
          new Date(2020, 0, 1).getTime() +
            Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime()),
        );
        await retrieveData(['bodyweight', 'birthday', 'isMale'], values => {
          var defaultBirthday = moment().subtract(20, 'years');
          if (!values) {
            values = {bodyweight: 75, birthday: defaultBirthday, isMale: false};
          }
          values.bodyweight = values.bodyweight ? values.bodyweight : 75;
          values.birthday = new Date(values.birthday ? values.birthday : defaultBirthday);
          values.isMale = values.isMale ? values.isMale : false;

          var age = moment(randDate).diff(moment(values.birthday), 'years');
          var oneRm = getOneRepMaximum(randWeight, randreps, 2.5);
          var strengthScore = getSingleExerciseStrengthScore(
            values.isMale,
            age,
            values.bodyweight,
            sExerciseID,
            oneRm,
          );
          console.log(
            'Adding to ' +
              sExerciseID +
              ': ' +
              randWeight +
              'kg x ' +
              randreps +
              ' @ ' +
              randDate +
              ' (oneRM: ' +
              oneRm +
              'kg, strengthScore: ' +
              strengthScore +
              ')',
          );
          dataContainer.push({
            weight: randWeight,
            reps: randreps,
            date: randDate,
            oneRM: oneRm,
            score: strengthScore,
          });
          dateContainer.push(formatDate(randDate));
        });
      }
      await AsyncStorage.setItem(sExerciseID, JSON.stringify(dataContainer));
      await AsyncStorage.setItem('calendar', JSON.stringify(dateContainer));
    } catch (error) {
      // Error saving data
      console.log(error.message);
    }
  }

  /**
   * @private
   * Renders a button for each exercise, that will copy the data for the exercise
   * to the clipboard. The format of the copied data is JSON
   */
  renderClipboardButtons() {
    var items = [];

    //render export buttons
    for (let [index, value] of Exercises.entries()) {
      items.push(
        <TouchableOpacity
          style={Theme.button}
          key={value.id}
          onPress={async () => {
            retrieveData(value.id, async data => {
              if (data) {
                //convert data from JSON to CSV
                let output = 'Exercise;Date;Reps;Weight';
                let dataArray = JSON.parse(data);
                for (let i = 0; i < dataArray.length; i++) {
                  console.log('Converting ' + JSON.stringify(dataArray[i]));
                  output += '\n' + value.id + ';' + dataArray[i].date + ';';
                  output += dataArray[i].reps + ';' + dataArray[i].weight;
                }
                await Clipboard.setString(output);
                Alert.alert('Copied to Clipboard');
              } else {
                Alert.alert('No data found');
              }
            });
          }}>
          <Text style={Theme.buttonText}>Copy to Clipboard: {value.name}</Text>
        </TouchableOpacity>,
      );
    }

    //render import button
    items.push(
      <TouchableOpacity
        style={Theme.button}
        key={'import_clipboard'}
        onPress={async () => {
          let content = await Clipboard.getString();
          let rows = content.split('\n');
          for (let i = 0; i < rows.length; i++) {
            let columns = rows[i].split(';');
            if (columns[0] === 'Exercise') {
              console.log('Skipping headers.');
              continue; //skip the headers
            }
            let logObject = {
              id: columns[0],
              weight: parseFloat(columns[3]),
              reps: parseInt(columns[2], 10),
              date: new Date(columns[1]),
            };
            console.log('Saving ' + JSON.stringify(logObject));
            //FIXME TODO It looks like this saves only one log entry at the moment
            storeWeightLog(logObject);
          }
        }}>
        <Text style={Theme.buttonText}>Copy data from Clipboard</Text>
      </TouchableOpacity>,
    );

    return items;
  }

  render() {
    return (
      <>
        <SafeAreaView style={Theme.safeArea}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={Theme.scrollView}>
            <View style={Theme.maincontainer}>
              <Text style={Theme.text}>Some tools that help managing and developing the app.</Text>
            </View>
            {this.renderClipboardButtons()}
            <View style={{marginTop: 45}} />
            <TouchableOpacity
              style={Theme.warningIconButton}
              onPress={() => {
                Alert.alert(
                  'Generating random data',
                  'You are about to generate random data. This is only for testing and might ruin your save state. Are you sure?',
                  [
                    {
                      text: 'Yes, fill',
                      onPress: () => {
                        Exercises.forEach(entry => {
                          //don't always fill all fields
                          if (Math.random() > 0.15) {
                            this._storeMockData(entry.id);
                          } else {
                            console.log('Adding no entries to ' + entry.id);
                          }
                        });
                      },
                    },
                    {text: 'No, cancel'},
                  ],
                  {cancelable: true},
                );
              }}>
              <Icon name="ios-add-circle-outline" color={Color.buttonFontColor} size={16} />
              <Text style={Theme.buttonText}> Fill with random test data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Theme.warningIconButton}
              onPress={() => {
                Alert.alert(
                  'Delete ALL data',
                  "You are about to delete all data. When it's gone, it's gone. Are you sure?",
                  [
                    {
                      text: 'Yes, nuke it!',
                      onPress: async () => {
                        try {
                          let databaseKeys = getExerciseKeys();
                          databaseKeys.push('calendar');
                          await AsyncStorage.multiRemove(databaseKeys);
                        } catch (ignore) {}
                      },
                    },
                    {text: 'Cancel'},
                  ],
                  {cancelable: true},
                );
              }}>
              <Icon name="ios-nuclear" color={Color.buttonFontColor} size={16} />
              <Text style={Theme.buttonText}> Clear all data</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default DevToolScreen;
