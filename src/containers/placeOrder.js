import React, { Component } from 'react';
import {View,Text,Image} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors'
import OrderStepOne from '../components/orderStepOne';
import OrderStepTwo from '../components/orderStepTwo';
import OrderStepThree from '../components/orderStepThree';
import { Card, CardItem, Header, Left, Body, Right, Button, Title,Textarea,Content,Label, Icon, Item, Input,Form } from 'native-base';
import { ViewPager } from 'rn-viewpager';
import StepIndicator from 'react-native-step-indicator';
import { NavigationActions } from 'react-navigation'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


const labels = ["Địa chỉ","Khối lượng đồ","Thanh toán","Hoàn tất"];
const customStyles = {
  stepIndicatorSize: 50,
  currentStepIndicatorSize:50,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: colors.colorLogo,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: colors.colorLogo,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: colors.colorLogo,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: colors.colorLogo,
  stepIndicatorUnFinishedColor: colors.white,
  stepIndicatorCurrentColor: colors.white,
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: colors.colorLogo,
  stepIndicatorLabelFinishedColor: colors.white,
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: colors.colorLogo
}

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? colors.white : colors.colorLogo,
    size: 15,
  };
  switch (position) {
    case 0: {
      iconConfig.name = 'location-on';
      break;
    }
    case 1: {
      iconConfig.name = 'disc-full';
      break;
    }
    case 2: {
      iconConfig.name = 'payment';
      break;
    }
    case 3: {
      iconConfig.name = 'check';
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};



class PlaceOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage:0,
      PAGES: ['Page 1','Page 2','Page 3','Page 4']
    }
  }

  componentWillReceiveProps(nextProps,nextState) {
    if(nextState.currentPage != this.state.currentPage) {
      if(this.viewPager) {
        this.viewPager.setPage(nextState.currentPage)
      }
    }
  }



  onPageChange(position){
    this.setState({currentPage: position});
  }

  goToPage2(){
    this.setState({currentPage: 2});
  }

  goToPage3(){
    this.setState({currentPage: 3});
  }

  renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  );





  render() {

    // const { goBack } = this.props.navigation;
    const backAction = NavigationActions.back({
      key: null
    })


    // const { state, actions } = this.props;
    return (
      <View  style={{flex:1,backgroundColor: colors.white}}>
          <Header style={{backgroundColor: colors.colorLogo}}>
              <Left style={{flex: 1}}></Left>

              <Body style={{flex:1,alignItems:'center'}}>
                <Title>Tạo đơn hàng</Title>
              </Body>

              <Right style={{flex: 1}}/>
          </Header>
            {

            }
            <View  style={{flex:1,marginTop:15}}>

                <StepIndicator
                  renderStepIndicator={this.renderStepIndicator}
                  customStyles={customStyles}
                  currentPosition={this.state.currentPage}
                  labels={labels}
                  stepCount={4}
                  onPress={(step)=>{
                      console.log(this.viewPager.setPage(step));
                      console.log(this.state.currentPage);
                  }}

                />
            </View>

            <View style={{flex:6}}>
                  <ViewPager
                  style={{flex:1}}
                  ref={(viewPager) => {this.viewPager = viewPager}}
                  onPageSelected={(page) => {this.setState({currentPage:page.position})}}
                  // dataSource={this.state.dataSource}
                  horizontalScroll={false}
                  initialPage={0}
                  >
                  <View>
                    <OrderStepOne></OrderStepOne>
                    <Button style={{ position: 'absolute', bottom:0, left:0, width:'100%',backgroundColor: colors.colorLogo}}
                               block
                               onPress={()=>{
                                this.setState({currentPage: 1})
                                this.viewPager.setPage(1);
                               }} ><Text style={{color:colors.white,}}>Tiếp tục</Text>
                    </Button>
                  </View>

                  <View>
                    <OrderStepTwo></OrderStepTwo>
                    <Button style={{ position: 'absolute', bottom:0, left:0, width:'100%',backgroundColor: colors.colorLogo}}
                               block
                               onPress={()=>{
                                  this.setState({currentPage: 2})
                                  this.viewPager.setPage(2);
                              }} ><Text style={{color:colors.white,}}>Tiếp tục</Text></Button>

                  </View>
                  <View>
                    <OrderStepThree></OrderStepThree>
                    <Button style={{ position: 'absolute', bottom:0, left:0, width:'100%',backgroundColor: colors.colorLogo}}
                            block
                            onPress={()=>{
                              this.setState({currentPage: 3})
                              this.viewPager.setPage(3);
                            }}>
                              <Text style={{color:colors.white,}}>Xác nhận</Text>
                    </Button>
                  </View>
                  <View>
                      <Image
                            style={{
                                      marginTop: 30,
                                      width: 230,
                                      height:230,
                                      justifyContent:'center',
                                      alignSelf: 'center',
                                      borderColor: '#d6d7da',
                                      }}
                            source={require('../assets/checkbox.png')}>
                      </Image>

                      <Card style={{marginTop:10,marginLeft:15,marginRight:15}}>
                              <CardItem header>
                                    <Text style={{fontWeight: 'bold',fontSize:18}}>
                                        Đơn hàng của bạn đã đăng ký thành công
                                    </Text>
                              </CardItem>
                              <CardItem>
                                    <Text>
                                        Mã đơn hàng: #0123456789 , xin vui lòng giữ mã này để delivery man có thể xác nhận đơn hàng của bạn nhé
                                    </Text>
                              </CardItem>

                        </Card>
                        <Button style={{ position: 'absolute', bottom:0, left:0, width:'100%',backgroundColor: colors.colorLogo}}
                                      block
                                      onPress={()=>{
                                          this.props.navigation.dispatch(backAction);
                                      }}>
                                        <Text style={{color:colors.white,}}>Hoàn tất</Text>
                        </Button>
                  </View>



                  </ViewPager>

            </View>



          {/* <StepIndicator
          style={{flex:2}}
            customStyles={customStyles}
            currentPosition={this.state.currentPage}
            labels={labels}
            stepCount={4}
            onPress={(step)=>{
                console.log(this.viewPager.setPage(step));
                console.log(this.state.currentPage);
            }}

          />
          <ViewPager

          style={{flex:24,backgroundColor: colors.black}}
          // ref={(viewPager) => {this.viewPager = viewPager}}
          onPageSelected={(page) => {this.setState({currentPage:page.position})}}
          // dataSource={this.state.dataSource}
          indicator={this._renderTabIndicator()}
          initialPage={1}
          >
          <View><Text>asfsaf</Text></View>
          <View><Text>asfsaf</Text></View>
          <View><Text>asfsaf</Text></View>



          </ViewPager> */}
      </View>
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
    actions: bindActionCreators(appActions.actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);
