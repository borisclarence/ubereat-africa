import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDqfgTjqqtbZ2w10POtkWBQClQX6yYAKCU",
  authDomain: "ebooff-africa.firebaseapp.com",
  databaseURL: "https://ebooff-africa.firebaseio.com",
  projectId: "ebooff-africa",
  storageBucket: "ebooff-africa.appspot.com",
  messagingSenderId: "528180532664",
  appId: "1:528180532664:web:69ff5d9f185065cc086b4d",
  measurementId: "G-MKH84N6H5Z"
})


export const auth = app.auth()
export const firestore = app.firestore()
export default app
