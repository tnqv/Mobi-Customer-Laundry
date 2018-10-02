import React, { Component } from 'react';
import {View,Text} from 'react-native';

export default class NotificationFeeds extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { state, actions } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Notification list</Text>
      </View>
    );
  }
}