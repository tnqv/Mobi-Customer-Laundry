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


import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

class PlaceOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage:0,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
       latitude: this.props.location.latitude,
       longitude: this.props.location.longitude,
      })
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

         this.props.onLocationChanged(newCoordinate);

         this.setState({
          //  latitude,
          //  longitude,
           routeCoordinates: routeCoordinates.concat([newCoordinate]),
           prevLatLng: newCoordinate
         });
       },
       error => console.log(error),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }


  onPageChange(position){
    this.setState({currentPage: position});
  }

  goToPage2(){
    this.setState({currentPage: 2});
  }

  goToPage3(){
    this.setState({currentPage: 3});
  }

  renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  );


  _findMe(){
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        // const {latitude, longitude} = coords

        this.props.onLocationChanged(coords);
        // this.setState({
        //   position: {
        //     latitude,
        //     longitude,
        //   },
        //   region: {
        //     latitude,
        //     longitude,
        //     latitudeDelta: 0.005,
        //     longitudeDelta: 0.001,
        //   }
        // })
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  }

  render() {

    // const { goBack } = this.props.navigation;
    const backAction = NavigationActions.back({
      key: null
    })

    // const { state, actions } = this.props;
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

                {/* <StepIndicator
                  renderStepIndicator={this.renderStepIndicator}
                  customStyles={customStyles}
                  currentPosition={this.state.currentPage}
                  labels={labels}
                  stepCount={4}
                  onPress={(step)=>{
                      console.log(this.viewPager.setPage(step));
                      console.log(this.state.currentPage);
                  }}

                /> */}

                {/* <OrderStepOne></OrderStepOne> */}
                <Content style={{flex:1}}>
                      <View style={{flex:1,height:230,paddingTop: this.state.statusBarHeight}}>
                      <MapView style={styles.map}
                      showsUserLocation={true}
                      onMapReady={this._onMapReady}
                      initialRegion={{
                        latitude: 10.852014,
                        longitude: 106.629380,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                          }}>

                          {!!this.props.location.latitude && !!this.props.location.longitude && <MapView.Marker
                            coordinate={{"latitude":this.props.location.latitude,"longitude":this.props.location.longitude}}
                            title={"Your Location"}
                          />}

                          </MapView>

                      </View>
                      <Form style={{flex:1,marginLeft: 15,marginRight: 15}}>

                        <Item floatingLabel>
                          <Icon active name='home' />
                          <Label>Địa chỉ</Label>
                          <Input />
                        </Item>

                        <Item floatingLabel>
                          <Icon active name='speedometer' />
                          <Label>Số ký của quần áo</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Icon active name='user' type="FontAwesome"/>
                          <Label>Tên người đặt hàng </Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Icon active name='phone' type="FontAwesome" />
                          <Label>Số điện thoại </Label>
                          <Input />
                        </Item>
                        <View style={{marginTop: 30,marginBottom: 30}}>
                          <Item>
                            <Icon name='note' type="MaterialIcons" />
                            <Label>Ghi chú</Label>
                          </Item>
                          <Textarea  style={{marginLeft:15}} bordered rowSpan={4} />
                        </View>
                      </Form>

                      <Button style={{ width:'100%',backgroundColor: colors.colorBlueOnLeftTopLogo}}
                               block
                               onPress={()=>{
                                this.setState({currentPage: 1})
                                this.viewPager.setPage(1);
                               }} ><Text style={{color:colors.white,}}>Tiến hành tạo đơn hàng</Text>
                      </Button>

                  </Content>

            </View>

            {/* <View style={{flex:6}}>
                  <ViewPager
                  style={{flex:1}}
                  ref={(viewPager) => {this.viewPager = viewPager}}
                  onPageSelected={(page) => {this.setState({currentPage:page.position})}}
                  // dataSource={this.state.dataSource}
                  horizontalScroll={false}
                  initialPage={0}
                  >
                  <View>

                    <Button style={{ position: 'absolute', bottom:0, left:0, width:'100%',backgroundColor: colors.colorLogo}}
                               block
                               onPress={()=>{
                                this.setState({currentPage: 1})
                                this.viewPager.setPage(1);
                               }} ><Text style={{color:colors.white,}}>Tiếp tục</Text>
                    </Button>
                  </View>

                  <View>
                    <OrderStepTwo></OrderStepTwo>
                    <Button style={{ position: 'absolute', bottom:0, left:0, width:'100%',backgroundColor: colors.colorLogo}}
                               block
                               onPress={()=>{
                                  this.setState({currentPage: 2})
                                  this.viewPager.setPage(2);
                              }} ><Text style={{color:colors.white,}}>Tiếp tục</Text></Button>

                  </View>
                  <View>
                    <OrderStepThree></OrderStepThree>
                    <Button style={{ position: 'absolute', bottom:0, left:0, width:'100%',backgroundColor: colors.colorLogo}}
                            block
                            onPress={()=>{
                              this.setState({currentPage: 3})
                              this.viewPager.setPage(3);
                            }}>
                              <Text style={{color:colors.white,}}>Xác nhận</Text>
                    </Button>
                  </View>
                  <View>
                      <Image
                            style={{
                                      marginTop: 30,
                                      width: 230,
                                      height:230,
                                      justifyContent:'center',
                                      alignSelf: 'center',
                                      borderColor: '#d6d7da',
                                      }}
                            source={require('../assets/checkbox.png')}>
                      </Image>

                      <Card style={{marginTop:10,marginLeft:15,marginRight:15}}>
                              <CardItem header>
                                    <Text style={{fontWeight: 'bold',fontSize:18}}>
                                        Đơn hàng của bạn đã đăng ký thành công
                                    </Text>
                              </CardItem>
                              <CardItem>
                                    <Text>
                                        Mã đơn hàng: #0123456789 , xin vui lòng giữ mã này để delivery man có thể xác nhận đơn hàng của bạn nhé
                                    </Text>
                              </CardItem>

                        </Card>
                        <Button style={{ position: 'absolute', bottom:0, left:0, width:'100%',backgroundColor: colors.colorLogo}}
                                      block
                                      onPress={()=>{
                                          this.props.navigation.dispatch(backAction);
                                      }}>
                                        <Text style={{color:colors.white,}}>Hoàn tất</Text>
                        </Button>
                  </View>



                  </ViewPager>

            </View> */}



          {/* <StepIndicator
          style={{flex:2}}
            customStyles={customStyles}
            currentPosition={this.state.currentPage}
            labels={labels}
            stepCount={4}
            onPress={(step)=>{
                console.log(this.viewPager.setPage(step));
                console.log(this.state.currentPage);
            }}

          />
          <ViewPager

          style={{flex:24,backgroundColor: colors.black}}
          // ref={(viewPager) => {this.viewPager = viewPager}}
          onPageSelected={(page) => {this.setState({currentPage:page.position})}}
          // dataSource={this.state.dataSource}
          indicator={this._renderTabIndicator()}
          initialPage={1}
          >
          <View><Text>asfsaf</Text></View>
          <View><Text>asfsaf</Text></View>
          <View><Text>asfsaf</Text></View>



          </ViewPager> */}
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(appActions.actions, dispatch)
    onLocationChanged: (location) => {
      dispatch(appActions.actions.locationChanged(location));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);
