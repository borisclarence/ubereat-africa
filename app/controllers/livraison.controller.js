const Livraison = require("../models/livraison.model.js");

// Create and Save a new Livraison
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Livraison
  const livraison = new Livraison({
    libellelivraison: req.body.libellelivraison,
    estimate_datelivraison: req.body.estimate_datelivraison,
    real_datelivraison: req.body.real_datelivraison,
    livraison_confirmed: req.body.livraison_confirmed,
    adress_livraison: req.body.adress_livraison,
    command_id: req.body.command_id,
    state_livraison: req.body.state_livraison,
    created_at: req.body.created_at
  });

  // Save Livraison in the database
  Livraison.create(livraison, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the USer."
      });
    else res.send(data);
  });
};

// Retrieve all Livraisons from the database.
exports.findAll = (req, res) => {
  Livraison.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving livraisons."
      });
    else res.send(data);
  });
};

// Find a single Livraison with a livraisonId
exports.findOne = (req, res) => {
  Livraison.findById(req.params.livraisonId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Livraison with id ${req.params.livraisonId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Livraison with id " + req.params.livraisonId
        });
      }
    } else res.send(data);
  });
};

// Update a Livraison identified by the livraisonId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Livraison.updateById(
    req.params.livraisonId,
    new Livraison(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Livraison with id ${req.params.livraisonId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Livraison with id " + req.params.livraisonId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Livraison with the specified livraisonId in the request
exports.delete = (req, res) => {
  Livraison.remove(req.params.livraisonId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Livraison with id ${req.params.livraisonId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Livraison with id " + req.params.livraisonId
        });
      }
    } else res.send({ message: `Livraison was deleted successfully!` });
  });
};

// Delete all Livraisons from the database.
exports.deleteAll = (req, res) => {
  Livraison.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Livraisons were deleted successfully!` });
  });
};
