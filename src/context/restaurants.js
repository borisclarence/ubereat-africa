import React, { useContext, useState, useEffect } from "react"
import { auth } from "firebase"

const RestaurantsContext = React.createContext()

const db = auth.firestore();

export function useResto() {
  return useContext(RestaurantsContext)
}

export function restaurantsProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function addRestaurants(libelle_restaurant, description_restaurant, picture_restaurant, timeopen, timeclose, isopen, type_restaurant_id, state_restaurant, created_at) {
    return await db.collection('restaurant').add({
        libelle_restaurant,
        description_restaurant,
        picture_restaurant,
         timeopen,
         timeclose,
         isopen,
         type_restaurant_id,
         state_restaurant,
         created_at
    });

  }

  async function updateRestaurants(id, bodydata) {
    const data = bodydata;
    const restaurant = await db.collection('restaurant').doc(id);
    await restaurant.update(data);

    return restaurant;
  }

  async function deleteRestaurants(id) {

    return await db.collection('restaurant').doc(id).delete();
  }

  async function getRestaurants(id) {
    const restaurant = await db.collection('restaurant').doc(id);
    const data = await restaurant.get();
    if (!data.exists) {
      console.log('Student with the given ID not found');
    } else {
      console.log(data.data());
    }
    return data.data();
  }

  async function getAllRestaurants() {

      const restaurants = await db.collection('restaurant');
      const data = await restaurants.get();
      const restaurantsArray = [];
      if (data.empty) {
        console.log('No user record found');
      } else {
        data.forEach(doc => {
          const restaurant = {
            doc.id,
            doc.data().libelle_restaurant,
            doc.data().description_restaurant,
            doc.data().picture_restaurant,
            doc.data().timeopen,
            doc.data().timeclose,
            doc.data().isopen,
            doc.data().type_restaurant_id,
            doc.data().state_restaurant,
            doc.data().created_at
          };
          restaurantsArray.push(restaurant);
          console.log("Document data:", restaurantArray);
        });
        return restaurantArray;
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
    addRestaurantsRestaurants,
    updateRestaurants,
    getRestaurants,
    getAllRestaurants,
    deleteRestaurants,
  }

  return (
    <RestaurantsContext.Provider value={value}>
      {!loading && children}
    </RestaurantsContext.Provider>
  )
}
