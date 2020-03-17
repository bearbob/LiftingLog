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
import { storeObjectInArray, retrieveData } from 'components/storage';
import { Color } from 'components/stylesheet';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMale: false,
      birthday: null,
      age: null
    };
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
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">

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
  safeArea: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
  },

  buttonText: {
    color: '#fdfffc',
    fontWeight: 'bold'
  }
});

export default SettingsScreen;
