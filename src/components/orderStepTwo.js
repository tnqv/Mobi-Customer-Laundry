import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import colors from '../config/colors';
import { Content,Form,Item,Input,Label,Button,Textarea,Card,CardItem,Body } from 'native-base';




export default class OrderStepTwo extends Component {
  constructor(props) {
    super(props);
    console.log('constructor=========>', props);
  }

  render() {

    return (

      <View style={{flex:1}}>
                      <View style={{flex:1}}>
                      <Image
                        style={{  flex:3,
                                  borderColor: '#d6d7da',
                                  width: 200, height: 200,
                                  justifyContent:'center',
                                  alignSelf: 'center'}}
                        source={require('../assets/washing-machine.png')}>
                        </Image>
                        <Card style={{flex:1,marginLeft:15,marginRight:15,marginTop:10}} >
                          <CardItem>
                              <Text>
                                Vui lòng nhập số ký cho gói bạn muốn giặc để chúng tôi có thể định giá dịch vụ một cách chính xác nhất
                              </Text>
                          </CardItem>
                        </Card>
                      </View>
                      <Form style={{flex:1,marginLeft: 15,marginRight: 15}}>
                        <Item floatingLabel>
                          <Label>Số ký của quần áo</Label>
                          <Input />
                        </Item>
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