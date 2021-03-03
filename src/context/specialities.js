import React, { useContext, useState, useEffect } from "react"
import { auth } from "firebase"

const SpecialitiesContext = React.createContext()

const db = auth.firestore();

export function useSpeciale() {
  return useContext(SpecialitiesContext)
}

export function SpecialitiesProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function addSpecialities(libelle_type_restaurant, picture_type_restaurant, state_type_restaurant, created_at) {
    return await db.collection('type_restaurant').add({
        libelle_type_restaurant,
        picture_type_restaurant,
        state_type_restaurant,
        created_at
    });

  }

  async function updateSpecialities(bodydata) {
    const data = bodydata;
    const typerestaurant = await db.collection('type_restaurant').doc(id);
    await typerestaurant.update(data);

    return typerestaurant;
  }

  async function deleteSpecialities(id) {

    return await db.collection('type_restaurant').doc(id).delete();
  }

  async function getSpecialities(id) {
    const typerestaurant = await db.collection('type_restaurant').doc(id);
    const data = await typerestaurant.get();
    if (!data.exists) {
      console.log('Student with the given ID not found');
    } else {
      console.log(data.data());
    }
    return data.data();
  }

  async function getAllSpecialities() {

      const type_restaurants = await db.collection('type_restaurant');
      const data = await type_restaurants.get();
      const typerestaurantsArray = [];
      if (data.empty) {
        console.log('No user record found');
      } else {
        data.forEach(doc => {
          const speciality = {
            doc.id,
            doc.data().libelle_type_restaurant,
            doc.data().lastname,
            doc.data().state_type_restaurant,
            doc.data().created_at
          };
          typerestaurantsArray.push(speciality);
          console.log("Document data:", typerestaurantsArray);
        });
        return typerestaurantsArray;
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
    addSpecialities,
    updateSpecialities,
    getSpecialities,
    getAllSpecialities,
    deleteSpecialities,
  }

  return (
    <SpecialitiesContext.Provider value={value}>
      {!loading && children}
    </SpecialitiesContext.Provider>
  )
}
