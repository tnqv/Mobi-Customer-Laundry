import React, { Component } from 'react';
import {View,Text, StyleSheet, ImageBackground,Image} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors'
import { Container, Button, Body, Spinner,Content, Card, Form,Item,Input, Label, CardItem } from 'native-base';
import { LoginButton, AccessToken , LoginManager } from 'react-native-fbsdk';
// import { loginRequest } from '../actions';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = { usernameInput: '', passwordInput: '' };

  }

  async _facebookLogin() {
    // native_only config will fail in the case that the user has
    // not installed in his device the Facebook app. In this case we
    // need to go for webview.
    let result;
    try {
      // this.setState({showLoadingModal: true});
      LoginManager.setLoginBehavior('NATIVE_ONLY');
      result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
    } catch (nativeError) {
      try {
        LoginManager.setLoginBehavior('WEB_ONLY');
        result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      } catch (webError) {
        // show error message to the user if none of the FB screens
        // did not open
      }
    }
    // handle the case that users clicks cancel button in Login view
    // if (result.isCancelled) {
    //   this.setState({
    //     showLoadingModal: false,
    //     notificationMessage: I18n.t('welcome.FACEBOOK_CANCEL_LOGIN')
    //   });
    // } else {
    //   // Create a graph request asking for user information
    //   this.FBGraphRequest('id, email, picture.type(large)', this.FBLoginCallback);
    // }
  }

  render() {
    // const { state, actions } = this.props;
    return (
      <Container>
          {
          //Header
          }

          <ImageBackground
           source={require('../assets/opacity-login.png')}
           style={[styles.fullScreen, this.props.account.loading ? styles.setOpacity : null]}
          >
            <Image
            style={{
                      borderColor: '#d6d7da',
                      width: 250, height: 250,
                      justifyContent:'center',
                      alignSelf: 'center'}}
            source={require('../assets/laundry2.png')}>
            </Image>


            {
              //Body
            }
            <Content style={{backgroundColor: "transparent"}} contentContainerStyle={{flex:1}}>
              <Card style={styles.loginForm}>
                  <CardItem>
                    <Form style={styles.formItem}>
                        <Item style={styles.inputItem} floatingLabel>
                          <Label>Email</Label>
                          <Input
                          onChangeText={(text) => this.setState({ usernameInput: text })}
                          // keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default' }
                          // onChangeText={(value) => this.onChange(value) }
                          value={this.state.usernameInput}
                          />
                        </Item>
                        <Item style={styles.inputItem} floatingLabel>
                          <Label>Password</Label>
                          <Input secureTextEntry={true}
                          onChangeText={(text) => this.setState({ passwordInput: text })}
                          // keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default' }
                          // onChangeText={(value) => this.onChange(value) }
                          value={this.state.passwordInput}/>
                        </Item>
                      </Form>
                  </CardItem>

                    <CardItem style={{flex:1,marginTop: 10}}>
                      <Body>
                          <Button style={{alignSelf: 'stretch', backgroundColor: colors.appleDefaultColor}}
                                  block
                                  primary
                                  onPress={()=>{
                                    const {usernameInput, passwordInput} = this.state;
                                    if (!usernameInput.length || !passwordInput.length) {
                                        alert('You must enter username and password');
                                        return;
                                    }
                                    this.props.onLogin({username: usernameInput, password: passwordInput});
                                  }

                                  }>
                              <Text style={{color:colors.white}}>Sign In</Text>
                          </Button>

                          <Button style={{alignSelf: 'stretch', backgroundColor: colors.fbColor, marginTop:15}}
                                  block
                                  primary
                                  onPress={this._facebookLogin}>
                            <Image
                              style={{ width: 20, height: 20,}}
                              source={require('../assets/facebook.png')}></Image>
                            <Text style={{color:colors.white,marginLeft:10}}>Login with FACEBOOK</Text>
                          </Button>
                      </Body>

                    </CardItem>
                </Card>
            </Content>

          </ImageBackground>

          {
             this.props.account.loading ?
                  <Spinner
                  style={{
                    width: 100,
                    height: 100,
                    left: `50%`,
                    top: `50%`,
                    transform: [{ translateX: -50},{translateY: -50 }],
                    justifyContent:'center',
                    position: 'absolute',}}
                  color='blue'>
                </Spinner> : null

          }

    </Container>
    );
  }
}

const styles = StyleSheet.create({
  loginForm: {
      height: 320,
      justifyContent: 'center',
      alignSelf: 'stretch',
      marginLeft: 25,
      marginRight: 25,
      backgroundColor: colors.white,
      opacity: 1,
  },
  formItem: {
      flex: 1,
  },
  inputItem: {
      marginRight: 15,
  },
  setOpacity : {
     opacity : 0.5,
  },
  fullScreen : {
     flex: 1,
  }
})

function mapStateToProps(state) {
  return {
    account: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (accountLogin) => {
      dispatch(appActions.actions.loginRequest(accountLogin));
    },
    //Not necessary !
    // onSuccessFetch: () => {
    //     dispatch(fetchSuccessAction());
    // },
    // onAddMovie: (newMovie) => {
    //     dispatch(addMovieAction(newMovie));
    // },
    // actions: bindActionCreators(appActions.actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
