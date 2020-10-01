
// Create and Save a new Type_payement
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Type_payement in the database
  (async () => {

    try {
      await db.collection('type_payement')
      .add({
        libelletype_payement: req.body.libelletype_payement,
        picturetype_payement: req.body.picturetype_payement,
        state_type_payement: req.body.state_type_payement,
        created_at: req.body.created_at
      })
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }

  })();
};

// Retrieve all Type_payements from the database.
exports.findAll = (req, res) => {
  (async () => {
        try {
            let query = db.collection('type_payement');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    libelletype_payement: doc.data().libelletype_payement,
                    picturetype_payement: doc.data().picturetype_payement,
                    state_type_payement: doc.data().state_type_payement,
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

// Find a single Type_payement with a type_payementId
exports.findOne = (req, res) => {
  (async () => {
        try {
            let query = db.collection('type_payement').doc(req.params.item_id);
            let item = await document.get();
            let response = [];

                const selectedItem = {
                    id: item.id,
                    libelletype_payement: item.data().libelletype_payement,
                    picturetype_payement: item.data().picturetype_payement,
                    state_type_payement: item.data().state_type_payement,
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

// Update a Type_payement identified by the type_payementId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  (async () => {
      try {
          const document = db.collection('type_payement').doc(req.params.item_id);
          await document.update({
            libelletype_payement: req.body.libelletype_payement,
            picturetype_payement: req.body.picturetype_payement,
            state_type_payement: req.body.state_type_payement,
            created_at: req.body.created_at
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
};

// Delete a Type_payement with the specified type_payementId in the request
exports.delete = (req, res) => {
  (async () => {
    try {
        const document = db.collection('type_payement').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};

// Delete all Type_payements from the database.
exports.deleteAll = (req, res) => {
  (async () => {
    try {
        const document = db.collection('type_payement');
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};
