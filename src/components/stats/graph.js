/**
 * Defines the exercise cards with weight and rep tracks
 *
 * @format
 * @flow
 */

import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { retrieveData } from 'components/storage';
import { getLastLogs, getWeekNumber } from 'components/utils';

class PerformanceGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      labels: ["No data"], //if no data found, give an error message instead of the graph
      data: [1] //if no data found, give an error message instead of the graph
    };
    retrieveData(this.props.id, (value) => {
      if (value !== null) {
          let item = JSON.parse(value);
          // Our data is fetched successfully
          let last = getLastLogs(item, 6).reverse();
          let dates = [];
          let weight = [];
          last.forEach(entry => {
            dates.push(getWeekNumber(entry.date));
            weight.push(entry.weight);
          });
          console.log("Dates="+dates.length+"; weights="+weight.length);
          this.setState({
            labels: dates,
            data: weight
          });
          console.log("Labels="+this.state.labels.length+"; data="+this.state.data.length);
      }
    });
  }

  render() {
    return (
      <LineChart
        data={{
          labels: this.state.labels,
          datasets: [
            {
              data: this.state.data
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={Dimensions.get("window").height/2}
        yAxisLabel="kg"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#0c6340",
          backgroundGradientFrom: "#14A76C",
          backgroundGradientTo: "#0c6340",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#00a726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 0
        }}
      />
    );
  }
}

export default PerformanceGraph;
