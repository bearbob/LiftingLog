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

class AbstractGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      includeInactiveWeeks: this.props.includeInactiveWeeks,
      entries: this.props.entries?this.props.entries:6,
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
    let dates = [];
    let data = [];
    if (value !== null) {
        let item = JSON.parse(value);
        // Our data is fetched successfully
        let last = getLastLogs(item, this.state.entries, true).reverse();

        if(this.state.includeInactiveWeeks) {
          last.forEach(entry => {
            let nextWeek = getWeekNumber(entry.date);
            while(weeksBetween(dates[dates.length-1], nextWeek) > 1) {
              dates.push(getNextWeek(dates[dates.length-1]));
              data.push(0);
            }
            dates.push(nextWeek);
            data.push(entry[this.state.dataType]);
          });
          let start = dates.length-this.state.entries;
          dates = dates.slice(start, dates.length);
          data = data.slice(start, data.length);
        } else {
          last.forEach(entry => {
            dates.push(getWeekNumber(entry.date));
            data.push(entry[this.state.dataType]);
          });
        }
        for(let i=0; i<dates.length; i++) {
          dates[i] = dates[i][1] + "|" + (dates[i][0].toString()).substr(-2);
        }
    }

    this.setState({
      labels: dates,
      data: data
    });
  }

  getStyle() {
    return StyleSheet.create({
      container: {
        marginVertical: 1,
        borderRadius: 16,
      },
      sectionDescription: {
        fontSize: 18,
        fontWeight: '400',
        color: Color.buttonBackgroundColor
      }
    });
  }
}

export default AbstractGraph;
