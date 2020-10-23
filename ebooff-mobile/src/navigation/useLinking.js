import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

export default function (containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          Home: 'Home',
          MessengerList: 'Localization',
          Rating: 'Rating',
          Profile: 'Profile',
          Splash: 'Splash',
          Localization: 'Localization',
          Settings: 'Settings',
          Signin: 'Signin',
          Signup: 'Signup',
          Signout: 'Signout',
          Rating: 'Rating',
        },
      },
    },
  });
}
