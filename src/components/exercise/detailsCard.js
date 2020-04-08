/**
 * Defines the exercise cards with weight and rep tracks
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
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ExerciseInput from './card-input';
import { getBestLog, getLastLog, formatDate, isSecondLiftBetter, printLogLine } from 'components/utils';
import { storeObjectInArray, retrieveData } from 'components/storage';
import { Color } from 'components/stylesheet.js';
import { getSingleExerciseStrengthScore, getOneRepMaximum } from 'components/strengthScore';
import moment from 'moment';


class ExerciseDetailsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.text,
      id: this.props.id,
      showInput: false
    };
    this.refresh = this.refresh.bind(this);
    retrieveData(this.props.id, this.refresh);
  }

  componentDidMount() {
    this.updaterID = setInterval(
      () => {
        retrieveData(this.state.id, this.refresh);
      },
      15000
    );
  }

  componentWillUnmount() {
    clearInterval(this.updaterID);
  }

  /**
   * @private
   * After the data has been loaded from the storage, update the state
   */
  refresh(value) {
    let best = null;
    let last = null;
    if (value !== null) {
        let item = JSON.parse(value);
        best = getBestLog(item);
        last = getLastLog(item);
    }
    this.setState({
      bestWeight: best? best.weight:null,
      bestReps: best? best.reps:null,
      bestDate: best? new Date(best.date):null,
      bestOneRM: (best && best.oneRM)? best.oneRM:null,
      bestStrengthScore: (best && best.score)? best.score:null,
      //---------------
      lastWeight: last? last.weight:null,
      lastReps: last? last.reps:null,
      lastDate: last? new Date(last.date):null,
      lastOneRM: (last && last.oneRM)?last.oneRM:null,
      lastStrengthScore: (last && last.score)?last.score:null,
    });
  }

  render() {
    return (
      <View style={cardStyle.maincontainer}>
        <Text style={cardStyle.title}>Last values - {formatDate(this.state.lastDate)}</Text>
          <Text style={cardStyle.sectionDescription}>{printLogLine("Last", this.state.lastWeight, this.state.lastReps, this.state.lastDate) }</Text>
          <Text style={cardStyle.sectionDescription}>Last one rep max: {this.state.lastOneRM?this.state.lastOneRM+" kg": "No data available"}
          </Text>
          <Text style={cardStyle.sectionDescription}>Last strength score: {this.state.lastStrengthScore?this.state.lastStrengthScore: "No data available"}
          </Text>
        <Text style={cardStyle.title}>Best results - {formatDate(this.state.bestDate)}</Text>
          <Text style={cardStyle.sectionDescription}>{printLogLine("Best", this.state.bestWeight, this.state.bestReps, this.state.bestDate) }</Text>
          <Text style={cardStyle.sectionDescription}>Best one rep max: {this.state.bestOneRM?this.state.bestOneRM+" kg": "No data available"}
          </Text>
          <Text style={cardStyle.sectionDescription}>Best strength score: {this.state.bestStrengthScore?this.state.bestStrengthScore: "No data available"}
          </Text>
      </View>
    );
  }
}

const cardStyle = StyleSheet.create({
  maincontainer: {
    borderRadius: 20,
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: Color.backgroundColor,
    backgroundColor: Color.mainBackgroundColor
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Color.headerColor
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    color: Color.buttonBackgroundColor,
  }
});

export default ExerciseDetailsCard;
