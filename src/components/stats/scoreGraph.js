/**
 * Defines the exercise cards with weight and rep tracks
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text
} from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { retrieveData } from 'components/storage';
import { Color } from 'components/stylesheet.js';
import { getLastLogs, getWeekNumber, getNextWeek, weeksBetween } from 'components/utils';

class ScoreGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      includeInactiveWeeks: this.props.includeInactiveWeeks,
      labels: [], //if no data found, give an error message instead of the graph
      data: [] //if no data found, give an error message instead of the graph
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

  refresh (value) {
    if (value !== null) {
        let item = JSON.parse(value);
        // Our data is fetched successfully
        let last = getLastLogs(item, 6, true).reverse();
        let dates = [];
        let data = [];
        if(this.state.includeInactiveWeeks) {
          last.forEach(entry => {
            let nextWeek = getWeekNumber(entry.date);
            while(weeksBetween(dates[dates.length-1], nextWeek) > 1) {
              dates.push(getNextWeek(dates[dates.length-1]));
              data.push(0);
            }
            dates.push(nextWeek);
            data.push(entry.score);
          });
        } else {
          last.forEach(entry => {
            dates.push(getWeekNumber(entry.date));
            data.push(entry.score);
          });
        }
        this.setState({
          labels: dates,
          data: data
        });
    } else {
      this.setState({
        labels: [],
        data:  []
      });
    }
  }

  render() {
    if(this.state.labels.length < 1 || this.state.data.length < 1) {
      return (<Text style={style.sectionDescription}>No data to visualize</Text>);
    }
    return (
      <BarChart
        data={{
          labels: this.state.labels,
          datasets: [
            {
              data: this.state.data
            }
          ]
        }}
        width={Dimensions.get("window").width*0.95} // from react-native
        height={Dimensions.get("window").height/3}
        chartConfig={{
          backgroundGradientFrom: Color.mainBackgroundColor,
          fillShadowGradient: Color.graphShadowColor,
          fillShadowGradientOpacity: 0.4,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(77, 188, 94, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(77, 188, 94, ${opacity})`,
          style: {
            borderRadius: 1
          }
        }}
        style={style.container}
      />
    );
  }
}

const style = StyleSheet.create({
  container: {
    borderRadius: 0,
    marginTop: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Color.backgroundColor
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    color: Color.buttonBackgroundColor
  }
});

export default ScoreGraph;
