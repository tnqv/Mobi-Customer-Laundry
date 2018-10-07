import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import colors from '../config/colors';
import { Content,Form,Item,Input,Body,Button,Card,CardItem,Right,Left,Radio,ListItem } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';




export default class OrderStepThree extends Component {
  constructor(props) {
    super(props);
    console.log('constructor=========>', props);
    this.state = {
      itemSelected: 'delivery',
    }
  }

  render() {

    return (

      <View style={{flex:1}}>
                      <View style={{flex:1,marginLeft:15,marginRight:15}}>
                        <ListItem>
                          <Left>
                            <FontAwesome name="money" size={24}/>
                            <Text style={{fontSize:18,marginLeft: 10}}>Thanh toán trực tiếp</Text>
                          </Left>
                          <Right>
                            <Radio
                              radioColor={colors.colorLogo}
                              onPress= {() => this.setState({itemSelected: 'delivery'})}
                              selected={this.state.itemSelected == 'delivery'} />
                          </Right>
                        </ListItem>
                        <ListItem>
                          <Left>
                            <FontAwesome name="bank" size={24}/>
                            <Text style={{fontSize:18,marginLeft: 10}}>Thanh toán bằng ngân hàng</Text>
                          </Left>
                          <Right>
                            <Radio
                                radioColor={colors.colorLogo}
                                onPress= {() => this.setState({itemSelected: 'bank'})}
                                selected={this.state.itemSelected == 'bank'} />
                          </Right>
                        </ListItem>
                        <Card style={{marginTop:30}}>
                          <CardItem header>
                              <Text style={{fontWeight: 'bold',fontSize: 18}}>
                                  Xác nhận địa chỉ đơn hàng :
                              </Text>
                          </CardItem>
                          <CardItem>
                              <Body>
                                <Text> 392/12 Nguyễn Tri Phương Quận 10</Text>
                              </Body>
                          </CardItem>

                        </Card>
                        <Card style={{marginTop:10}}>
                          <CardItem>
                                <Text style={{fontWeight: 'bold',fontSize:18}}>
                                     Tổng số kg :
                                </Text>
                                <Text style={{marginLeft: 10}}>
                                    32 kg
                                </Text>
                          </CardItem>
                        </Card>

                        <Card style={{marginTop:10}}>
                          <CardItem header>
                                <Text style={{fontWeight: 'bold',fontSize:18}}>
                                     Ngày nhận hàng dự kiến :
                                </Text>
                          </CardItem>
                          <CardItem>

                                <Text>
                                    8:00:00 ~ 10:00:00 Thứ 6 04-10-2018
                                </Text>
                          </CardItem>
                        </Card>

                      </View>



                  </View>

    );
  }

}


const styles = StyleSheet.create({
  indicatorSize: {
    marginVertical:50,
    backgroundColor: colors.black,
  },
  stepIndicator: {
    marginVertical:50,
  },
  page: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});