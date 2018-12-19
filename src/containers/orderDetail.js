import React, { Component } from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Title,Content, Button,Card,CardItem,Text,Icon, Footer, ListItem,Grid,Row,Col } from 'native-base';
import * as appActions from '../actions';
import colors from '../config/colors';
import Timeline from 'react-native-timeline-listview';
import Dialog, { SlideAnimation, DialogContent,DialogTitle,DialogButton } from 'react-native-popup-dialog';
import QRCode from 'react-native-qrcode';


class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      active: 'true',
      order : this.props.navigation.state.params.orderParam,
    };
  }

  _renderItem = ({item,index,section}) => {
    return (
        <ListItem style={{borderBottomWidth: 0}}>
          <Left>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >{ item.quantity} </Text>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} > x </Text>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >{ item.service.name }</Text>
          </Left>
          <Right>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >{ item.price }đ </Text>
          </Right>
        </ListItem>
    )
  }

  render() {
    const orderDate = new Date(this.state.order.time_placed);
    // const { state, actions } = this.props;
    return (
      <Container style={{backgroundColor: colors.lightgray}}>
        <View>
            <Dialog
              visible={this.state.visible}
              onTouchOutside={() => {
                this.setState({ visible: false });
              }}
              dialogTitle={<DialogTitle title="Mã xác nhận" />}
              dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom',
              })}
              actions={[
                <DialogButton
                  text="Đóng"
                  key="close"
                  onPress={() => {
                    this.setState({
                      visible: false
                    })
                  }}
                />
              ]}
            >
              <DialogContent>
                {this.state.order.verify_code ?
                  <QRCode
                      // value={this.state.order.verify_code}
                      value={this.state.order.verify_code}
                      size={200}
                      bgColor='black'
                      fgColor='white'/> : null }
              </DialogContent>
            </Dialog>
          </View>
          {
            //Header
          }
          <Header style={{backgroundColor: colors.colorBlueOnLeftTopLogo}}>
            <Left style={{flex: 1}}></Left>

            <Body style={{flex:1,alignItems:'center'}}>
              <Title>Chi tiết</Title>
            </Body>

            <Right style={{flex: 1}}>
              <TouchableOpacity onPress={()=> {
                this.setState({
                  visible: true,
                })
              }}>
                <Icon style={{color: colors.white}} type="FontAwesome" name="qrcode"/>
              </TouchableOpacity>

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
                      <Text style={{color: colors.gray}}>#{this.state.order.order_code}</Text>
                  </Left>
                  <Right style={{flex:1}}>
                    {/* <Text>420000đ</Text> */}
                  </Right>
                </View>
                <CardItem style={{marginBottom:0}}>
                    <Text style={{color: colors.colorBlueOnLeftTopLogo}}>{this.state.order.order_status_list[0].description}</Text>
                </CardItem>


                <View style={{ marginLeft: 20,
                              marginRight: 20,
                              marginBottom: 15}}>
                      <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >Thời gian đặt hàng : {`${orderDate.getDate()}-${orderDate.getMonth() +1 }-${orderDate.getFullYear()} ${orderDate.getHours()}:${orderDate.getMinutes()}:${orderDate.getSeconds()}`} </Text>
                </View>
            </Card>
            <Card style={{ marginTop: 15, marginBottom: 15 }}>
                <Grid>
                    <Row>
                        <Col>
                            <CardItem style={{marginBottom:0}}>
                                    <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Tên người nhận : </Text>
                            </CardItem>
                        </Col>
                        <Col>
                            <CardItem style={{marginBottom:0}}>
                                    <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:14}}>Số điện thoại người nhận : </Text>
                            </CardItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <View  style={{marginLeft: 20,
                                        marginRight: 20,
                                        marginBottom: 15,
                                        }}>
                                <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}}> {this.state.order.receiver_name } </Text>
                            </View>
                        </Col>
                        <Col>
                            <View  style={{marginLeft: 20,
                                        marginRight: 20,
                                        marginBottom: 15,
                                        }}>
                                <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}}>  {this.state.order.receiver_phone } </Text>
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CardItem style={{marginBottom:0}}>
                                    <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Khối lượng gửi : </Text>
                            </CardItem>
                        </Col>
                        <Col>
                            <CardItem style={{marginBottom:0}}>
                                    <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Ghi chú : </Text>
                            </CardItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <View  style={{marginLeft: 20,
                                        marginRight: 20,
                                        marginBottom: 15,
                                        }}>
                                <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}}> { this.state.order.capacity } </Text>
                            </View>
                        </Col>
                        <Col>
                            <View  style={{marginLeft: 20,
                                        marginRight: 20,
                                        marginBottom: 15,
                                        }}>
                                <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}}> { this.state.order.note } </Text>
                            </View>
                        </Col>
                    </Row>


                </Grid>
                {/* <CardItem style={{marginBottom:0}}>
                        <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Thông tin vận chuyển : </Text>
                </CardItem> */}
            </Card>
            {/* <Card style={{ marginTop: 15, marginBottom: 15 }}>


                <CardItem style={{marginBottom:0}}>
                        <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Địa chỉ giao/nhận hàng : </Text>
                </CardItem>

                <View  style={{marginLeft: 20,
                              marginRight: 20,
                              marginBottom: 15,
                              }}>
                      <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >{this.state.order.receiver_address} </Text>
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
            </Card> */}

             <Card style={{ marginTop: 15, marginBottom: 15 }}>


                <CardItem bordered style={{marginBottom:0}}>
                        <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Các dịch vụ sử dụng : </Text>
                </CardItem>

                <CardItem>
                  <FlatList
                      style={{backgroundColor:'transparent'}}
                      data={this.state.order.order_service_list}
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
                      <Text style={{color: colors.gray}}>{this.state.order.total}</Text>
                  </Right>

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
                      <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Lịch sử đơn hàng : </Text>
                  </Left>


              </CardItem>
              <CardItem>
                <Timeline
                  circleSize={10}
                  titleStyle={{fontSize: 11, marginTop: -10}}
                  timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                  circleColor={colors.colorBlueOnLeftTopLogo}
                  lineColor={colors.colorBlueOnLeftTopLogo}
                  dotColor={colors.white}
                  data={this.state.order.order_status_list.map(status => {
                    const orderDate = new Date(status.status_changed_time);
                    return Object.assign({},status,{time : `${orderDate.getDate()}-${orderDate.getMonth() +1 }-${orderDate.getFullYear()} ${orderDate.getHours()}:${orderDate.getMinutes()}`} )
                    })
                  }
                />
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
