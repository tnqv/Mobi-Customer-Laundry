import React, { Component } from 'react';
import {View,FlatList , StyleSheet} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import colors from '../config/colors';
import * as appActions from '../actions';
import {Container,Header,Left,Body,Title,Text,Right, Content,List,ListItem,Icon,Button} from 'native-base';


class NotificationFeeds extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     data : [
    //       {
    //         "notification_type_id": 1,
    //         "read": false,
    //         "content": "Bạn vừa tạo đơn hàng mới",
    //         "user_id": 15
    //       },
    //     ],
    // }
  }
  componentDidMount(){
    let tokenFromState = this.props.login.token;
    let userIdFromState = this.props.login.user.ID;
    this.props.onLoadNotifications({userId : userIdFromState, token : tokenFromState});
  }

  _renderItem = ({item,index,section}) => {
    return (
        <ListItem avatar style={[ item.read ? styles.read : styles.unread ]}>
          <Left>
              <Button style={{ marginLeft: 15,backgroundColor : colors.colorBlueOnLeftTopLogo}}>
                <Icon name="truck" type="FontAwesome"></Icon>
              </Button>
              {/* <Icon name="truck" type="FontAwesome" style={{fontSize: 32, color: 'red'}}></Icon> */}
          </Left>
          <Body>
            <Text>{item.content}</Text>
            <Text note>{ item.content }</Text>
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
              style={{ flex: 1 ,backgroundColor:'transparent'}}
              data={this.props.notifications.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItem}
            />

          </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
      read: {
          backgroundColor: colors.white,
          marginLeft: 0,
      },
      unread: {
          backgroundColor: colors.colorUnreadNotification,
          marginLeft: 0,
      }
});


function mapStateToProps(state) {
  return {
    state: state,
    login: state.login,
    notifications : state.notifications,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(appActions.actions, dispatch)
    onLoadNotifications: (params) => {
      dispatch(appActions.actions.notificationsRequest(params));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(NotificationFeeds);
