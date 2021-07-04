import {Platform} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NotificationHandler from './NotificationHandler';

export default class NotificationManager {
  constructor(onRegister = (token) => {}, onNotification = (noti) => {}) {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels();

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    this.clearIconBadgeNumber();
  }

  createDefaultChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // (required)
        channelName: 'Default channel', // (required)
        channelDescription: 'A default channel', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) =>
        console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  createOrUpdateChannel = () => {
    this.lastChannelCounter++;
    PushNotification.createChannel(
      {
        channelId: 'custom-channel-id', // (required)
        channelName: `Custom channel - Counter: ${this.lastChannelCounter}`, // (required)
        channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => {
        // (optional) callback returns whether the channel was created, false means it already existed.
        // console.log(`createChannel returned '${created}'`);
      },
    );
  };

  getChannels = (cb) => {
    PushNotification.getChannels((channels) => {
      // console.log('channels: ', {channels});
      cb(channels);
    });
  };

  popInitialNotification = () => {
    PushNotification.popInitialNotification((notification) =>
      console.log('InitialNotication:', notification),
    );
  };

  showNotification = (title, message, data = {}, options = {}) => {
    this.lastId++;
    PushNotification.localNotification({
      //other options
      ...options,
      /* Android Only Properties */
      channelId: 'default-channel-id',
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_launcher',
      bigText: message || '',
      subText: title || '',
      color: options.color || '#FFAE00',
      vibrate: options.vibrate || false,
      vibration: options.vibration || 300,
      // actions: ['Yes', 'No'],
      invokeApp: true,
      importance: options.importance || 'high',
      visibility: options.visibility || 'private',

      /* iOS only properties */
      category: options.category || '',
      subtitle: options.subTitleIOS || '',

      /* iOS and Android properties */
      id: this.lastId,
      title: title,
      message: message,
      userInfo: data,
      playSound: options.playSound || true,
      soundName: options.soundName || 'default',
    });
  };

  scheduleNotification = (
    title,
    message,
    time = 5,
    data = {},
    options = {},
  ) => {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + time * 1000), // in 'time' secs

      //other options
      ...options,
      /* Android Only Properties */
      channelId: 'default-channel-id',
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_launcher',
      bigText: message || '',
      subText: title || '',
      color: options.color || 'red',
      vibrate: options.vibrate || false,
      vibration: options.vibration || 300,
      actions: ['Yes', 'No'],
      invokeApp: true,
      importance: options.importance || 'high',
      visibility: options.visibility || 'private',

      /* iOS only properties */
      category: options.category || '',

      /* iOS and Android properties */
      id: this.lastId,
      title: title,
      message: message,
      userInfo: data,
      playSound: options.playSound || true,
      soundName: options.soundName || 'default',
    });
  };

  checkPermission = (cbk) => {
    return PushNotification.checkPermissions(cbk);
  };

  requestPermissions = () => {
    return PushNotification.requestPermissions();
  };

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: '' + this.lastId});
  }

  cancelAllNotif = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
    this.clearIconBadgeNumber();
  };

  clearIconBadgeNumber = () => {
    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber((number) => {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
  };

  abandonPermissions = () => {
    PushNotification.abandonPermissions();
  };

  getScheduledLocalNotifications = (callback) => {
    PushNotification.getScheduledLocalNotifications(callback);
  };

  getDeliveredNotifications = (callback) => {
    PushNotification.getDeliveredNotifications(callback);
  };
}
