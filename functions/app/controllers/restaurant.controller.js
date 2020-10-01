
// Create and Save a new Restaurant
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Restaurant
  const restaurant = new Restaurant({

  });

  // Save Restaurant in the database
  (async () => {

    try {
      await db.collection('restaurant')
      .add({
        libelle_restaurant: req.body.libelle_restaurant,
        description_restaurant: req.body.description_restaurant,
        picture_restaurant: req.body.picture_restaurant,
        time_open_restaurant: req.body.time_open_restaurant,
        time_close_restaurant: req.body.time_close_restaurant,
        type_restaurant_id: req.body.type_restaurant_id,
        is_open: req.body.is_open,
        state_restaurant: req.body.state_restaurant,
        created_at: req.body.created_at
      })
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }

  })();
};

// Retrieve all Restaurants from the database.
exports.findAll = (req, res) => {
  (async () => {
        try {
            let query = db.collection('restaurant');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    libelle_restaurant: doc.data().libelle_restaurant,
                    description_restaurant: doc.data().description_restaurant,
                    picture_restaurant: doc.data().picture_restaurant,
                    time_open_restaurant: doc.data().time_open_restaurant,
                    time_close_restaurant: doc.data().time_close_restaurant,
                    type_restaurant_id: doc.data().type_restaurant_id,
                    is_open: doc.data().is_open,
                    state_restaurant: doc.data().state_restaurant,
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

// Find a single Restaurant with a restaurantId
exports.findOne = (req, res) => {
  (async () => {
        try {
            let query = db.collection('restaurant').doc(req.params.item_id);
            let item = await document.get();
            let response = [];

                const selectedItem = {
                    id: item.id,
                    libelle_restaurant: item.data().libelle_restaurant,
                    description_restaurant: item.data().description_restaurant,
                    picture_restaurant: item.data().picture_restaurant,
                    time_open_restaurant: item.data().time_open_restaurant,
                    time_close_restaurant: item.data().time_close_restaurant,
                    type_restaurant_id: item.data().type_restaurant_id,
                    is_open: item.data().is_open,
                    state_restaurant: item.data().state_restaurant,
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

// Update a Restaurant identified by the restaurantId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  (async () => {
      try {
          const document = db.collection('restaurant').doc(req.params.item_id);
          await document.update({
            libelle_restaurant: req.body.libelle_restaurant,
            description_restaurant: req.body.description_restaurant,
            picture_restaurant: req.body.picture_restaurant,
            time_open_restaurant: req.body.time_open_restaurant,
            time_close_restaurant: req.body.time_close_restaurant,
            type_restaurant_id: req.body.type_restaurant_id,
            is_open: req.body.is_open,
            state_restaurant: req.body.state_restaurant,
            created_at: req.body.created_at
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
};

// Delete a Restaurant with the specified restaurantId in the request
exports.delete = (req, res) => {
  (async () => {
    try {
        const document = db.collection('restaurant').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};

// Delete all Restaurants from the database.
exports.deleteAll = (req, res) => {
  (async () => {
    try {
        const document = db.collection('restaurant');
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};
