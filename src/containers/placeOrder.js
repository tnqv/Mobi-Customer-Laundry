import React, { Component } from 'react';
import {View,Text,Image, StyleSheet, Platform,Dimensions, TouchableOpacity,StatusBar, BackHandler,NativeModules,PermissionsAndroid,TouchableHighlight} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors'
import OrderStepOne from '../components/orderStepOne';
import OrderStepTwo from '../components/orderStepTwo';
import OrderStepThree from '../components/orderStepThree';
import { Card, CardItem, Header, Left, Body, Right, Button, Title,Textarea,Content,Label, Icon, Item, Input,Form,Spinner } from 'native-base';
import { ViewPager } from 'rn-viewpager';
import StepIndicator from 'react-native-step-indicator';
import { NavigationActions } from 'react-navigation';
import MapView,{ AnimatedRegion,Marker } from 'react-native-maps';
import NavigatorService from '../services/navigator';
import Geocoder from 'react-native-geocoder';


// import SweetAlert from 'react-native-sweet-alert';


import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// import SweetAlert from 'react-native-sweet-alert';

const SweetAlertNative = NativeModules.RNSweetAlert;

class PlaceOrder extends Component {

  constructor(props) {
    super(props);
    // this.state = { usernameInput: '', passwordInput: '' };

    // this.onCreatedPressed = this.onCreatedPressed.bind(this);
    this.state = {
      loading: false,
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
      marker: {},
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

  _handleBackPress(){
        NavigatorService.reset('MainTabBar');
  }

  componentWillMount(){

  }

  componentWillUnmount(){
      // BackHandler.removeEventListener('hardwareBackPress',this._handleBackPress);
      navigator.geolocation.clearWatch(this.watchID);

  }

  async _findMe(){
    if(Platform.OS === 'android'){
      const granted = await PermissionsAndroid.check("android.permission.ACCESS_FINE_LOCATION");
      if(!granted){
        alert("not granted");
        return;
      }
    }
    navigator.geolocation.getCurrentPosition(async (position) => {

        const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
        const { latitude, longitude } = position.coords;

        let location = {
          lat: latitude,
          lng: longitude
        }
        this.getLocationWithGeoLocation(location);
        //  this.props.onLocationChanged(newCoordinate);

        //  this.setState({
        //   //  latitude,
        //   //  longitude,
        //    routeCoordinates: routeCoordinates.concat([newCoordinate]),
        //    prevLatLng: newCoordinate
        //  });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000 }

    );
  }

  async getLocationWithGeoLocation(location){
    this.setState({loading:true});
    const res = await Geocoder.geocodePosition(location);
    if(typeof res != 'undefined' && res){
      if(res.length > 0){
        let address = res[0].formattedAddress;
        this.setMarkerToMap(location,address);
        this.setState({
            deliveryAddress : address,
            loading: false,
        });
      }
    }
    console.log(res);
  }

  setMarkerToMap(location,address){
      this.setState({
        marker: {
          coordinate : {
              latitude : location.lat,
              longitude : location.lng,
          },
          title: address
        }
      })
  }

  componentDidMount(){
    // BackHandler.addEventListener('hardwareBackPress',this._handleBackPress);
    // navigator.geolocation.getCurrentPosition(async (position) => {

    //     const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
    //     const { latitude, longitude } = position.coords;

    //     let location = {
    //       lat: latitude,
    //       lng: longitude
    //     }
    //     // console.log(location);
    //     // getLocationWithGeoLocation(location);

    //     //  this.props.onLocationChanged(newCoordinate);

    //     //  this.setState({
    //     //   //  latitude,
    //     //   //  longitude,
    //     //    routeCoordinates: routeCoordinates.concat([newCoordinate]),
    //     //    prevLatLng: newCoordinate
    //     //  });
    //    },
    //    error => console.log(error),
    //    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }

    // );
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
         let newRegion = {
          latitude:       newCoordinate.latitude,
          longitude:      newCoordinate.longitude,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5
        }

        this.setState({
            region : newRegion
        })
        // this.onRegionChange(region, region.latitude, region.longitude);
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

  // async onRegionChange(region, lastLat, lastLong) {
  //   try{
  //     if(lastLat && lastLong){
  //       let location = {
  //         lat: lastLat,
  //         lng: lastLong
  //       }
  //       const res = await Geocoder.geocodePosition(location);
  //       if(typeof res != 'undefined' && res){
  //         if(res.length > 0){
  //           let address = res[0].formattedAddress;
  //           this.setState({
  //               deliveryAddress : address,
  //           });
  //         }

  //       }
  //     }

  //   }catch(error){
  //     console.log(error);
  //   }

  //   this.setState({
  //     mapRegion: region,
  //     // If there are no new values set the current ones
  //     lastLat: lastLat || this.state.lastLat,
  //     lastLong: lastLong || this.state.lastLong
  //   });


  // }

  _showNormalDialog(placedOrder){
    SweetAlertNative.showSweetAlert(
      {
          title: 'Xác nhận',
          subTitle: '',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          otherButtonTitle: 'Huỷ bỏ',
          otherButtonColor: '#dedede',
          type: 'normal',
          cancelText: "Huỷ bỏ",
          contentText: 'Bạn có xác nhận muốn tạo đơn hàng ?',
          cancellable: true,
        },
        successCallback =>{
          this.props.onCreatedPressed(this.props.login.token,placedOrder);

        },
        errorCallback => {

        }
    )

  }

  showSuccessDialog(message){
    SweetAlertNative.showSweetAlert(
      {
          title: 'Xác nhận',
          subTitle: '',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          type: 'success',
          cancelText: "",
          contentText: message,
          cancellable: false,
        },
        successCallback =>{
            // alert(successCallback);
            NavigatorService.goBackToMainTabBar('OrderInfoStack')
        },
        errorCallback => {
            // alert(errorCallback);
        }
    )
  }

  showErrorDialog(message){
    SweetAlertNative.showSweetAlert(
      {
          title: 'Lỗi xảy ra',
          subTitle: '',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          type: 'error',
          cancelText: "",
          contentText: message,
          cancellable: false,
        },
        successCallback =>{
            // alert(successCallback);
        },
        errorCallback => {
            // alert(errorCallback);
        }
    )
  }

  renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  );

  render() {
    const hitSlop = {
      top: 15,
      bottom:15,
      left:15,
      right:15,
    }

    return (
      <View  style={{flex:1,backgroundColor: colors.white}}>
       {
             this.props.placedorders.loading || this.state.loading ?
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

          }
          {

            this.props.placedorders.createdOrder.data ?
            this.showSuccessDialog(`Bạn đã tạo đơn hàng thành công.\n Mã đơn hàng của bạn là  ${this.props.placedorders.createdOrder.data.order_code}` ) : null
          }

          {
            this.props.placedorders.error ?
            this.showErrorDialog(`${this.props.placedorders.error}`) : null
          }
          <Header style={{backgroundColor: colors.colorBlueOnLeftTopLogo}}>
              <Left style={{flex: 1}}></Left>

              <Body style={{flex:1,alignItems:'center'}}>
                <Title>Tạo đơn hàng</Title>
              </Body>

              <Right style={{flex: 1}}/>
          </Header>
            {

            }
            <View  style={{flex:1,backgroundColor: colors.lightgray}}>
                <Content style={{flex:1}}>
                      {/* <View style={{flex:1,height:230}}>
                      <Text>
                           Nhấn vào vị trí địa điểm bạn muốn ship tới
                      </Text>

                      <MapView style={styles.map}
                      showsUserLocation={true}
                      showsMyLocationButton={true}
                      region={this.state.mapRegion}
                      onPress={(event) => {
                        let location = {
                          lat: event.nativeEvent.coordinate.latitude,
                          lng: event.nativeEvent.coordinate.longitude,
                        }
                        console.log("onpress" );
                        console.log(location);

                        this.getLocationWithGeoLocation(location);

                      }}
                      onMapReady={this._onMapReady}
                      initialRegion={{
                        latitude: 10.852014,
                        longitude: 106.629380,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                          }}>

                          {!!this.state.marker.coordinate && <MapView.Marker
                            coordinate={{"latitude":this.state.marker.coordinate.latitude,"longitude":this.state.marker.coordinate.longitude}}
                            title={"Địa điểm của bạn"}
                          />}

                          </MapView>

                      </View> */}
                       <Card>
                        <CardItem style={{
                           paddingLeft:20,
                           paddingRight:0,
                           paddingTop:20,
                           paddingBottom:0,
                        }}>
                          <Text style={{fontSize: 16,color:colors.black}}>
                              Thông tin địa chỉ giao hàng :
                          </Text>
                        </CardItem>
                        <CardItem style={{
                          paddingLeft:0,
                          paddingRight:20,
                          paddingTop:0,
                          paddingBottom:0,
                        }}>
                          <Left></Left>
                          <Right>
                            <TouchableHighlight
                            onPress={()=>{
                                this.props.navigation.navigate("ChooseLocation");
                            }}>
                                <Text style={{color:colors.colorBlueOnLeftTopLogo}}>Sửa</Text>
                            </TouchableHighlight>

                          </Right>
                        </CardItem>
                        {this.props.locationAddress.chosenLocation ?
                        <CardItem style={{
                           paddingLeft:20,
                           paddingRight:0,
                           paddingTop:0,
                           paddingBottom:20,
                        }}>
                          <Left>
                            <MapView
                            style={{width:100,height:100}}
                            initialRegion={{
                              latitude: this.props.locationAddress.chosenLocation.latitude,
                              longitude: this.props.locationAddress.chosenLocation.longitude,
                              latitudeDelta: 0.1,
                              longitudeDelta: 0.1}}>
                              {/* <Marker
                                      coordinate={{latitude: item.latitude, longitude: item.longitude}}
                                      title={"Địa điểm của bạn"}
                                    /> */}
                                     <Marker
                                        coordinate={{latitude: this.props.locationAddress.chosenLocation.latitude, longitude: this.props.locationAddress.chosenLocation.longitude}}
                                        title={"Địa điểm của bạn"}
                                      />

                            </MapView>

                            <Body>
                              <Text style={{color: colors.black}}>{this.props.locationAddress.chosenLocation.receiver_name}</Text>
                              <Text note>{this.props.locationAddress.chosenLocation.shipping_address}</Text>
                              <Text note>{this.props.locationAddress.chosenLocation.phone_number}</Text>

                            </Body>
                          </Left>
                        </CardItem>:
                        <Text style={{marginLeft: 20,marginRight: 20}}>
                              Hiện tại chưa có địa chỉ, bạn vui lòng bấm vào "sửa" để thêm địa chỉ ship hàng !
                        </Text>
                        }
                      </Card>
                      <Card>
                      <Form style={{flex:1, backgroundColor: colors.white}}>

                        {/* <Item floatingLabel>
                          <Icon active name='home' />
                          <Label>Địa chỉ</Label>
                          <Input
                            onChangeText={(text) => this.setState({ deliveryAddress: text })}
                            value={this.state.deliveryAddress} />
                        </Item> */}

                        <Item floatingLabel>
                          <Icon active name='speedometer' />
                          <Label>Số ký của quần áo</Label>
                          <Input
                          keyboardType="numeric"
                          onChangeText={(text) => this.setState({ capacity: text })}
                          value={this.state.capacity} />
                        </Item>
                        {/* <Item floatingLabel>
                          <Icon active name='user' type="FontAwesome"/>
                          <Label>Tên người đặt hàng</Label>
                          <Input
                            onChangeText={(text) => this.setState({ receiverName: text })}
                            value={this.state.receiverName}/>
                        </Item>
                        <Item floatingLabel>
                          <Icon active name='phone' type="FontAwesome" />
                          <Label>Số điện thoại</Label>
                          <Input
                            onChangeText={(text) => this.setState({ receiverPhone: text })}
                            value={this.state.receiverPhone}/>
                        </Item> */}
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
                      </Card>





                  </Content>
                  <Button
                      onPress={()=>{

                          let capacityReq = this.state.capacity;
                          let deliveryAddrReq= this.props.locationAddress.chosenLocation.shipping_address;
                          let deliveryLatitudeReq = this.props.locationAddress.chosenLocation.latitude;
                          let deliveryLongitudeReq = this.props.locationAddress.chosenLocation.longitude;
                          let receiverNameReq = this.props.locationAddress.chosenLocation.receiver_name;
                          let receiverPhoneReq = this.props.locationAddress.chosenLocation.phone_number;
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

                          if(parseInt(capacityReq) < 0 || parseInt(capacityReq) > 100){
                            alert('Xin vui lòng nhập khối lượng hợp lệ, khối lượng phải lớn hơn 0 và nhỏ hơn 100 ký');
                            return;
                          }

                          if(noteReq.length > 500){
                            alert('Ghi chú vượt quá số ký tự cho phép');
                            return;
                          }

                          let placedOrder = {
                            'capacity' : parseInt(capacityReq),
                            'delivery_address' : deliveryAddrReq,
                            'delivery_latitude' : deliveryLatitudeReq,
                            'delivery_longitude': deliveryLongitudeReq,
                            'receiver_name': receiverNameReq,
                            'receiver_phone': receiverPhoneReq,
                            'note': noteReq,
                            'user_id': parseInt(this.props.login.user.ID),
                          }
                          console.log("test");

                          this._showNormalDialog(placedOrder);
                      }}
                      style={{ width:'100%',backgroundColor: colors.colorBlueOnLeftTopLogo}}
                      block>
                        <Text style={{color:colors.white,}}>Tiến hành tạo đơn hàng</Text>
                    </Button>

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
    placedorders: state.placedorders,
    locationAddress: state.locationAddress,
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
