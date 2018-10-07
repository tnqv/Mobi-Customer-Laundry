import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors'
import { Container, Header, Left, Body, Right, Button, Title,Content,Fab, Icon } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class OrderInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'true'
    };
  }

  render() {
    // const { state, actions } = this.props;
    return (
      <Container>
      {
        //Header
      }
       <Header style={{backgroundColor: colors.colorBlueOnLeftTopLogo}}>
        <Left style={{flex: 1}}></Left>

        <Body style={{flex:1,alignItems:'center'}}>
          <Title>Đơn hàng</Title>
        </Body>

        <Right style={{flex: 1}}>

        </Right>
      </Header>
      {
        //Body
      }
      <Content>

      </Content>
      <View style={{ flex: 1 }}>
            <Fab
                  active={this.state.active}
                  direction="up"
                  containerStyle={{ }}
                  style={{ backgroundColor: colors.colorBlueOnLeftTopLogo }}
                  position="bottomRight"
                  // onPress={() => this.props.navigation.navigate('LoginView')}>
                  onPress={() => this.props.navigation.navigate('PlaceOrderView')}>
                  <FontAwesome name="plus" size={12}/>
            </Fab>
      </View>
    </Container>
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


export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);
