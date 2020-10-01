

// Create and Save a new Type_restaurant
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Type_restaurant in the database
  (async () => {

    try {
      await db.collection('type_restaurant')
      .add({
        libelle_type_restaurant: req.body.libelle_type_restaurant,
        picture_type_restaurant: req.body.picture_type_restaurant,
        state_type_restaurant: req.body.state_type_restaurant,
        created_at: req.body.created_at
      })
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }

  })();
};

// Retrieve all Type_restaurants from the database.
exports.findAll = (req, res) => {
  (async () => {
        try {
            let query = db.collection('type_restaurant');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    libelle_type_restaurant: doc.data().libelle_type_restaurant,
                    picture_type_restaurant: doc.data().picture_type_restaurant,
                    state_type_restaurant: doc.data().state_type_restaurant,
                    created_at: doc.data().created_at
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

// Find a single Type_restaurant with a type_restaurantId
exports.findOne = (req, res) => {
  (async () => {
        try {
            let query = db.collection('type_restaurant').doc(req.params.item_id);
            let item = await document.get();
            let response = [];

                const selectedItem = {
                    id: item.id,
                    libelle_type_restaurant: item.data().libelle_type_restaurant,
                    picture_type_restaurant: item.data().picture_type_restaurant,
                    state_type_restaurant: item.data().state_type_restaurant,
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

// Update a Type_restaurant identified by the type_restaurantId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  (async () => {
      try {
          const document = db.collection('type_restaurant').doc(req.params.item_id);
          await document.update({
            libelle_type_restaurant: req.body.libelle_type_restaurant,
            picture_type_restaurant: req.body.picture_type_restaurant,
            state_type_restaurant: req.body.state_type_restaurant,
            created_at: req.body.created_at
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
};

// Delete a Type_restaurant with the specified type_restaurantId in the request
exports.delete = (req, res) => {
  (async () => {
    try {
        const document = db.collection('type_restaurant').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};

// Delete all Type_restaurants from the database.
exports.deleteAll = (req, res) => {
  (async () => {
    try {
        const document = db.collection('type_restaurant');
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};
