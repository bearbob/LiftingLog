/**
 * Defines the exercise cards with weight and rep tracks
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Dimensions,
  Text,
  View
} from 'react-native';
import AbstractGraph from './abstractGraph';
import { BarChart } from "react-native-chart-kit";
import { Color, Theme } from 'components/stylesheet.js';

class ScoreGraph extends AbstractGraph {
  constructor(props) {
    super(props);
    this.state.dataType = 'score';
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

export default ScoreGraph;
