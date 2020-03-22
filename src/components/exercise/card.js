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
import ExerciseInput from './card-input';
import { getBestLog, getLastLog, formatDate } from 'components/utils';
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
   * After the data has been loaded from the storage, update the state
   */
  refresh(value) {
    if (value !== null) {
        let item = JSON.parse(value);
        let best = getBestLog(item);
        let last = getLastLog(item);
        
        this.setState({
          bestWeight: best.weight,
          bestReps: best.reps,
          bestDate: new Date(best.date),
          bestOneRM: (best.oneRM?best.oneRM:null),
          bestStrengthScore: (best.score?best.score:null),
          //---------------
          lastWeight: last.weight,
          lastReps: last.reps,
          lastDate: new Date(last.date),
          lastOneRM: (last.oneRM?last.oneRM:null),
          lastStrengthScore: (last.score?last.score:null),
        });
    } else {
      //no data available
      this.setState({
        bestWeight: null,
        bestReps: null,
        bestDate: null,
        bestOneRM: null,
        bestStrengthScore: null,
        lastWeight: null,
        lastReps: null,
        lastDate: null,
        lastOneRM: null,
        lastStrengthScore: null
      });
    }
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
    if((!this.state.bestWeight || !this.state.bestReps) || weight > this.state.bestWeight || (weight >= this.state.bestWeight && reps > this.state.bestReps)) {
      this.setState({
        bestWeight: weight,
        bestReps: reps,
        bestDate: date
      });
    }
    this.storeData(weight, reps, date);
  }

  storeData(weight, reps, date) {
    retrieveData("bodyweight", "birthday", "isMale", (values) => {
      var defaultBirthday = moment().subtract(20, 'years');
      if(!values) {
        values = { bodyweight: 75, birthday: defaultBirthday, isMale: false};
      } else {
        values.bodyweight = values.bodyweight?values.bodyweight:75;
        values.birthday = values.birthday?values.birthday:defaultBirthday;
        values.isMale = values.isMale?values.isMale:false;
      }
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
        { weight: weight, reps: reps, date: date, oneRM: oneRM, score: strengthScore},
        true
      );
    });
  }

  /**
   * Converts the given data into a single line string
   * @private
   * @param {string} text - Text that is used as prefix for the string
   * @param {double} weight - The weight lifted
   * @param {integer} reps - The repitition the weight was lifted for
   * @param {date} date - The date of the lift
   */
  printLogLine (text, weight, reps, date) {
    if(!weight || !reps) {
      return text+": No data available yet";
    }
    return text+": "+ weight + "kg x" +reps+ " @ " + formatDate(date);
  }

  render() {
    return (
      <View style={cardStyle.maincontainer}>
        <TouchableOpacity onPress={() => this.setState({ showInput:!this.state.showInput })}>
          <Text style={cardStyle.title}>{ this.state.name }</Text>
          <Text style={cardStyle.sectionDescription}>{this.printLogLine("Last", this.state.lastWeight, this.state.lastReps, this.state.lastDate) }</Text>
          <Text style={cardStyle.sectionDescription}>{this.printLogLine("Best", this.state.bestWeight, this.state.bestReps, this.state.bestDate) }</Text>
        </TouchableOpacity>
        {this.state.showInput &&
          (<ExerciseInput updateCallback={this.updateStats}/>)
        }
        {this.state.showInput && this.state.lastWeight &&
          (<Text style={cardStyle.sectionDescription}>Last one rep max: {this.state.lastOneRM?this.state.lastOneRM+" kg": "No data available"}
          </Text>)
        }
        {this.state.showInput && this.state.lastWeight &&
          (<Text style={cardStyle.sectionDescription}>Last strength score: {this.state.lastStrengthScore?this.state.lastStrengthScore: "No data available"}
          </Text>)
        }
        {this.state.showInput && this.state.bestWeight &&
          (<Text style={cardStyle.sectionDescription}>Best one rep max: {this.state.bestOneRM?this.state.bestOneRM+" kg": "No data available"}
          </Text>)
        }
        {this.state.showInput && this.state.bestWeight &&
          (<Text style={cardStyle.sectionDescription}>Last strength score: {this.state.bestStrengthScore?this.state.bestStrengthScore: "No data available"}
          </Text>)
        }
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
