
// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Note in the database
  (async () => {

    try {
      await db.collection('note')
      .add({
        valuenote: req.body.valuenote,
        command_id: req.body.command_id,
        isfavoury: req.body.isfavoury,
        state_note: req.body.state_note,
        created_at: req.body.created_at
      })
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }

  })();
};

// Retrieve all Notes from the database.
exports.findAll = (req, res) => {
  (async () => {
        try {
            let query = db.collection('note');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    valuenote: doc.data().valuenote,
                    command_id: doc.data().command_id,
                    isfavoury: doc.data().isfavoury,
                    state_note: doc.data().state_note,
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

// Find a single Note with a noteId
exports.findOne = (req, res) => {
  (async () => {
        try {
            let query = db.collection('note').doc(req.params.item_id);
            let item = await document.get();
            let response = [];

                const selectedItem = {
                    id: item.id,
                    valuenote: item.data().valuenote,
                    command_id: item.data().command_id,
                    isfavoury: item.data().isfavoury,
                    state_note: item.data().state_note,
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

// Update a Note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  (async () => {
      try {
          const document = db.collection('note').doc(req.params.item_id);
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

// Delete a Note with the specified noteId in the request
exports.delete = (req, res) => {
  (async () => {
    try {
        const document = db.collection('note').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};

// Delete all Notes from the database.
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
