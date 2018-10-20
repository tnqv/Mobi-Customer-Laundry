import React, { Component } from 'react';
import {View,Text} from 'react-native';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { state, actions } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Order settings</Text>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions.actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
