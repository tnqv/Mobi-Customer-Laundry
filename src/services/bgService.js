import firebase from 'react-native-firebase';
// Optional flow type
import { RemoteMessage } from 'react-native-firebase';

export default async (message) => {
    // handle your message
    console.log("receive message");
    console.log(message);
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

  return Promise.resolve();
}