import React, { useContext, useState, useEffect } from "react"
import { auth } from "firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
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
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

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
