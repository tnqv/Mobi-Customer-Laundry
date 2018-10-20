import React, { Component } from 'react';
import {View,Text, Image, Dimensions,SectionList,StyleSheet,Platform, PixelRatio} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors';

import Swiper from 'react-native-swiper';


const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;

import { Container, Header, Left, Body, Right, Thumbnail, Card, CardItem, Title,Content, Tabs,Tab, ListItem } from 'native-base';
import MapView from 'react-native-maps';


class ServiceInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data : [
            {
              "name": "Combo Giặt + Sấy + Xả Quần áo",
              "description": "Combo Giặt + Sấy + Xả Quần áo",
              "services": [
                  {
                      "image" : "timthumb.jped",
                      "name": "Từ 1kg - 3kg/Máy/Lượt",
                      "price": 60000,
                      "description": "Giặt ủi theo kg chất lượng cao nè mấy ông"
                  },
                  {
                      "image" : "timthumb.jped",
                      "name": "Từ 3kg - 5kg/Máy/Lượt",
                      "price": 35000,
                      "description": "Giặt ủi theo kg chất lượng cao nè mấy ông"
                  },
                  {
                      "image" : "timthumb.jped",
                      "name": "Từ 5kg - 7kg/Máy/Lượt",
                      "price": 12000,
                      "description": "Giặt ủi theo kg chất lượng cao nè mấy ông"
                  }
              ]
          },
          {
              "name": "Combo Chăn Màn",
              "description": "Combo Chăn Màn",
              "services": [
                  {
                      "image" : "timthumb.jped",
                      "name": "Trọn bộ",
                      "price": 0,
                      "description": ""
                  },
                  {
                      "image" : "timthumb.jped",
                      "name": "2 Chăn Bông",
                      "price": 0,
                      "description": ""
                  }
              ]
          },
          {
              "image" : "timthumb.jped",
              "name": "Combo Thú bông",
              "description": "Combo Thú bông",
              "services": []
          },
          {
              "image" : "timthumb.jped",
              "name": "Dịch vụ giặt hấp (không bao gồm ủi)",
              "description": "Dịch vụ giặt hấp (không bao gồm ủi)",
              "services": []
          },
          {
              "image" : "timthumb.jped",
              "name": "Combo Rèm Cửa",
              "description": "Combo Rèm Cửa",
              "services": []
          }
      ],
      listData: {}
    }
  }

  componentDidMount(){
      // this.state.data = this.props.service.data
  }
  componentWillMount(){
      this.state.listData = this.props.service.data.map(object =>{
          return Object.assign(
            {},
            {
              name: object.name,
              description: object.description,
              data: object.services
            }
          )
      });
  }

  _renderSectionHeader= ({section}) => {
    return(
       <ListItem style={{ marginLeft: 15,marginRight: 15 }}>
          <Body>
            <Text style={{fontWeight: 'bold',fontFamily: 'OpenSans-Bold.ttf'}}>{section.name}</Text>
          </Body>
        </ListItem>
    )
  }

  _renderItem = ({item,index,section}) => {
    return (
      <Card style={{ marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20 }} borderRadius={10}>
                    <CardItem>
                        <Image
                          source={require('../assets/swiper1.jpg')}
                          style={{height: 80, width: 80,marginRight: 25}}
                          borderRadius={50}
                          borderWidth={1}
                          />
                          {/* <FontAwesome
                            name="tshirt"
                            size={70}
                            style={{marginRight: 15}}
                              /> */}

                        <Body>
                          <Text  style={{fontWeight: 'bold',fontFamily: 'OpenSans-Bold.ttf',color: colors.black,fontSize: 18}}>{item.name}</Text>

                          <Text style={{fontSize: 12,marginTop:10}}>{item.description}</Text>

                          <Text style={{fontWeight: 'bold',color: colors.colorBlueOnLeftTopLogo,fontSize: 16,marginTop: 5}}>
                               {item.price} đ
                          </Text>

                        </Body>
                    </CardItem>
        </Card>
    )

  }

  render() {
    // const { state, actions } = this.props;
    return (
      <Container>
        {
          //Header
        }
         {/* <Header style={{backgroundColor: colors.colorLogo}}> */}
         <View style={{ position:'absolute',top:0 ,
                          zIndex: 1000,
                          left:0,
                          right:0,
                          height: platform === "ios" ? 64 : 56,
                          alignItems:'center',
                          backgroundColor: colors.black,
                          // opacity: 0.4,
                          backgroundColor: '#00000050',
                          elevation:0 }}>

            <Text style={{ textAlign: 'center',
                            color: colors.white,
                            textAlignVertical: "center",
                            flex:1,
                            fontWeight: 'bold',
                            opacity:1,
                            fontSize: 20,}}>Trang chính</Text>
          {/* <Left style={{flex: 1}}></Left>

          <Body style={{flex:1,alignItems:'center'}}>
            <Title>Dịch vụ</Title>
          </Body>

          <Right style={{flex: 1}}>

            <Thumbnail source={require('../assets/l60Hf.png')} style={{height: 34, width:34}} />
          </Right> */}
        </View>
        {
          //Body
        }
        <Content>
          <View style={{ height: 180 }} >
            <Swiper style={styles.wrapper}
                    activeDotColor={colors.colorBlueAccentOnLeftTopLogo}
                    showsButtons={false}>
                  <View style={styles.slide1}>
                    <Image
                        resizeMode="contain"
                        source={require('../assets/swiper1.jpg')}
                     />
                  </View>
                  <View style={styles.slide2}>
                    <Image
                        resizeMode="contain"
                        source={require('../assets/swiper2.jpg')}
                     />
                    {/* <Text style={styles.text}>Beautiful</Text> */}
                  </View>
                  <View style={styles.slide3}>
                     <Image
                        resizeMode="cover"
                        source={require('../assets/swiper3.jpg')}
                     />
                    {/* <Text style={styles.text}>And simple</Text> */}
                  </View>
              </Swiper>
           </View>
           <Tabs
            style={{flex:1}}
            prerenderingSiblingsNumber={1}>
                <Tab heading="Dịch vụ"
                     tabStyle={{backgroundColor: colors.colorBlueOnLeftTopLogo}}
                     textStyle={{color :colors.white}}
                     activeTabStyle={{backgroundColor: colors.colorBlueAccentOnLeftTopLogo}}>
                    <Content style={{flex:1}}>
                    <Text style={styles.bangGiaDichVuCss}>
                          Bảng giá dịch vụ
                    </Text>
                    <SectionList
                      {...this.props}
                      sections= {this.state.listData}
                      keyExtractor={(item,index) => item + index}
                      renderItem= {this._renderItem}
                      renderSectionHeader={this._renderSectionHeader}
                      />
                    </Content>
                </Tab>
                <Tab heading="Về chúng tôi"
                     tabStyle={{backgroundColor: colors.colorBlueOnLeftTopLogo}}
                     textStyle={{color :colors.white}}
                     activeTabStyle={{backgroundColor: colors.colorBlueAccentOnLeftTopLogo}}
                     >
                     <Content>
                    <MapView
                        style={{height:200}}
                        initialRegion={{
                          latitude: 37.78825,
                          longitude: -122.4324,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}/>
                    <Card
                        style={{height:170}}>
                    </Card>
                    </Content>
                </Tab>
                <Tab heading="Đánh giá"
                     tabStyle={{backgroundColor: colors.colorBlueOnLeftTopLogo}}
                     textStyle={{color :colors.white}}
                     activeTabStyle={{backgroundColor: colors.colorBlueAccentOnLeftTopLogo}}>

                </Tab>
            </Tabs>

        </Content>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    // style={{ backgroundColor: 'red' }}
    // position: 'absolute',
    // top: 0,
    // // left: 0,
    // // right: 0,

    // elevation: 0,
    // opacity: 0.7,
    // backgroundColor: colors.black
  },
  bangGiaDichVuCss: {
     marginTop:10,
     marginBottom: 10,
     justifyContent: 'center',
     alignItems: 'center',
     textAlign: 'center',
     color: colors.colorBlueOnLeftTopLogo,
     fontSize:22,
     fontWeight:"bold",
  },
  wrapper: {
    height: 10,
  },
  slide1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

function mapStateToProps(state) {
  return {
    state: state,
    service: state.service,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(appActions.actions, dispatch),
    getServicesList : () => {
      dispatch(appActions.actions.serviceRequest());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ServiceInfo);
