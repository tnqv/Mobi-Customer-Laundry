/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { AppStack } from './navigators/AppNavigator';
import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import NavigatorService from './services/navigator';
import sagaRoot from './sagas';
import configureStore from './store/configureStore';


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const store = configureStore()
store.runSaga(sagaRoot);

class App extends Component {
	constructor(props) {
    super(props);

  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
      this.notificationListener();
      this.notificationOpenedListener();
  }


    //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {

        this.getToken();
    } else {

        this.requestPermission();
    }
  }

    //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken);
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            console.log(fcmToken);
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }

    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        // this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        // this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        // this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  render(){
    return (
      <Provider store={store}>
        <AppStack
          ref={navigatorRef => {
            NavigatorService.setTopLevelNavigator(navigatorRef);
          }}
          ></AppStack>
      </Provider>
    );
  }
}
export default App;