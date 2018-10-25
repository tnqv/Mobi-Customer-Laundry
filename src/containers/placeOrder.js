import React, { Component } from 'react';
import {View,Text,Image, StyleSheet, Platform,Dimensions, TouchableOpacity,StatusBar, BackHandler} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors'
import OrderStepOne from '../components/orderStepOne';
import OrderStepTwo from '../components/orderStepTwo';
import OrderStepThree from '../components/orderStepThree';
import { Card, CardItem, Header, Left, Body, Right, Button, Title,Textarea,Content,Label, Icon, Item, Input,Form } from 'native-base';
import { ViewPager } from 'rn-viewpager';
import StepIndicator from 'react-native-step-indicator';
import { NavigationActions } from 'react-navigation';
import MapView,{ AnimatedRegion } from 'react-native-maps';
import NavigatorService from '../services/navigator';
import Geocoder from 'react-native-geocoder';


import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

class PlaceOrder extends Component {

  constructor(props) {
    super(props);
    // this.state = { usernameInput: '', passwordInput: '' };

    // this.onCreatedPressed = this.onCreatedPressed.bind(this);
    this.state = {
      currentPage:0,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
       latitude: this.props.location.latitude,
       longitude: this.props.location.longitude,
      }),
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      capacity: '',
      deliveryAddress : '',
      deliveryLongitude: '',
      deliveryLatitude: '',
      receiverName: '',
      receiverPhone: '',
      note: '',
    }
  }

  componentWillReceiveProps(nextProps,nextState) {
    if(nextState.currentPage != this.state.currentPage) {
      if(this.viewPager) {
        this.viewPager.setPage(nextState.currentPage)
      }
    }
  }

  _onMapReady = () => this.setState({statusBarHeight: StatusBar.currentHeight})

  _handleBackPress = () => {
        NavigatorService.goBackToMainTabBar('OrderInfo');
  }

  componentWillMount(){

  }

  componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress',this._handleBackPress);
      navigator.geolocation.clearWatch(this.watchID);

  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',this._handleBackPress);
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };
        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
           }
         } else {
           coordinate.timing(newCoordinate).start();
         }
         let region = {
          latitude:       newCoordinate.latitude,
          longitude:      newCoordinate.longitude,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5
        }
        this.onRegionChange(region, region.latitude, region.longitude);
        //  this.props.onLocationChanged(newCoordinate);

        //  this.setState({
        //   //  latitude,
        //   //  longitude,
        //    routeCoordinates: routeCoordinates.concat([newCoordinate]),
        //    prevLatLng: newCoordinate
        //  });
       },
       error => console.log(error),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  async onRegionChange(region, lastLat, lastLong) {
    try{
      if(lastLat && lastLong){
        let location = {
          lat: lastLat,
          lng: lastLong
        }
        const res = await Geocoder.geocodePosition(location);
        if(typeof res != 'undefined' && res){
          if(res.length > 0){
            let address = res[0].formattedAddress;
            this.setState({
                deliveryAddress : address,
            });
          }

        }
      }

    }catch(error){
      console.log(error);
    }

    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });


  }

  renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  );

  render() {

    return (
      <View  style={{flex:1,backgroundColor: colors.white}}>
          <Header style={{backgroundColor: colors.colorBlueOnLeftTopLogo}}>
              <Left style={{flex: 1}}></Left>

              <Body style={{flex:1,alignItems:'center'}}>
                <Title>Tạo đơn hàng</Title>
              </Body>

              <Right style={{flex: 1}}/>
          </Header>
            {

            }
            <View  style={{flex:1}}>
                <Content style={{flex:1}}>
                      <View style={{flex:1,height:230,paddingTop: this.state.statusBarHeight}}>
                      <MapView style={styles.map}
                      showsUserLocation={true}
                      showsMyLocationButton={true}
                      region={this.state.mapRegion}
                      showsUserLocation={true}
                      followUserLocation={true}
                      onRegionChange={this.onRegionChange.bind(this)}
                      onMapReady={this._onMapReady}
                      initialRegion={{
                        latitude: 10.852014,
                        longitude: 106.629380,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                          }}>

                          {!!this.state.lastLat && !!this.state.lastLong && <MapView.Marker
                            coordinate={{"latitude":this.state.lastLat,"longitude":this.state.lastLong}}
                            title={"Địa điểm của bạn"}
                          />}

                          </MapView>

                      </View>
                      <Form style={{flex:1,marginLeft: 15,marginRight: 15}}>

                        <Item floatingLabel>
                          <Icon active name='home' />
                          <Label>Địa chỉ*</Label>
                          <Input
                            onChangeText={(text) => this.setState({ deliveryAddress: text })}
                            value={this.state.deliveryAddress} />
                        </Item>

                        <Item floatingLabel>
                          <Icon active name='speedometer' />
                          <Label>Số ký của quần áo*</Label>
                          <Input
                          onChangeText={(text) => this.setState({ capacity: text })}
                          value={this.state.capacity} />
                        </Item>
                        <Item floatingLabel>
                          <Icon active name='user' type="FontAwesome"/>
                          <Label>Tên người đặt hàng* </Label>
                          <Input
                            onChangeText={(text) => this.setState({ receiverName: text })}
                            value={this.state.receiverName}/>
                        </Item>
                        <Item floatingLabel>
                          <Icon active name='phone' type="FontAwesome" />
                          <Label>Số điện thoại* </Label>
                          <Input
                            onChangeText={(text) => this.setState({ receiverPhone: text })}
                            value={this.state.receiverPhone}/>
                        </Item>
                        <View style={{marginTop: 30,marginBottom: 30}}>
                          <Item>
                            <Icon name='note' type="MaterialIcons" />
                            <Label>Ghi chú</Label>
                          </Item>
                          <Textarea  style={{marginLeft:15}} bordered rowSpan={4}
                                     onChangeText={(text) => this.setState({ note: text })}
                                     value={this.state.note}/>
                        </View>
                      </Form>

                      <Button style={{ width:'100%',backgroundColor: colors.colorBlueOnLeftTopLogo}}
                               block
                               onPress={()=>{
                                  let capacityReq = this.state.capacity;
                                  let deliveryAddrReq= this.state.deliveryAddress;
                                  let deliveryLatitudeReq = this.state.lastLat;
                                  let deliveryLongitudeReq = this.state.lastLong;
                                  let receiverNameReq = this.state.receiverName;
                                  let receiverPhoneReq = this.state.receiverPhone;
                                  let noteReq = this.state.note;

                                  if(capacityReq === ''){
                                    alert('Xin vui lòng nhập số kg quần áo !');
                                    return;
                                  }

                                  if(deliveryAddrReq === ''){
                                    alert('Xin vui lòng nhập địa chỉ giao/nhận đồ');
                                    return;
                                  }

                                  if(deliveryLatitudeReq === '' || deliveryLongitudeReq === ''){
                                    alert('Địa chỉ trên bản đồ không hợp lệ');
                                    return;
                                  }

                                  if(receiverNameReq === '' || receiverPhoneReq === ''){
                                    alert('Xin vui lòng nhập tên và số điện thoại người tạo đơn');
                                    return;
                                  }

                                  let placedOrder = {
                                    'estimated_capacity' : parseInt(capacityReq),
                                    'delivery_address' : deliveryAddrReq,
                                    'delivery_latitude' : deliveryLatitudeReq,
                                    'delivery_longitude': deliveryLongitudeReq,
                                    'receiver_name': receiverNameReq,
                                    'receiver_phone': receiverPhoneReq,
                                    'note': noteReq,
                                    'user_id': parseInt(this.props.login.user.ID),
                                  }
                                  console.log(placedOrder);
                                  this.props.onCreatedPressed(this.props.login.token,placedOrder);
                               }} >
                          <Text style={{color:colors.white,}}>Tiến hành tạo đơn hàng</Text>
                      </Button>

                  </Content>

            </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  map : {
    flex:1,
  },
  mapButton: {
    width: 75,
    height: 75,
    borderRadius: 85/2,
    backgroundColor: 'rgba(252, 253, 253, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 8,
    shadowOpacity: 0.12,
    opacity: .6,
    zIndex: 10,
  }

});

function mapStateToProps(state) {
  return {
    state: state,
    location: state.location,
    login: state.login,
    placedorders: state.placedorders
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(appActions.actions, dispatch)
    onLocationChanged: (location) => {
      dispatch(appActions.actions.locationChanged(location));
    },
    onCreatedPressed: (token,placedOrderModel)=>{
      dispatch(appActions.actions.createNewPlacedOrderRequest({token: token,params: placedOrderModel}));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);
