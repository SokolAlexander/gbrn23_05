/**
 * @format
 */

import {AppRegistry} from 'react-native';
import notifee from '@notifee/react-native';

import App from './App';
import {name as appName} from './app.json';
import {navRef} from './src/navigation/Navigation';

notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('Backgound event: ', type, 'notif: ', detail.notification);
  // navRef.navigate('TodoDetails');
  return Promise.resolve();
});

notifee.registerForegroundService(notification => {
  console.log('service: ', notification);
  // return new Promise(res => {
  //   setTimeout(res, 7000);
  // });
});

AppRegistry.registerComponent(appName, () => App);
