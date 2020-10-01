

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User

  (async () => {

    try {
      await db.collection('User')
      .add({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        adress_street: req.body.adress_street,
        sex: req.body.sex,
        phone_number: req.body.phone_number,
        picture: req.body.picture,
        email: req.body.email,
        password: req.body.password,
        is_active: req.body.is_active,
        state_user: req.body.state_user,
        profile_id: req.body.profile_id,
        created_at: req.body.created_at
      })
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }

  })();
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  (async () => {
        try {
            let query = db.collection('User');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                  id: doc.id,
                  firstname: item.data().firstname,
                  lastname: item.data().lastname,
                  adress_street: item.data().adress_street,
                  sex: item.data().sex,
                  phone_number: item.data().phone_number,
                  picture: item.data().picture,
                  email: item.data().email,
                  password: item.data().password,
                  is_active: item.data().is_active,
                  state_user: item.data().state_user,
                  profile_id: item.data().profile_id,
                  created_at: item.data().created_at
                };
                response.push(selectedItem);
            }
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
   })();

};

// Find a single User with a userId
exports.findOne = (req, res) => {
  (async () => {
        try {
            const document = db.collection('User').doc(req.params.item_id);
            let item = await document.get();
            let response = [];

             const selectedItem = {
                 id: item.id,
                 firstname: item.data().firstname,
                 lastname: item.data().lastname,
                 adress_street: item.data().adress_street,
                 sex: item.data().sex,
                 phone_number: item.data().phone_number,
                 picture: item.data().picture,
                 email: item.data().email,
                 password: item.data().password,
                 is_active: item.data().is_active,
                 state_user: item.data().state_user,
                 profile_id: item.data().profile_id,
                 created_at: item.data().created_at
             };
             response.push(selectedItem);
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  (async () => {
      try {
          const document = db.collection('User').doc(req.params.item_id);
          await document.update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            adress_street: req.body.adress_street,
            sex: req.body.sex,
            phone_number: req.body.phone_number,
            picture: req.body.picture,
            email: req.body.email,
            password: req.body.password,
            is_active: req.body.is_active,
            state_user: req.body.state_user,
            profile_id: req.body.profile_id,
            created_at: req.body.created_at
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  (async () => {
    try {
        const document = db.collection('User').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  (async () => {
    try {
        const document = db.collection('User');
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};

// Register and Save a new User
exports.register = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  firebase.auth().createUserWithEmailAndPassword(req.email, req.password)
  .then(function(userAdded)
  {
    const userId = userAdded.user.uid;
    (async () => {

      try {
        await db.collection('User').doc(userId)
        .set({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          adress_street: req.body.adress_street,
          sex: req.body.sex,
          phone_number: req.body.phone_number,
          picture: req.body.picture,
          email: req.body.email,
          password: req.body.password,
          is_active: req.body.is_active,
          state_user: req.body.state_user,
          profile_id: req.body.profile_id,
          created_at: req.body.created_at
        })
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }

    })();
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  });

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

};

// Login and Check a new User
exports.login = (req, res) => {
  var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((response) => {
      //return response.user;
      res.status(200).send({ auth: true, user: response.user });
    }).catch((error) => {
      console.log(error);
      return res.status(500).send("There was a problem finding the user.");
    });
};

exports.logout = (req, res) => {
   //res.status(200).send({ auth: false, token: null });

   firebase.auth().signOut().then(function() {
        // Sign-out successful.
        res.status(200).send({ auth: false, token: null });
    }).catch(function(error) {
        // An error happened.
        return res.status(500).send("An error happened.");
    });
};

exports.userLogged = (req, res) => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      res.status(200).send();
    } else {
      // No user is signed in.
      return res.status(500).send("An error happened.");
    }
  });
};
