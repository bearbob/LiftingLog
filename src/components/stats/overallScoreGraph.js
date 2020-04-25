/**
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Dimensions,
  Text,
  StyleSheet,
  View
} from 'react-native';
import AbstractGraph from './abstractGraph';
import { BarChart } from "react-native-chart-kit";
import { Color, Theme } from 'components/stylesheet.js';
import { retrieveData } from 'components/storage';

class OverallScoreGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      includeInactiveWeeks: this.props.includeInactiveWeeks,
      id: 'strengthScoreCollection',
      labels: [], //if no data found, give an error message instead of the graph
      data: [] //if no data found, give an error message instead of the graph
    };
    this.refresh = this.refresh.bind(this);
    retrieveData('strengthScoreCollection', this.refresh);
  }

  ccomponentDidMount() {
    this._mounted = true;
    console.log('Compontent mounted');
    this.updaterID = setInterval(
      () => {
        if(this._mounted) {
          console.log('Retrieve');
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

  refresh (value) {
    let dates = [];
    let data = [];
    if (value !== null) {
        let scoreObject = JSON.parse(value);
        // the data is fetched successfully
        let weeks = Object.keys(scoreObject).sort().slice(-6);
        console.log("weeks = "+weeks.length);
        //TODO include missing weeks
        weeks.forEach(entry => {
          dates.push(entry);
          //calculate average score
          let score = scoreObject[entry];
          let exercises = 0;
          let sum = 0;
          Object.keys(score).forEach(function (element) {
              sum += score[element]?score[element]:0;
              exercises += score[element]?1:0;
          });
          data.push(sum/exercises);
        });
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

  render() {
    if(this.state.labels.length < 1 || this.state.data.length < 1) {
      return (<Text style={this.getStyle().sectionDescription}>No data to visualize</Text>);
    }
    return (
      <View style={Theme.chart}>
      <BarChart
        data={{
          labels: this.state.labels,
          datasets: [
            {
              data: this.state.data
            }
          ]
        }}
        width={Dimensions.get("window").width-16} // from react-native
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
        style={this.getStyle().container}
      />
      </View>
    );
  }
}

export default OverallScoreGraph;
