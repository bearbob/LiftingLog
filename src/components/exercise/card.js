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


class ExerciseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.text,
      id: this.props.id,
      showInput: false
    };
    this.updateStats = this.updateStats.bind(this);
    this.storeData = this.storeData.bind(this);
    this.refresh = this.refresh.bind(this);
    this.onTouch = this.props.onTouch;
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


  /**
   * Update the current state with new values, if the date is newer
   * or the weight is higher. In either case the data is stored to the
   * database
   * @private
   * @param {double} weight - The weight lifted
   * @param {integer} reps - The repitition the weight was lifted for
   * @param {date} date - The date of the lift
   */
  updateStats (weight, reps, date) {
    if(!weight || !reps || !date) return;
    if(this.state.date < date) {
      //only update last if the date is more recent than the last date
      this.setState({
        lastWeight: weight,
        lastReps: reps,
        lastDate: date
      });
    }
    if(isSecondLiftBetter(this.state.bestWeight, this.state.bestReps, weight, reps)) {
      this.setState({
        bestWeight: weight,
        bestReps: reps,
        bestDate: date
      });
    }
    this.storeData(weight, reps, date);
  }

  /**
   * @private
   * Save the new lift data to the database
   * @param {double} weight - The weight lifted
   * @param {integer} reps - The repitition the weight was lifted for
   * @param {date} date - The date of the lift
   */
  storeData (weight, reps, date) {
    retrieveData(["bodyweight", "birthday", "isMale"], (values) => {
      var defaultBirthday = moment().subtract(20, 'years');
      if(!values) {
        values = { bodyweight: 75, birthday: defaultBirthday, isMale: false};
      }
      values.bodyweight = values.bodyweight?values.bodyweight:75;
      values.birthday = new Date(values.birthday?values.birthday:defaultBirthday);
      values.isMale = values.isMale?values.isMale:false;
      var age = moment().diff(moment(values.birthday), 'years');
      var oneRm = getOneRepMaximum(weight, reps, 2.5);
      var strengthScore = getSingleExerciseStrengthScore(
        values.isMale,
        age,
        values.bodyweight,
        this.state.id,
        oneRm
      );
      storeObjectInArray(
        this.state.id,
        { weight: weight, reps: reps, date: date, oneRM: oneRm, score: strengthScore},
        true
      );
    });
  }

  render() {
    return (
      <View style={cardStyle.maincontainer}>
        <TouchableOpacity onPress={this.onTouch}>
          <Text style={cardStyle.title}>{ this.state.name }</Text>
          <Text style={cardStyle.sectionDescription}>{ printLogLine("Last", this.state.lastWeight, this.state.lastReps, this.state.lastDate) }</Text>
          <Text style={cardStyle.sectionDescription}>{ printLogLine("Best", this.state.bestWeight, this.state.bestReps, this.state.bestDate) }</Text>
        </TouchableOpacity>
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
    color: Color.buttonBackgroundColor
  }
});

export default ExerciseCard;
