
// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Product in the database
  (async () => {

    try {
      await db.collection('product')
      .add({
        libelleproduct: req.body.libelleproduct,
        descriptionproduct: req.body.descriptionproduct,
        pictureproduct: req.body.pictureproduct,
        price_out_taxproduct: req.body.price_out_taxproduct,
        category_id: req.body.category_id,
        state_product: req.body.state_product,
        created_at: req.body.created_at
      })
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }

  })();
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  (async () => {
        try {
            let query = db.collection('product');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    libelleproduct: doc.data().libelleproduct,
                    descriptionproduct: doc.data().descriptionproduct,
                    pictureproduct: doc.data().pictureproduct,
                    price_out_taxproduct: doc.data().price_out_taxproduct,
                    category_id: doc.data().category_id,
                    state_product: doc.data().state_product,
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

// Find a single Product with a productId
exports.findOne = (req, res) => {
  (async () => {
        try {
            let query = db.collection('product').doc(req.params.item_id);
            let item = await document.get();
            let response = [];

                const selectedItem = {
                    id: item.id,
                    libelleproduct: item.data().libelleproduct,
                    descriptionproduct: item.data().descriptionproduct,
                    pictureproduct: item.data().pictureproduct,
                    price_out_taxproduct: item.data().price_out_taxproduct,
                    category_id: item.data().category_id,
                    state_product: item.data().state_product,
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

// Update a Product identified by the productId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  (async () => {
      try {
          const document = db.collection('product').doc(req.params.item_id);
          await document.update({
            libelleproduct: req.body.libelleproduct,
            descriptionproduct: req.body.descriptionproduct,
            pictureproduct: req.body.pictureproduct,
            price_out_taxproduct: req.body.price_out_taxproduct,
            category_id: req.body.category_id,
            state_product: req.body.state_product,
            created_at: req.body.created_at
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
};

// Delete a Product with the specified productId in the request
exports.delete = (req, res) => {
  (async () => {
    try {
        const document = db.collection('product').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  (async () => {
    try {
        const document = db.collection('product');
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};
