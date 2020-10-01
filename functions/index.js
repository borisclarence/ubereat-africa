const functions = require('firebase-functions');
const admin = require('firebase-admin');


var serviceAccount = require("./ebooff-africa-firebase-adminsdk-y4y42-760f7e34d0.json");



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ebooff-africa.firebaseio.com"
});


const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const db = admin.firestore();
const cors = require('cors');
//const functions = require('firebase-functions');
app.use( cors( { origin:true } ) );

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello world');
});

//Routes
require("./app/routes/category.routes.js")(app);
require("./app/routes/commande.routes.js")(app);
require("./app/routes/livraison.routes.js")(app);
require("./app/routes/note.routes.js")(app);
require("./app/routes/paiement.routes.js")(app);
require("./app/routes/product.routes.js")(app);
require("./app/routes/restaurant.routes.js")(app);
require("./app/routes/type_payement.routes.js")(app);
require("./app/routes/type_restaurant.routes.js")(app);
require("./app/routes/user.routes.js")(app);

//Create
app.get('/api/create', (req, res) => {

  (async () => {

    try {
      await db.collection('products').doc('/' + req.body.id + '/')
      .create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      })

      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }

  })();
});

//Read

//Update

//Delete



//Export the api to Firebase Cloud Functions
exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
