
// Create and Save a new Paiement
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Paiement in the database
  (async () => {

    try {
      await db.collection('paiement')
      .add({
        tokenpaiement: req.body.tokenpaiement,
        datepaiement: req.body.datepaiement,
        command_id: req.body.command_id,
        type_paiement_id: req.body.type_paiement_id,
        state_paiement: req.body.state_paiement,
        created_at: req.body.created_at
      })
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }

  })();
};

// Retrieve all Paiements from the database.
exports.findAll = (req, res) => {
  (async () => {
        try {
            let query = db.collection('paiement');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    tokenpaiement: doc.data().tokenpaiement,
                    datepaiement: doc.data().datepaiement,
                    command_id: doc.data().command_id,
                    type_paiement_id: doc.data().type_paiement_id,
                    state_paiement: doc.data().state_paiement,
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

// Find a single Paiement with a paiementId
exports.findOne = (req, res) => {
  (async () => {
        try {
            let query = db.collection('paiement').doc(req.params.item_id);
            let item = await document.get();
            let response = [];

                const selectedItem = {
                    id: item.id,
                    tokenpaiement: item.data().tokenpaiement,
                    datepaiement: item.data().datepaiement,
                    command_id: item.data().command_id,
                    type_paiement_id: item.data().type_paiement_id,
                    state_paiement: item.data().state_paiement,
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

// Update a Paiement identified by the paiementId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  (async () => {
      try {
          const document = db.collection('paiement').doc(req.params.item_id);
          await document.update({
            valuenote: req.body.valuenote,
            command_id: req.body.command_id,
            isfavoury: req.body.isfavoury,
            state_note: req.body.state_note,
            created_at: req.body.created_at
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
};

// Delete a Paiement with the specified paiementId in the request
exports.delete = (req, res) => {
  (async () => {
    try {
        const document = db.collection('paiement').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};

// Delete all Paiements from the database.
exports.deleteAll = (req, res) => {
  (async () => {
    try {
        const document = db.collection('note');
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};
