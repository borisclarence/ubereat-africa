
// Create and Save a new Commande
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Commande in the database
  (async () => {

    try {
      await db.collection('commande')
      .add({
        numbercommande: req.body.numbercommande,
        datecommande: req.body.datecommande,
        quantitycommande: req.body.quantitycommande,
        global_pricecommande: req.body.global_pricecommande,
        product_id: req.body.product_id,
        user_id: req.body.user_id,
        state_commande: req.body.state_commande,
        created_at: req.body.created_at
      })
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }

  })();
};

// Retrieve all Commandes from the database.
exports.findAll = (req, res) => {
  (async () => {
        try {
            let query = db.collection('commande');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    numbercommande: doc.data().numbercommande,
                    datecommande: doc.data().datecommande,
                    quantitycommande: doc.data().quantitycommande,
                    global_pricecommande: doc.data().global_pricecommande,
                    product_id: doc.data().product_id,
                    user_id: doc.data().user_id,
                    state_commande: doc.data().state_commande,
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

// Find a single Commande with a commandeId
exports.findOne = (req, res) => {

  (async () => {
        try {

            const document = db.collection('commande').doc(req.params.item_id);
            let item = await document.get();
            let response = [];

             const selectedItem = {
                 id: item.id,
                 numbercommande: item.data().numbercommande,
                 datecommande: item.data().datecommande,
                 quantitycommande: item.data().quantitycommande,
                 global_pricecommande: item.data().global_pricecommande,
                 product_id: item.data().product_id,
                 user_id: item.data().user_id,
                 state_commande: item.data().state_commande,
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

// Update a Commande identified by the commandeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  (async () => {
      try {
          const document = db.collection('commande').doc(req.params.item_id);
          await document.update({
            numbercommande: req.body.numbercommande,
            datecommande: req.body.datecommande,
            quantitycommande: req.body.quantitycommande,
            global_pricecommande: req.body.global_pricecommande,
            product_id: req.body.product_id,
            user_id: req.body.user_id,
            state_commande: req.body.state_commande,
            created_at: req.body.created_at
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
};

// Delete a Commande with the specified commandeId in the request
exports.delete = (req, res) => {
  (async () => {
    try {
        const document = db.collection('commande').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};

// Delete all Commandes from the database.
exports.deleteAll = (req, res) => {
  (async () => {
    try {
        const document = db.collection('commande');
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};
