
// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Category in the database

  (async () => {

    try {
      await db.collection('category')
      .add({
        libellecategory: req.body.libellecategory,
        picturecategory: req.body.picturecategory,
        state_category: req.body.state_category,
        created_at: req.body.created_at
      })
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }

  })();
};

// Retrieve all Categorys from the database.
exports.findAll = (req, res) => {

  (async () => {
        try {
            let query = db.collection('category');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    libellecategory: doc.data().libellecategory,
                    picturecategory: doc.data().picturecategory,
                    state_category: doc.data().state_category,
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

// Find a single Category with a categoryId
exports.findOne = (req, res) => {

  (async () => {
        try {
            const document = db.collection('category').doc(req.params.item_id);
            let item = await document.get();
            let response = [];

             const selectedItem = {
                 id: item.id,
                 libellecategory: item.data().libellecategory,
                 picturecategory: item.data().picturecategory,
                 state_category: item.data().state_category,
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

// Update a Category identified by the categoryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  (async () => {
      try {
          const document = db.collection('category').doc(req.params.item_id);
          await document.update({
            libellecategory: req.body.libellecategory,
            picturecategory: req.body.picturecategory,
            state_category: req.body.state_category,
            created_at: req.body.created_at
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
};

// Delete a Category with the specified categoryId in the request
exports.delete = (req, res) => {
  (async () => {
    try {
        const document = db.collection('category').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};

// Delete all Categorys from the database.
exports.deleteAll = (req, res) => {

  (async () => {
    try {
        const document = db.collection('category');
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
};
