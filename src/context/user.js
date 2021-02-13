import React, { useContext, useState, useEffect } from "react"
import { auth } from "firebase"

const UserContext = React.createContext()

const db = auth.firestore();

export function useAuth() {
  return useContext(UserContext)
}

export function userProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function addUser(firstname, lastname, adress_street, phone_number, sex, profil, email, password, state_user, is_active, created_at) {
     auth.createUserWithEmailAndPassword(email, password).then((response) => {
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

  async function updateUser(bodydata) {
    const data = bodydata;
    const user = await db.collection('user').doc(id);
    await user.update(data);

    return user;
  }

  async function deleteUser(id) {

    return await db.collection('user').doc(id).delete();
  }

  async function getUser(id) {
    const user = await db.collection('user').doc(id);
    const data = await user.get();
    if (!data.exists) {
      console.log('Student with the given ID not found');
    } else {
      console.log(data.data());
    }
    return data.data();
  }

  async function getAllUser() {

      const users = await db.collection('user');
      const data = await users.get();
      const usersArray = [];
      if (data.empty) {
        console.log('No user record found');
      } else {
        data.forEach(doc => {
          const user = new User(
            doc.id,
            doc.data().firstname,
            doc.data().lastname,
            doc.data().adress_street,
            doc.data().sex,
            doc.data().phone_number,
            doc.data().picture,
            doc.data().email,
            doc.data().password,
            doc.data().is_active,
            doc.data().state_user,
            doc.data().profile_id,
            doc.data().created_at
          );
          usersArray.push(user);
          console.log("Document data:", usersArray);
        });
        return usersArray;
      }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    addUser,
    updateUser,
    getUser,
    getAllUser,
    deleteUser,
  }

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  )
}
