import React, { Component } from 'react';
import {View, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Title,Content, Button,Card,CardItem,Text,Icon, Footer, ListItem } from 'native-base';
import * as appActions from '../actions';
import colors from '../config/colors';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'true',
      data : [
        {
          "test":"test"
        },{
          "test":"test"
        },
        {
          "test":"test"
        }
      ]
    };
  }

  _renderItem = ({item,index,section}) => {
    return (
        <ListItem style={{borderBottomWidth: 0}}>
          <Left>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >3 </Text>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} > x </Text>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} > Từ 3kg - 5kg/Máy/Lượt</Text>
          </Left>
          <Right>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >30.000 </Text>
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
              <Title>Chi tiết</Title>
            </Body>

            <Right style={{flex: 1}}>

            </Right>
          </Header>
          {
            //Body
          }
          <Content style={{ flex: 1 }}>

            <Card style={{ marginTop: 15, marginBottom: 15 }}>

                <View style={{marginTop:15,
                              marginBottom:0,
                              flexDirection: 'row',
                              alignContent:'flex-start',
                              marginLeft: 20,
                              marginRight: 20}}>
                  <Left style={{flexDirection: 'row', textAlign: 'left', textAlignVertical: 'center',flex:2}}>
                      <Text style={{color: colors.gray, fontWeight: 'bold',fontSize:18}}>Mã hoá đơn</Text>
                      <Text> - </Text>
                      <Text style={{color: colors.gray}}>#123456</Text>
                  </Left>
                  <Right style={{flex:1}}>
                    <Text>420000đ</Text>
                  </Right>
                </View>
                <CardItem style={{marginBottom:0}}>
                    <Text style={{color: colors.colorBlueOnLeftTopLogo}}>Status</Text>
                </CardItem>


                <View style={{ marginLeft: 20,
                              marginRight: 20,
                              marginBottom: 15}}>
                      <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >Thời gian đặt hàng : 22:30:22 23/10/2018 </Text>
                </View>
            </Card>
            <Card style={{ marginTop: 15, marginBottom: 15 }}>


                <CardItem style={{marginBottom:0}}>
                        <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Địa chỉ giao/nhận hàng : </Text>
                </CardItem>

                <View  style={{marginLeft: 20,
                              marginRight: 20,
                              marginBottom: 15,
                              }}>
                      <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >399 Lý Thái Tổ </Text>
                </View>
                <View style={{borderBottomWidth: 0.5,borderBottomColor: colors.gray}}></View>

                 <CardItem style={{marginBottom:0}}>
                        <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Thời gian lấy đồ dự kiến : </Text>
                </CardItem>
                <View  style={{marginLeft: 20,
                              marginRight: 20,
                              marginBottom: 15,
                              }}>
                      <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}}> 8:00:00 24/10/2018 </Text>
                </View>
            </Card>

             <Card style={{ marginTop: 15, marginBottom: 15 }}>


                <CardItem bordered style={{marginBottom:0}}>
                        <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Các dịch vụ sử dụng : </Text>
                </CardItem>

                <CardItem>
                  <FlatList
                      style={{backgroundColor:'transparent'}}
                      data={this.state.data}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this._renderItem}
                    />

                </CardItem>

            </Card>

            <Card style={{ marginTop: 15}}>
              {/* <CardItem style={{marginBottom:0}}>
                  <Left>
                      <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Tổng cộng : </Text>
                  </Left>
                  <Right>
                      <Text>90.000</Text>
                  </Right>

              </CardItem> */}
              <CardItem>
                  <Left>
                      <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Tổng cộng : </Text>
                  </Left>
                  <Right>
                      <Text style={{color: colors.gray}}>90.000</Text>
                  </Right>

              </CardItem>

            </Card>

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
    // actions: bindActionCreators(appActions.actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
