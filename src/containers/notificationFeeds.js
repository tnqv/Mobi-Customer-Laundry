import React, { Component } from 'react';
import {View,FlatList , StyleSheet} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import colors from '../config/colors';
import * as appActions from '../actions';
import {Container,Header,Left,Body,Title,Text,Right, Content,List,ListItem,Icon,Button} from 'native-base';


const getStepIndicatorIconConfig = (item) => {
  const iconConfig = {
    name: 'feed',
    style: {
      // color: colorIconDefine(stepStatus)
      color: colors.white,
    },
    size: 20,
  };
  switch (defineStepIndicatorByStatusId(item.notification_type_id)) {

    case 0:{
        iconConfig.name = 'maximize';
        iconConfig.type = 'Feather';
      }

      break;
      //
    case 1: {
      iconConfig.name = 'truck';
      iconConfig.type = 'FontAwesome';
      iconConfig.active = true;
      break;
    }
    case 2: {
      iconConfig.name = 'local-laundry-service';
      iconConfig.type = 'MaterialIcons';
      iconConfig.active = true;
      break;
    }
    case 3: {
      iconConfig.name = 'local-shipping';
      iconConfig.type = 'MaterialIcons';
      iconConfig.active = true;
      break;
    }
    case 4:{
      iconConfig.name = 'check-circle';
      iconConfig.type = 'MaterialIcons';
      iconConfig.active = true;
      break;
    }
    case 5: {
      iconConfig.name = 'info-circle';
      iconConfig.type = 'FontAwesome';
      iconConfig.active = true;
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};

function defineStepIndicatorByStatusId (statusId){
  if(statusId === 1 || statusId === 2 || statusId === 3){
        return 0;
  }else if(statusId === 4 || statusId === 5){
        return 1;
  }else if(statusId === 6 || statusId === 7){
        return 2;
  }else if(statusId === 8){
        return 3;
  }else if(statusId === 9){
        return 4;
  }else {
        return 5;
  }

}

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
    if(this.props.login.token !== ''){
      this.props.onLoadNotifications({userId : userIdFromState, token : tokenFromState});
    }

  }

  onRefresh() {
    let tokenFromState = this.props.login.token;
    let userIdFromState = this.props.login.user.ID;
    if(this.props.login.token !== ''){
      this.props.onLoadNotifications({userId : userIdFromState, token : tokenFromState});
    }
  }

  _renderItem = ({item,index,section}) => {
    let date = new Date(item.CreatedAt);
    let formatOptions = {
            day:    '2-digit',
            month:  '2-digit',
            year:   'numeric',
            hour:   '2-digit',
            minute: '2-digit',
            hour12: true
      };
      let dateString = date.toLocaleDateString('en-US', formatOptions);
      // => "02/17/2017, 11:32 PM"

      dateString = dateString.replace(',', '')
                            .replace('PM', 'p.m.')
                            .replace('AM', 'a.m.');
    return (
        // <ListItem avatar style={[ item.read ? styles.read : styles.unread ]}>
        <ListItem avatar style={styles.read}>
          <Left>
              <Button style={{ marginLeft: 15,backgroundColor : colors.colorBlueOnLeftTopLogo}}>
                {/* <Icon name="truck" type="FontAwesome"></Icon> */}
                <Icon  {...getStepIndicatorIconConfig(item)} />
              </Button>
              {/* <Icon name="truck" type="FontAwesome" style={{fontSize: 32, color: 'red'}}></Icon> */}
          </Left>
          <Body>
            <Text>{item.content ? item.content : ""}</Text>
            <Text note>{ dateString }</Text>
          </Body>
          {/* <Right>
            <Text note>{dateString}</Text>
          </Right> */}
        </ListItem>
    )

  }


  render() {
    // const { state, actions } = this.props;
    return (
      <Container style={{backgroundColor: colors.lightgray}}>
         {/* {
             this.props.notifications.loading ?
                  <Spinner
                  style={{
                    width: 100,
                    height: 100,
                    left: `50%`,
                    top: `50%`,
                    transform: [{ translateX: -50},{translateY: -50 }],
                    justifyContent:'center',
                    position: 'absolute',}}
                  color='blue'>
                </Spinner> : null

          } */}
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
          <View style={{ flex: 1 }}>
          {this.props.login.token === '' ?  null : <FlatList
              style={{ flex: 1 ,backgroundColor:'transparent'}}
              data={this.props.notifications.data}
              onRefresh={() => this.onRefresh()}
              refreshing={this.props.notifications.loading}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItem}
            />}
            {/* { this.props.notifications.data && this.props.notifications.data.length > 0 ? */}

            {/* : <Text> Chưa có thông báo </Text> } */}

          </View>
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
