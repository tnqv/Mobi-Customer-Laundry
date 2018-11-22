import React, { Component } from 'react';
import {View,PermissionsAndroid,FlatList,RefreshControl} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors';
import { Container, Header, Left, Body, Right, Title,Content,Fab, Button,Card,CardItem,Text,Icon, Footer, } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { requestLocationPermission } from '../config/requestPermission';
import StepIndicator from 'react-native-step-indicator';


const labels = ["Xác nhận","Đã lấy đồ","Đang giặt","Giao hàng","Hoàn tất"];
const customStyles = {
  stepIndicatorSize: 50,
  currentStepIndicatorSize:50,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 0,
  stepStrokeCurrentColor: colors.colorBlueOnLeftTopLogo,
  stepStrokeWidth: 0,
  // stepStrokeFinishedColor: colors.colorLogo,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: colors.colorBlueOnLeftTopLogo,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: colors.white,
  stepIndicatorUnFinishedColor: colors.white,
  stepIndicatorCurrentColor: colors.colorBlueOnLeftTopLogo,
  stepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  currentStepIndicatorLabelFontSize: 13,
  labelColor: colors.gray,
  labelSize: 12,
  currentStepLabelColor: colors.colorBlueOnLeftTopLogo,

}

function colorIconDefine(stepStatus){
    if(stepStatus === 'finished'){
        return colors.colorBlueOnLeftTopLogo
    }else if(stepStatus === 'unfinished'){
        return colors.gray
    }else{
        return colors.white
    }
}

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'feed',
    style: {
      color: colorIconDefine(stepStatus)
      // color: colors.colorBlueOnLeftTopLogo,
    },
    size: 20,
  };
  switch (position) {
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
    }

}


class OrderInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      active: 'true',
    };
  }

  componentDidMount(){
        let tokenFromState = this.props.login.token;
        let userIdFromState = this.props.login.user.ID;
        this.props.onLoadOrders({userId : userIdFromState, token : tokenFromState, page: this.state.page});
  }
  _renderStepIndicator = params => (

    // <MaterialIcon {...getStepIndicatorIconConfig(params)} />
         <Icon  {...getStepIndicatorIconConfig(params)} />
        //  type="FontAwesome" name="home" />getStepIndicatorIconConfig(params)
  );


  _renderItem = ({item,index,section}) => {
    return (

      <Card style={{ marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20 }}>

            <View style={{marginTop:15,
                          marginBottom:0,
                          flexDirection: 'row',
                          alignContent:'flex-start',
                          marginLeft: 20,
                          marginRight: 20}}>
              <Left style={{flexDirection: 'row', textAlign: 'left', textAlignVertical: 'center',flex:3}}>
                  <Text style={{color: colors.gray, fontWeight: 'bold',fontSize:18}}>Mã hoá đơn</Text>
                  <Text> - </Text>
                  <Text style={{color: colors.gray}}>#{item.order_code}</Text>
              </Left>
              <Right style={{flex:1}}>
                <Text>{item.total}đ</Text>
              </Right>
            </View>

            { item.order_status_list.length > 0 ?
            <CardItem bordered style={{marginLeft: 10}}>
                <Text style={{color: colors.colorBlueOnLeftTopLogo}}>{(item.order_status_list[0].description === '' || item.order_status_list[0].description === undefined) ? '' : item.order_status_list[0].description}</Text>
            </CardItem>
              : null }

            { item.order_status_list.length > 0  ?
            <View style={{marginTop: 20, marginBottom: 20}}>
              <StepIndicator
                      renderStepIndicator={this._renderStepIndicator}
                      customStyles={customStyles}
                      currentPosition={defineStepIndicatorByStatusId(item.order_status_list[0].status_id)}
                      labels={labels}
                      stepCount={5}
                    />
            </View> : null
            }

            <CardItem footer bordered style={{justifyContent:"flex-end"}}>
                <Right>
                    <Button style={{borderColor:colors.colorBlueOnLeftTopLogo,
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    backgroundColor: colors.white}}
                            onPress={()=>{
                                this.props.navigation.navigate('OrderDetail',{
                                  orderId: item.ID,
                                  orderParam: item,
                                });
                            }}>
                      <Text style={{color: colors.colorBlueOnLeftTopLogo}}>Chi tiết</Text>
                    </Button>
                </Right>
            </CardItem>
      </Card>
    )

  }

  onScrollHandler(){
    // if (!this.onEndReachedCalledDuringMomentum) {

    //   this.onEndReachedCalledDuringMomentum = true;
    // }
    this.setState({
      page: this.state.page + 1
    }, () => {
        let tokenFromState = this.props.login.token;
        let userIdFromState = this.props.login.user.ID;
        this.props.onLoadOrders({userId : userIdFromState, token : tokenFromState, page: this.state.page});
    });

  }

  onRefresh() {
      let tokenFromState = this.props.login.token;
      let userIdFromState = this.props.login.user.ID;
      this.props.onLoadOrders({userId : userIdFromState, token : tokenFromState, page: 0});
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
          <Title>Đơn hàng</Title>
        </Body>

        <Right style={{flex: 1}}>

        </Right>
      </Header>
      {
        //Body
      }
      <View style={{ flex: 1 }}
                // contentContainerStyle={{flex:1}}
                //     refreshControl={
                //         <RefreshControl refreshing={this.props.placedorders.loading}
                //             onRefresh={() => this.onRefresh()}
                //             />
                    // }>
                    >

        <FlatList
          style={{ flex: 1}}
          data={this.props.placedorders.data}
          onRefresh={() => this.onRefresh()}
          refreshing={this.props.placedorders.loading}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          onEndReached={(distance) => {
            if(this.props.placedorders.data.length % 10 === 0) this.onScrollHandler()
          }}
          onEndReachedThreshold={0.5}
          // onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        />

      </View>
      <View>
            <Fab
                  active={this.state.active}
                  direction="up"
                  containerStyle={{ }}
                  style={{ backgroundColor: colors.colorBlueOnLeftTopLogo }}
                  position="bottomRight"
                  // onPress={() => this.props.navigation.navigate('OrderDetail')}
                  onPress={async () => {
                        const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

                        if (granted) {
                          if(this.props.login.token === ''){
                            this.props.navigation.navigate('LoginView',{
                              from: 'orderInfo',
                            });
                          }else{
                            this.props.navigation.navigate('PlaceOrderView');
                          }
                        }
                        else {
                          requestLocationPermission();
                        }
                      }
                  }>
                  <FontAwesome name="plus" size={12}/>
            </Fab>
      </View>
    </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    state: state,
    login: state.login,
    placedorders: state.placedorders,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(appActions.actions, dispatch)
      onLoadOrders: (params) => {
        dispatch(appActions.actions.placedOrdersRequest(params));
      },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);
