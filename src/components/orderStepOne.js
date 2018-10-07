import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import colors from '../config/colors';
import { Content,Form,Item,Input,Label,Button,Textarea } from 'native-base';




export default class OrderStepOne extends Component {
  constructor(props) {
    super(props);
    console.log('constructor=========>', props);
  }

  render() {

    return (

      <View style={{flex:1}}>
                      <View style={{flex:1}}>
                        <Image
                          style={{flex:1}}
                          source={require('../assets/mapexample.jpg')}/>

                      </View>
                      <Form style={{flex:1,marginLeft: 15,marginRight: 15}}>
                        <Item floatingLabel>
                          <Label>Địa chỉ</Label>
                          <Input />
                        </Item>
                        <View style={{marginTop: 30}}>
                          <Item>
                          <Label>Ghi chú</Label>
                          </Item>
                          <Textarea  style={{marginLeft:15}} bordered rowSpan={2} />


                        </View>
                      </Form>

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