'use strict';

const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();


const addUser = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await firestore.collection('user').doc().set(data);
    res.send('Record saved successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getAllUser = async (req, res, next) => {
  try {
    const users = await firestore.collection('user');
    const data = await users.get();
    const usersArray = [];
    if (data.empty) {
      res.status(404).send('No user record found');
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
      });
      res.send(usersArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getUser = async(req, res, next) => {
  try {
    const id = req.params.id;
    const user = await firestore.collection('user').doc(id);
    const data = await user.get();
    if (!data.exists) {
      res.status(404).send('Student with the given ID not found');
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const updateUser = async(req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await firestore.collection('user').doc(id);
    await user.update(data);
    res.send('User record updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const deleteUser = async(req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection('user').doc(id).delete();
    res.send('Record deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  addUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser
}
