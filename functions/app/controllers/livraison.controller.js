
// Create and Save a new Livraison
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Livraison in the database
  (async () => {

    try {
      await db.collection('livraison')
      .add({
        libellelivraison: req.body.libellelivraison,
        estimate_datelivraison: req.body.estimate_datelivraison,
        real_datelivraison: req.body.real_datelivraison,
        livraison_confirmed: req.body.livraison_confirmed,
        adress_livraison: req.body.adress_livraison,
        command_id: req.body.command_id,
        state_livraison: req.body.state_livraison,
        created_at: req.body.created_at
      })
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }

  })();
};

// Retrieve all Livraisons from the database.
exports.findAll = (req, res) => {
  (async () => {
        try {
            let query = db.collection('livraison');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    libellelivraison: doc.data().libellelivraison,
                    estimate_datelivraison: doc.data().estimate_datelivraison,
                    real_datelivraison: doc.data().real_datelivraison,
                    livraison_confirmed: doc.data().livraison_confirmed,
                    adress_livraison: doc.data().adress_livraison,
                    command_id: doc.data().command_id,
                    state_livraison: doc.data().state_livraison,
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

// Find a single Livraison with a livraisonId
exports.findOne = (req, res) => {
  (async () => {
        try {
            let query = db.collection('livraison').doc(req.params.item_id);
            let item = await document.get();
            let response = [];

                const selectedItem = {
                    id: item.id,
                    libellelivraison: item.data().libellelivraison,
                    estimate_datelivraison: item.data().estimate_datelivraison,
                    real_datelivraison: item.data().real_datelivraison,
                    livraison_confirmed: item.data().livraison_confirmed,
                    adress_livraison: item.data().adress_livraison,
                    command_id: item.data().command_id,
                    state_livraison: item.data().state_livraison,
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

// Update a Livraison identified by the livraisonId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  (async () => {
      try {
          const document = db.collection('livraison').doc(req.params.item_id);
          await document.update({
            libellelivraison: req.body.libellelivraison,
            estimate_datelivraison: req.body.estimate_datelivraison,
            real_datelivraison: req.body.real_datelivraison,
            livraison_confirmed: req.body.livraison_confirmed,
            adress_livraison: req.body.adress_livraison,
            command_id: req.body.command_id,
            state_livraison: req.body.state_livraison,
            created_at: req.body.created_at
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
};

// Delete a Livraison with the specified livraisonId in the request
exports.delete = (req, res) => {
  (async () => {
    try {
        const document = db.collection('livraison').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};

// Delete all Livraisons from the database.
exports.deleteAll = (req, res) => {
  (async () => {
    try {
        const document = db.collection('livraison');
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};
