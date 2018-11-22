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
import Geocoder from 'react-native-geocoder';
// simply add your google key



// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const store = configureStore()
store.runSaga(sagaRoot);
Geocoder.fallbackToGoogle('AIzaSyDZX1AjUUvJydL7kbBpmar-NUPSuUoStDY');

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

        //this.getToken();
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
    const channel = new firebase.notifications.Android.Channel(
      'channelId',
      'Channel Name',
      firebase.notifications.Android.Importance.Max
    ).setDescription('A natural description of the channel');
    firebase.notifications().android.createChannel(channel);
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        console.log("onNotification");
        const localNotification = new firebase.notifications.Notification({
          sound: 'default',
          show_in_foreground: true,
        })
        //.setNotificationId(notification.notificationId)
        .setTitle(title)
        // .setSubtitle(notification.subtitle)
        .setBody(body)
        // .setData(notification.data)
        .android.setChannelId('channelId') // e.g. the id you chose above
        .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);

      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
        // this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        console.log("onNotificationOpened");
        const localNotification = new firebase.notifications.Notification({
          sound: 'default',
          show_in_foreground: true,
        })
        //.setNotificationId(notification.notificationId)
        .setTitle(title)
        // .setSubtitle(notification.subtitle)
        .setBody(body)
        // .setData(notification.data)
        .android.setChannelId('channelId') // e.g. the id you chose above
        .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);

      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
        // this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        console.log("initialNotificaiton");

        // this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      // const { title, body } = message;
      console.log("onMessage");

      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
      //.setNotificationId(notification.notificationId)
      .setTitle(message)
      // .setSubtitle(notification.subtitle)
      .setBody(message)
      // .setData(notification.data)
      .android.setChannelId('channelId') // e.g. the id you chose above
      .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
      .android.setColor('#000000') // you can set a color here
      .android.setPriority(firebase.notifications.Android.Priority.High);

    firebase.notifications()
      .displayNotification(localNotification)
      .catch(err => console.error(err));

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