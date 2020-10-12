/**
 *
 * @format
 * @flow
 */

import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import AbstractGraph from './abstractGraph';
import {LineChart} from 'react-native-chart-kit';
import {Color, Theme} from 'components/stylesheet.js';

class PerformanceGraph extends AbstractGraph {
  constructor(props) {
    super(props);
    this.state.dataType = 'weight';
  }

  render() {
    if (this.state.labels.length < 1 || this.state.data.length < 1) {
      return <Text style={this.getStyle().sectionDescription}>No data to visualize</Text>;
    }
    return (
      <View style={Theme.chart}>
        <LineChart
          data={{
            labels: this.state.labels,
            datasets: [
              {
                data: this.state.data,
              },
            ],
          }}
          width={Dimensions.get('window').width - 16} // from react-native
          height={Dimensions.get('window').height / 3}
          yAxisSuffix="kg"
          chartConfig={{
            backgroundGradientFrom: Color.mainBackgroundColor,
            fillShadowGradient: Color.graphShadowColor,
            fillShadowGradientOpacity: 0.4,
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(77, 188, 94, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(77, 188, 94, ${opacity})`,
            style: {
              borderRadius: 2,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '4',
              stroke: Color.textColor,
            },
          }}
          bezier
          style={this.getStyle().container}
        />
      </View>
    );
  }
}

export default PerformanceGraph;
