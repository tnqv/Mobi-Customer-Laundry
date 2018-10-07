import React, { Component } from 'react';
import {View,Text, Image, FlatList,SectionList,StyleSheet} from 'react-native';
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

  componentDidMount () {
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.props.navigation.navigate('MainTabBar');
      });
    }, 500);
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
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions.actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
