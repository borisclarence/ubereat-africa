import React, { useContext, useState, useEffect } from "react"
import { auth } from "firebase"

const ProductContext = React.createContext()

const firestore = auth.firestore();

export function useProducts() {
  return useContext(ProductContext)
}

export function ProductProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function addProduct(libelleproduct, descriptionproduct, pictureproduct, price_out_tax_product, state_product, created_at) {
    return db.collection('product').add({
      libelleproduct,
      descriptionproduct,
      pictureproduct,
      price_out_tax_product,
      state_product,
      created_at
      return response.user;
    });

  }

  async function updateProduct(id, bodydata) {
    const data = bodydata;
    const product = await db.collection('product').doc(id);
    await product.update(data);

    return product;
  }

  async function deleteProduct(id) {

    return await db.collection('product').doc(id).delete();
  }

  async function getProduct(id) {
    const product = await db.collection('product').doc(id);
    const data = await product.get();
    if (!data.exists) {
      console.log('Student with the given ID not found');
    } else {
      console.log(data.data());
    }
    return data.data();
  }

  async function getAllProduct() {

      const products = await db.collection('product');
      const data = await products.get();
      const productsArray = [];
      if (data.empty) {
        console.log('No product record found');
      } else {
        data.forEach(doc => {
          const product = () => {
            doc.id,
            doc.data().libelleproduct,
            doc.data().descriptionproduct,
            doc.data().pictureproduct,
            doc.data().price_out_tax_product,
            doc.data().state_product,
            doc.data().created_at
          };
          productsArray.push(product);
          console.log("Document data:", productsArray);
        });
        return productsArray;
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
    addProduct,
    updateProduct,
    getProduct,
    getAllProduct,
    deleteProduct,
  }

  return (
    <ProductContext.Provider value={value}>
      {!loading && children}
    </ProductContext.Provider>
  )
}
