import React, {
  useState, useContext, createContext,
} from 'react';
// import * as firebase from "firebase/app";
import PropTypes from 'prop-types';
import firebase from './Firebase';
import 'firebase/auth';

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

  const signup = (firstname, lastname, adress_street, phone_number, sex, profil, email, password, state_user, is_active, created_at) => firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const userId = response.user.uid;
      db.collection('User').doc(userId).set({
        firstname,
        lastname,
        adress_street,
        phone_number,
        sex,
        profil_id,
        email,
        password,
        state_user,
        is_active,
        created_at
      });
      setUser(response.user);
      return response.user;
    });

  const updateUSer = () => db.collection('User').add({

  })

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

export function AuthContext({ children }) {
  const auth = useProvideAuth();
  return <appContext.Provider value={auth}>{children}</appContext.Provider>;
}
AuthContext.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};
