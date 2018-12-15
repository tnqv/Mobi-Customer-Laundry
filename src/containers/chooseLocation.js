import React, { Component } from 'react';
import {View, Image, FlatList,SectionList,StyleSheet,TouchableOpacity} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors';

import Swiper from 'react-native-swiper';

import { Container, Header, Left, Body, Right, Thumbnail, Card, CardItem, Title,Content, List, ListItem,Icon,Text,Button } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import MapView,{ AnimatedRegion,Marker } from 'react-native-maps';

class ChooseLocation extends Component {

  constructor(props) {
    super(props);
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
          <CardItem button onPress={() => {
            console.log(item);
                    this.props.changeOrderLocation(item);

                }}>
            <Left style={{flex:2}}>
              <View pointerEvents="none">
                <MapView
                style={{width:100,height:100}}
                initialRegion={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1}}>
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
            { this.props.locationAddress.chosenLocation.ID === item.ID ?
              <Icon type="FontAwesome" name="check" style={{color:colors.lightGreen}}/> : null }

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

            <TouchableOpacity onPress={()=> {
                this.props.navigation.navigate('LocationManage')
            }}>

                <Text style={{color:colors.white}}>Sửa</Text>
            </TouchableOpacity>

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

            {/* <Card>
              <CardItem button onPress={() => {
                  this.props.navigation.navigate('EditLocation');
                }}>
                  <Left>
                    <Text>Thêm mới</Text>
                  </Left>
                  <Right>
                    <Icon style={{ fontSize: 18 }} name="add-circle" />
                  </Right>

              </CardItem>
            </Card> */}

        </Content>
        <Button
          onPress={()=>{
              this.props.navigation.pop();
          }}
          style={{ width:'100%',backgroundColor: colors.colorBlueOnLeftTopLogo,}}
          // position: 'absolute',bottom: 0,left: 0,}}

          block>
            <Text style={{color:colors.white,}}>Hoàn tất</Text>
        </Button>
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
    changeOrderLocation: (location) => {
        dispatch(appActions.actions.changeUserLocation({newLocation: location}))
    },

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ChooseLocation);
