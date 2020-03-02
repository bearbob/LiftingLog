'use strict';
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
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  LineChart
} from "react-native-chart-kit";
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class GraphScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <Text>Sample line graph</Text>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={Dimensions.get("window").height/2}
            yAxisLabel="$"
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
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

export default GraphScreen;
