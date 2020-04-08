/**
 * Defines the exercise cards with weight and rep tracks
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ExerciseInput from './card-input';
import { getBestLog, getLastLog, formatDate, isSecondLiftBetter, printLogLine } from 'components/utils';
import { storeObjectInArray, retrieveData } from 'components/storage';
import { Theme } from 'components/stylesheet';
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
      <View style={Theme.maincontainer}>
        <Text style={Theme.title}>Last values - {formatDate(this.state.lastDate)}</Text>
          <Text style={Theme.sectionDescription}>{printLogLine("Last", this.state.lastWeight, this.state.lastReps, this.state.lastDate) }</Text>
          <Text style={Theme.sectionDescription}>Last one rep max: {this.state.lastOneRM?this.state.lastOneRM+" kg": "No data available"}
          </Text>
          <Text style={Theme.sectionDescription}>Last strength score: {this.state.lastStrengthScore?this.state.lastStrengthScore: "No data available"}
          </Text>
        <Text style={Theme.title}>Best results - {formatDate(this.state.bestDate)}</Text>
          <Text style={Theme.sectionDescription}>{printLogLine("Best", this.state.bestWeight, this.state.bestReps, this.state.bestDate) }</Text>
          <Text style={Theme.sectionDescription}>Best one rep max: {this.state.bestOneRM?this.state.bestOneRM+" kg": "No data available"}
          </Text>
          <Text style={Theme.sectionDescription}>Best strength score: {this.state.bestStrengthScore?this.state.bestStrengthScore: "No data available"}
          </Text>
      </View>
    );
  }
}

export default ExerciseDetailsCard;
