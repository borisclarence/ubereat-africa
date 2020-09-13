const Commande = require("../models/commande.model.js");

// Create and Save a new Commande
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Commande
  const commande = new Commande({
    numbercommande: req.body.numbercommande,
    datecommande: req.body.datecommande,
    quantitycommande: req.body.quantitycommande,
    global_pricecommande: req.body.global_pricecommande,
    product_id: req.body.product_id,
    user_id: req.body.user_id,
    state_commande: req.body.state_commande,
    created_at: req.body.created_at
  });

  // Save Commande in the database
  Commande.create(commande, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the USer."
      });
    else res.send(data);
  });
};

// Retrieve all Commandes from the database.
exports.findAll = (req, res) => {
  Commande.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving commandes."
      });
    else res.send(data);
  });
};

// Find a single Commande with a commandeId
exports.findOne = (req, res) => {
  Commande.findById(req.params.commandeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Commande with id ${req.params.commandeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Commande with id " + req.params.commandeId
        });
      }
    } else res.send(data);
  });
};

// Update a Commande identified by the commandeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Commande.updateById(
    req.params.commandeId,
    new Commande(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Commande with id ${req.params.commandeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Commande with id " + req.params.commandeId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Commande with the specified commandeId in the request
exports.delete = (req, res) => {
  Commande.remove(req.params.commandeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Commande with id ${req.params.commandeId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Commande with id " + req.params.commandeId
        });
      }
    } else res.send({ message: `Commande was deleted successfully!` });
  });
};

// Delete all Commandes from the database.
exports.deleteAll = (req, res) => {
  Commande.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Commandes were deleted successfully!` });
  });
};
