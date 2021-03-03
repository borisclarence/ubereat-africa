/*import React, {
  useState, useContext, createContext,
} from 'react';
// import * as firebase from "firebase/app";
import PropTypes from 'prop-types';
import firebase from '../Firebase';
import 'firebase/auth';

// const firebaseConfig = {
//     apiKey: 'AIzaSyCipu_AlxAOUmwO8UdxcQG5Z1oolum-gxM',
//     authDomain: 'meetdev-2e3ae.firebaseapp.com',
//     databaseURL: 'https://meetdev-2e3ae.firebaseio.com',
//     projectId: 'meetdev-2e3ae',
//     storageBucket: 'meetdev-2e3ae.appspot.com',
//     messagingSenderId: '621364626630',
//     appId: '1:621364626630:web:56fc3d9786dc6ed60a43c7',
//     measurementId: 'G-79HY7MMLZ6',
// };

// firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const appContext = createContext();

export const useAuth = () => useContext(appContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) => firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      setUser(response.user);
      return response.user;
    });

  const signup = (name, surname, profil, email, password) => firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const userId = response.user.uid;
      db.collection('User').doc(userId).set({
        name,
        surname,
        profil,
      });
      setUser(response.user);
      return response.user;
    });

  const signout = () => firebase
    .auth()
    .signOut()
    .then(() => {
      setUser(false);
    });

  const Addusers = (name, surname, profil) => db.collection('User').add({
    name,
    surname,
    profil,
  });

  // const getUserProfile = (id) => {
  //   db.collection('User').doc(id)
  //     .get().then((doc) => {
  //       // console.log('No such document!', doc);
  //     })
  //     .catch((error) => {
  //       // console.log('Error getting document:', error);
  //     });
  // };

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    Addusers,
    signout,
    // getUserProfile,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <appContext.Provider value={auth}>{children}</appContext.Provider>;
}
ProvideAuth.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};*/









import React, { useContext, useState, useEffect } from "react"
import { auth, firestore } from "./firebase"

const db = firestore
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(firstname, lastname, adress_street, phone_number, sex, profil, email, password, state_user, is_active, created_at) {
    return auth.createUserWithEmailAndPassword(email, password).then((response) => {
      const userId = response.user.uid;
      db.collection('User').doc(userId).set({
        firstname,
        lastname,
        adress_street,
        phone_number,
        sex,
        profil,
        email,
        password,
        state_user,
        is_active,
        created_at
      });
      return response.user;
    });

  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setCurrentUser)

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}


