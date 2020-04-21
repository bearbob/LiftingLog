/**
 * Defines the exercise cards with weight and rep tracks
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { getBestLog, getLastLog, printLogLine } from 'components/utils';
import { retrieveData } from 'components/storage';
import { Theme, Color } from 'components/stylesheet.js';
import Icon from 'react-native-vector-icons/Ionicons';


class ExerciseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.text,
      id: this.props.id,
      showInput: false,
      random: Math.random(),
    };
    this.refresh = this.refresh.bind(this);
    this.onTouch = this.props.onTouch;
    retrieveData(this.props.id, this.refresh);
  }

  componentDidMount() {
    this._mounted = true;
    this.updaterID = setInterval(
      () => {
        if(this._mounted) {
          retrieveData(this.state.id, this.refresh);
        }
      },
      5000
    );
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

  getSadWords() {
    let items = [
      'So sad.',
      'Terrible.',
      'Not cool.',
      'Horrible.',
      'Hit it!',
      'Very sad.',
      'Change it!',
      'Many sad.',
      'Such sad.',
      'Do it.',
      'Why?', //What would batman do
      'Not ok.',
      'Start now!',
      'Your turn.',
      'Yet!',
    ];
    return items[Math.floor(this.state.random * items.length)];
  }

  render() {
    return (
      <View style={Theme.maincontainer}>
        <TouchableOpacity onPress={this.onTouch}>
          <View style={Theme.rowContainer}>
            <View>
              <Text style={Theme.title}>{ this.state.name }</Text>
              {this.state.lastDate && (
                <View style={Theme.sectionContainer}>
                  <Text style={Theme.sectionTitle}>Last: </Text>
                  <Text style={Theme.sectionDescription}>
                    {printLogLine('', this.state.lastWeight, this.state.lastReps, this.state.lastDate) }
                  </Text>
                </View>
              )}
              {this.state.bestDate && (
                <View style={Theme.sectionContainer}>
                  <Text style={Theme.sectionTitle}>Best: </Text>
                  <Text style={Theme.sectionDescription}>
                    {printLogLine('', this.state.bestWeight, this.state.bestReps, this.state.bestDate) }
                  </Text>
                </View>
              )}
              {!this.state.lastDate && (
                <View style={Theme.sectionContainer}>
                  <Text style={Theme.sectionTitle}>No data available yet.</Text>
                  <Text style={Theme.sectionDescription}> {this.getSadWords()}</Text>
                </View>
              )}
            </View>
            <Text style={{marginLeft: 'auto'}}>
              <Icon
                name="ios-arrow-forward"
                color={Color.active}
                size={25}
              />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ExerciseCard;
