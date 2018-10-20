import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import colors from '../config/colors';
import { Content,Form,Item,Input,Label,Button,Textarea,Card,Left,Right, CardItem } from 'native-base';

import MapView from 'react-native-maps';




export default class OrderStepOne extends Component {
  constructor(props) {
    super(props);
    console.log('constructor=========>', props);
  }

  render() {

    return (

      <Content style={{flex:1}}>
                      <View style={{flex:1,height:200}}>
                      <MapView style={styles.map} initialRegion={{
                          latitude:-6.270565,
                          longitude:106.759550,
                          latitudeDelta: 1,
                          longitudeDelta: 1
                          }}>

                          {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                            coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                            title={"Your Location"}
                          />}

                          </MapView>

                      </View>
                      <Form style={{flex:2,marginLeft: 15,marginRight: 15}}>
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

                        <Item floatingLabel>
                          <Label>Số ký của quần áo</Label>
                          <Input />
                        </Item>
                      </Form>

                  </Content>

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
  },
  map : {
    flex:1,
  }
});