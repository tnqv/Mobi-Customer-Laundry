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




export default class OrderListItem extends Component {
  constructor(props) {
    super(props);
    console.log('constructor=========>', props);
  }

  render() {

    return (

        <View style={{height:300}}>


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