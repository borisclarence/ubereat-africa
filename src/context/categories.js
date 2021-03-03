import React, { useContext, useState, useEffect } from "react"
import { auth } from "firebase"

const CategoriesContext = React.createContext()

const firestore = auth.firestore();

export function useCate() {
  return useContext(CategoriesContext)
}

export function CategoriesProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function addCategories(libellecategory, picturecategory, state_category, created_at) {
    return await db.collection('category').add({
      libellecategory,
      picturecategory,
      state_category,
      created_at
    });

  }

  async function updateCategories(id, bodydata) {
    const data = bodydata;
    const category = await db.collection('category').doc(id);
    await category.update(data);

    return category;
  }

  async function deleteCategories(id) {

    return await db.collection('category').doc(id).delete();
  }

  async function getCategories(id) {
    const category = await db.collection('category').doc(id);
    const data = await category.get();
    if (!data.exists) {
      console.log('Student with the given ID not found');
    } else {
      console.log(data.data());
    }
    return data.data();
  }

  async function getAllCategories() {

      const categories = await db.collection('category');
      const data = await categories.get();
      const categoriesArray = [];
      if (data.empty) {
        console.log('No categorie record found');
      } else {
        data.forEach(doc => {
          const categorie = {
            doc.id,
            doc.data().libellecategory,
            doc.data().picturecategory,
            doc.data().state_category,
            doc.data().created_at
          };
          categoriesArray.push(categorie);
          console.log("Document data:", categoriesArray);
        });
        return categoriesArray;
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
    addCategories,
    updateCategories,
    getCategories,
    getAllCategories,
    deleteCategories,
  }

  return (
    <CategoriesContext.Provider value={value}>
      {!loading && children}
    </CategoriesContext.Provider>
  )
}
