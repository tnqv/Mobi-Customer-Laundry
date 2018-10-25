import React, { Component } from 'react';
import { View, Image,ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right,Thumbnail, Title,Content, Button,Card,CardItem,Text,Icon, Footer, ListItem } from 'native-base';
import * as appActions from '../actions';
import colors from '../config/colors';


class LoginComponent extends Component{
   render(){
      return (
        <View style={{flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'center',
                      alignItems:'center'}}>
                  <Left style={{marginLeft: 15}}>
                    <Thumbnail source={require('../assets/l60Hf.png')} style={{borderWidth:0.5,width:72,height:72}} />
                  </Left>
                  <Body style={{justifyContent: 'center',
                                alignItems:'center'}}>
                    <Button style={{borderColor:colors.colorBlueOnLeftTopLogo,
                                                    borderWidth: 1,
                                                    borderRadius: 4,
                                                    backgroundColor: colors.white}}
                              onPress={async () => {
                                      if(this.props.data.login.token === ''){
                                        this.props.data.navigation.navigate('LoginView');
                                      }
                                  }
                              }>
                                      <Text style={{color: colors.colorBlueOnLeftTopLogo}}>Đăng nhập</Text>
                    </Button>

                  </Body>
                  <Right style={{marginRight:20}}>
                      <Button style={{backgroundColor:colors.colorBlueOnLeftTopLogo,
                                    borderRadius: 4,}}
                                            // onPress={()=>{
                                            //     this.props.navigation.navigate('OrderDetail');
                                            // }}
                                            >
                                      <Text style={{color: colors.white}}>Đăng ký</Text>
                      </Button>
                  </Right>
         </View>
      )
   }
}

class AuthorizedComponent extends Component{
  render(){
     return (
       <View style={{flexDirection: 'row',
                     flex: 1,
                     justifyContent: 'center',
                     alignItems:'center'}}>
                 <Left style={{marginLeft: 15}}>
                   <Thumbnail source={{ uri: this.props.data.user.imageurl}} style={{borderWidth:0.5,width:72,height:72}} />
                   <Text style={{marginLeft:20}}>
                          {this.props.data.user.name}
                    </Text>
                 </Left>
                 {/* <Body>


                 </Body> */}
                 {/* <Right style={{marginRight:20}}>
                     <Button style={{backgroundColor:colors.colorBlueOnLeftTopLogo,
                                   borderRadius: 4,}}
                                           onPress={()=>{
                                               this.props.navigation.navigate('OrderDetail');
                                           }}>
                                     <Text style={{color: colors.white}}>Đăng ký</Text>
                     </Button>
                 </Right> */}
        </View>
     )
  }
}

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let loginArea = <LoginComponent data={this.props}></LoginComponent>;
    let authorizedArea = <AuthorizedComponent data={this.props.login}></AuthorizedComponent>;
    // const { state, actions } = this.props;
    return (
      <Container style={{backgroundColor: colors.lightgray}}>
      {
        //Header
      }
       {/* <Header style={{backgroundColor: colors.colorBlueOnLeftTopLogo}}>
        <Left style={{flex: 1}}></Left>

        <Body style={{flex:1,alignItems:'center'}}>
          <Title>Đơn hàng</Title>
        </Body>

        <Right style={{flex: 1}}>

        </Right>
      </Header> */}
      {
        //Body
      }
      <Card>

        <CardItem cardBody>
          <ImageBackground source={require('../assets/opacity-login.png')} style={{height: 200, width: null, flex: 1}}>

                    {this.props.login.token === '' ?  loginArea : authorizedArea}

          </ImageBackground>
        </CardItem>
      </Card>
      <Content style={{marginTop: 15,backgroundColor: colors.white }}>

          <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active type="FontAwesome" name="history" />
                  </Button>
                </Left>
                <Body>
                  <Text>Đơn đặt</Text>
                </Body>
                <Right>
                  <Text>Xem lịch sử dịch vụ</Text>
                  <Icon active name="arrow-forward" />
                </Right>
          </ListItem>
          <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: colors.orange }}>
                    <Icon active name="star" />
                  </Button>
                </Left>
                <Body>
                  <Text>Đánh giá</Text>
                </Body>
                <Right>
                  <Text>Xem các đánh giá</Text>
                  <Icon active name="arrow-forward" />
                </Right>
          </ListItem>
          <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: colors.lightGreen }}>
                    <Icon active type="FontAwesome" name="question-circle" />
                  </Button>
                </Left>
                <Body>
                  <Text>Trợ giúp</Text>
                </Body>
                <Right>
                  <Text>Xem trợ giúp</Text>
                  <Icon active name="arrow-forward" />
                </Right>
          </ListItem>

      </Content>
    </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    login: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(appActions.actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
