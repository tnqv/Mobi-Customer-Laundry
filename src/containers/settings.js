import React, { Component } from 'react';
import {View,Text} from 'react-native';

export default class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { state, actions } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>User settings</Text>
      </View>
    );
  }
}