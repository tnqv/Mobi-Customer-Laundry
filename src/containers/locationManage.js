import React, { Component } from 'react';
import {View, Image, FlatList,SectionList,StyleSheet,TouchableOpacity,NativeModules} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors';

import Swiper from 'react-native-swiper';

import { Container, Header, Left, Body, Right, Thumbnail, Card, CardItem, Title,Content, List, ListItem,Icon,Text,Button,SwipeRow } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import MapView,{ AnimatedRegion,Marker } from 'react-native-maps';

const SweetAlertNative = NativeModules.RNSweetAlert;

class LocationManage extends Component {

  constructor(props) {
    super(props);
    this.state = {
       updateVisible: false,
    }
  }

  _showNormalDialog(shippingLocation){
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
          contentText: `Bạn có muốn xoá địa chỉ ${shippingLocation.shipping_address} ?`,
          cancellable: true,
        },
        successCallback =>{
            this.props.onDeletePress(this.props.login.token,this.props.login.user.ID,shippingLocation.ID);
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

  async componentDidMount () {

  }

  _renderItem = ({item,index,section}) => {
    // let coordinate =  {
    //       latitude: item.latitude,
    //       longitude: item.longitude,
    //     }
    return (
          <Card>
                    <CardItem>
                      <Left style={{flex:2}}>
                      <View pointerEvents="none">
                        <MapView
                        style={{width:100,height:100}}

                        // initialRegion={{
                        //   latitude: 10.852014,
                        //   longitude: 106.629380,
                        //   latitudeDelta: 0.1,
                        //   longitudeDelta: 0.1
                        //     }}
                        initialRegion={{
                          latitude: item.latitude,
                          longitude: item.longitude,
                          latitudeDelta: 0.1,
                          longitudeDelta: 0.1}}
                        >
                          <Marker
                                  coordinate={{latitude: item.latitude, longitude: item.longitude}}
                                  title={"Địa điểm của bạn"}
                                />

                        </MapView>
                        </View>
                        <Body>
                          <Text>{item.receiver_name}</Text>
                          <Text note>{item.phone_number}</Text>
                          <Text note>{item.shipping_address}</Text>

                        </Body>
                      </Left>
                      <Right style={{flex:1}}>
                          {/* <Icon type="FontAwesome" name="arrow-left" style={{color:colors.lightgray}}/> */}
                          {this.state.updateVisible ?
                          <Body>

                              <Button success onPress={() => {
                                this.props.navigation.navigate('EditLocation',{
                                  updateShippingLocation: item,
                                });
                              }}>
                                <Icon name="edit" type="FontAwesome" style={{fontSize: 19}} />
                              </Button>

                              <Button danger style={{marginTop: 15}} onPress={() =>{
                                  this._showNormalDialog(item);
                                }
                              }>
                                <Icon name="trash" type="FontAwesome" style={{fontSize: 24}} />
                              </Button>

                          </Body>: null }
                      </Right>
                    </CardItem>
                  </Card>
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
            <Title>Địa chỉ của tôi</Title>
          </Body>

          <Right style={{flex: 1}}>
          {this.state.updateVisible ?
            <TouchableOpacity onPress={()=> {
                this.setState({
                  updateVisible: false,
                })
              }}>

                <Text style={{color:colors.white}}>Xong</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=> {
              this.setState({
                updateVisible: true,
              })
            }}>

                <Text style={{color:colors.white}}>Sửa</Text>
            </TouchableOpacity>
          }
          </Right>
        </Header>
        {
          //Body
        }
        <Content style={{ flex: 1 }}>

           <FlatList
              style={{ flex: 1}}
              data={this.props.locationAddress.userLocation}
              // onRefresh={() => this.onRefresh()}
              // refreshing={this.props.placedorders.loading}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItem}
            />
            <Card>
              <CardItem button onPress={() => {
                  this.props.navigation.navigate('EditLocation',{
                    updateShippingLocation: null,
                  });
                }}>
                  <Left>
                    <Text>Thêm mới</Text>
                  </Left>
                  <Right>
                    <Icon style={{ fontSize: 18 }} name="add-circle" />
                  </Right>

              </CardItem>
            </Card>

        </Content>
      </Container>

    );
  }
}

const styles = StyleSheet.create({

})

function mapStateToProps(state) {
  return {
    state: state,
    login: state.login,
    service: state.service,
    locationAddress: state.locationAddress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(appActions.actions, dispatch),
    onDeletePress: (token,userId,locationId) => {
      dispatch(appActions.actions.deleteUserLocationRequest({token: token, userId: userId,shippingLocationId: locationId}));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationManage);
