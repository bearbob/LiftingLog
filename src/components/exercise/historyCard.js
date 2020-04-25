/**
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { getLastLogs, formatDate } from 'components/utils';
import { retrieveData } from 'components/storage';
import { Theme } from 'components/stylesheet';


class ExerciseHistoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      lines: this.props.lines?this.props.lines:8
    };
    this.refresh = this.refresh.bind(this);
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
      3000
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
    let last = null;
    if (value !== null) {
        let item = JSON.parse(value);
        last = getLastLogs(item, this.state.lines);
    }
    this.setState({
      lastLogs: last
    });
  }

  renderLastLogs() {
    if(this.state.lastLogs) {
      var items = [];
      for (let i=0; i < this.state.lastLogs.length; i++) {
        let value = this.state.lastLogs[i];
        items.push(
          <View style={Theme.sectionContainer} key={"lastLogs_v"+i}>
            <Text style={Theme.sectionTitle} key={"lastLogs_t"+i}>
              {formatDate(new Date(value.date), true)+": "}
            </Text>
            <Text style={Theme.sectionDescription} key={"lastLogs_d"+i}>
              {value.weight + "kg x" +value.reps}
            </Text>
          </View>
        );
      }
      return items;
    }
    return (<Text style={Theme.sectionDescription}>No recent logs available. Such lonely.</Text>);
  }

  render() {
    return (
      <View style={Theme.maincontainer}>
      <Text style={Theme.title}>Last logs</Text>
      {this.renderLastLogs()}
      </View>
    );
  }
}

export default ExerciseHistoryCard;
