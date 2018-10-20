import React, { Component } from 'react';
import {View,FlatList} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import colors from '../config/colors';
import * as appActions from '../actions';
import {Container,Header,Left,Body,Title,Text,Right, Content,List,ListItem,Icon,Button} from 'native-base';


class NotificationFeeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data : [
          {
            "test":'test',
          },
          {
            "test":'test',
          },
          {
            "test":'test',
          }
        ],
    }
  }

  _renderItem = ({item,index,section}) => {
    return (
      <ListItem avatar>
        <Left>
            <Button style={{ backgroundColor: colors.colorBlueOnLeftTopLogo }}>
              <Icon name="truck" type="FontAwesome"></Icon>
            </Button>
            {/* <Icon name="truck" type="FontAwesome" style={{fontSize: 32, color: 'red'}}></Icon> */}
        </Left>
        <Body>
          <Text>Đơn hàng của bạn vừa được giặt</Text>
          <Text note>Đơn hàng của bạn hiện tại đang trong trạng thái giặt giũ</Text>
        </Body>
        <Right>
          <Text note>3:43 pm</Text>
        </Right>
      </ListItem>
    )

  }


  render() {
    // const { state, actions } = this.props;
    return (
      <Container style={{backgroundColor: colors.lightgray}}>
          {
            //Header
          }
          <Header style={{backgroundColor: colors.colorBlueOnLeftTopLogo}}>
            <Left style={{flex: 1}}></Left>

            <Body style={{flex:1,alignItems:'center'}}>
              <Title>Thông báo</Title>
            </Body>

            <Right style={{flex: 1}}>

            </Right>
          </Header>
          {
            //Body
          }
          <Content style={{ flex: 1 }}>

            <FlatList
              style={{ flex: 1 ,backgroundColor:colors.white}}
              data={this.state.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItem}
            />

          </Content>
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


export default connect(mapStateToProps, mapDispatchToProps)(NotificationFeeds);
