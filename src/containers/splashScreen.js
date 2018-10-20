import React, { Component } from 'react';
import {View,Text, Image, FlatList,SectionList,StyleSheet,AsyncStorage} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors';

import Swiper from 'react-native-swiper';

import { Container, Header, Left, Body, Right, Thumbnail, Card, CardItem, Title,Content, List, ListItem } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

class SplashScreen extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount () {



    this.props.getServicesList();

    // if(this.props.service.data || this.props.service.error){
      // requestAnimationFrame(() => {
      //   this.props.navigation.navigate('MainTabBar');
      // });
    // }

    // setTimeout(() => {

    // },500)
    // await this.props.onLoadServices();


    // try{
    //     console.log("in try");
    //     let value = await AsyncStorage.getItem('token');
    //     console.log("get token");
    //     if(value){
    //       console.log("value ?");
    //       this.props.onLoadUser(value);
    //       requestAnimationFrame(() => {
    //             this.props.navigation.navigate('MainTabBar');
    //       });
    //     }else{
    //       requestAnimationFrame(() => {
    //         this.props.navigation.navigate('MainTabBar');
    //       });
    //     }

    // }catch(er){
    //   requestAnimationFrame(() => {
    //     this.props.navigation.navigate('MainTabBar');
    //   });
    // }
    // AsyncStorage.getItem('token').then((value)=>{
    //     console.log("Incall back"+ value);
    //     if(value){
    //       await this.props.onLoadUser(value);
    //       requestAnimationFrame(() => {
    //             this.props.navigation.navigate('MainTabBar');
    //       });
    //     }

    // },(error)=>{
    //   console.log(error);
    // });

  }

  render() {
    // const { state, actions } = this.props;
    return (

      <Container style={{ justifyContent:'center',
                          alignItems:'center'}}>
         <Image
            style={{width:300,
                    height:300,
                   }}
            source={require('../assets/laundry2.png')}>
          </Image>
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(appActions.actions, dispatch),
    onLoadUser: (token) => {
      dispatch(appActions.actions.loadUserFromAsyncStorageRequest(token));
    },
    getServicesList : () => {
      dispatch(appActions.actions.serviceRequest());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
