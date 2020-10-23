import { decode, encode } from 'base-64';

const firebase = require('@firebase/app').default;

global.crypto = require('firebase/firestore');

global.crypto.getRandomValues = (byteArray) => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } };
if (!global.btoa) { global.btoa = encode; }
if (!global.atob) { global.atob = decode; }

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqfgTjqqtbZ2w10POtkWBQClQX6yYAKCU",
  authDomain: "ebooff-africa.firebaseapp.com",
  databaseURL: "https://ebooff-africa.firebaseio.com",
  projectId: "ebooff-africa",
  storageBucket: "ebooff-africa.appspot.com",
  messagingSenderId: "528180532664",
  appId: "1:528180532664:web:69ff5d9f185065cc086b4d",
  measurementId: "G-MKH84N6H5Z"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
