/**
 * Defines the exercise cards with weight and rep tracks
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text} from 'react-native';
import {getBestLog, getLastLog, formatDate, printLogLine} from 'components/utils';
import {retrieveData} from 'components/storage';
import {Theme} from 'components/stylesheet';

class ExerciseDetailsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.text,
      id: this.props.id,
      showInput: false,
    };
    this.refresh = this.refresh.bind(this);
    retrieveData(this.props.id, this.refresh);
  }

  componentDidMount() {
    this._mounted = true;
    this.updaterID = setInterval(() => {
      if (this._mounted) {
        retrieveData(this.state.id, this.refresh);
      }
    }, 3000);
  }

  componentWillUnmount() {
    this._mounted = false;
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
      bestWeight: best ? best.weight : null,
      bestReps: best ? best.reps : null,
      bestDate: best ? new Date(best.date) : null,
      bestOneRM: best && best.oneRM ? best.oneRM : null,
      bestStrengthScore: best && best.score ? best.score : null,
      //---------------
      lastWeight: last ? last.weight : null,
      lastReps: last ? last.reps : null,
      lastDate: last ? new Date(last.date) : null,
      lastOneRM: last && last.oneRM ? last.oneRM : null,
      lastStrengthScore: last && last.score ? last.score : null,
    });
  }

  render() {
    return (
      <View style={Theme.maincontainer}>
        <Text style={Theme.title}>Last values - {formatDate(this.state.lastDate)}</Text>
        {this.state.lastDate && (
          <>
            <View style={Theme.sectionContainer}>
              <Text style={Theme.sectionTitle}>Last: </Text>
              <Text style={Theme.sectionDescription}>
                {printLogLine('', this.state.lastWeight, this.state.lastReps, this.state.lastDate)}
              </Text>
            </View>
            <View style={Theme.sectionContainer}>
              <Text style={Theme.sectionTitle}>Last one rep max: </Text>
              <Text style={Theme.sectionDescription}>
                {this.state.lastOneRM ? this.state.lastOneRM + ' kg' : 'No data available'}
              </Text>
            </View>
            <View style={Theme.sectionContainer}>
              <Text style={Theme.sectionTitle}>Last strength score: </Text>
              <Text style={Theme.sectionDescription}>
                {this.state.lastStrengthScore ? this.state.lastStrengthScore : 'No data available'}
              </Text>
            </View>
          </>
        )}
        {!this.state.lastDate && (
          <Text style={Theme.sectionDescription}>No data available. Many emptiness.</Text>
        )}

        <Text style={Theme.title}>Best results - {formatDate(this.state.bestDate)}</Text>
        {this.state.bestDate && (
          <>
            <View style={Theme.sectionContainer}>
              <Text style={Theme.sectionTitle}>Best: </Text>
              <Text style={Theme.sectionDescription}>
                {printLogLine('', this.state.bestWeight, this.state.bestReps, this.state.bestDate)}
              </Text>
            </View>
            <View style={Theme.sectionContainer}>
              <Text style={Theme.sectionTitle}>Best one rep max: </Text>
              <Text style={Theme.sectionDescription}>
                {this.state.bestOneRM ? this.state.bestOneRM + ' kg' : 'No data available'}
              </Text>
            </View>
            <View style={Theme.sectionContainer}>
              <Text style={Theme.sectionTitle}>Best strength score: </Text>
              <Text style={Theme.sectionDescription}>
                {this.state.bestStrengthScore ? this.state.bestStrengthScore : 'No data available'}
              </Text>
            </View>
          </>
        )}
        {!this.state.bestDate && (
          <Text style={Theme.sectionDescription}>No data available. Very missing.</Text>
        )}
      </View>
    );
  }
}

export default ExerciseDetailsCard;
