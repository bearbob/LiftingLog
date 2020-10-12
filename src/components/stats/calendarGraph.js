/**
 *
 * @format
 * @flow
 */

import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import {Color, Theme} from 'components/stylesheet.js';
import {retrieveData} from 'components/storage';

class CalendarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 'calendar',
      data: [],
    };
    this.refresh = this.refresh.bind(this);
    retrieveData('calendar', this.refresh);
  }

  componentDidMount() {
    this._mounted = true;
    this.updaterID = setInterval(() => {
      if (this._mounted) {
        retrieveData(this.state.id, this.refresh);
      }
    }, 5000);
  }

  componentWillUnmount() {
    this._mounted = false;
    clearInterval(this.updaterID);
  }

  refresh(value) {
    let data = [];
    if (value !== null) {
      let dates = JSON.parse(value);
      // Our data is fetched successfully
      for (let i = 0; i < dates.length; i++) {
        data.push({date: dates[i], count: 1});
      }
    }
    this.setState({
      data: data,
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
        color: Color.buttonBackgroundColor,
      },
    });
  }

  getColor(opacity = 1) {
    if (Number.isNaN(opacity)) {
      opacity = 1;
    }
    return `rgba(77, 188, 94, ${opacity})`;
  }

  render() {
    if (this.state.data.length < 1) {
      return <Text style={this.getStyle().sectionDescription}>No data to visualize</Text>;
    }
    return (
      <View style={Theme.chart}>
        <Text style={Theme.sectionDescription}>Logged {this.state.data.length} lifts</Text>
        <ContributionGraph
          values={this.state.data}
          endDate={new Date()}
          numDays={90}
          width={Dimensions.get('window').width - 16} // from react-native
          height={Dimensions.get('window').height / 3}
          chartConfig={{
            backgroundGradientFrom: Color.chartBackgroundColor,
            backgroundGradientTo: Color.chartBackgroundColor,
            fillShadowGradient: Color.graphShadowColor,
            fillShadowGradientOpacity: 0.4,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: this.getColor,
            labelColor: this.getColor,
            style: {
              borderRadius: 1,
            },
          }}
          style={this.getStyle().container}
        />
      </View>
    );
  }
}

export default CalendarGraph;
