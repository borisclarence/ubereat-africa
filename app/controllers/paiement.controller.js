const Paiement = require("../models/paiement.model.js");

// Create and Save a new Paiement
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Paiement
  const paiement = new Paiement({
    tokenpaiement: req.body.tokenpaiement,
    datepaiement: req.body.datepaiement,
    command_id: req.body.command_id,
    type_paiement_id: req.body.type_paiement_id,
    state_paiement: req.body.state_paiement,
    created_at: req.body.created_at
  });

  // Save Paiement in the database
  Paiement.create(paiement, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the USer."
      });
    else res.send(data);
  });
};

// Retrieve all Paiements from the database.
exports.findAll = (req, res) => {
  Paiement.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving paiements."
      });
    else res.send(data);
  });
};

// Find a single Paiement with a paiementId
exports.findOne = (req, res) => {
  Paiement.findById(req.params.paiementId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Paiement with id ${req.params.paiementId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Paiement with id " + req.params.paiementId
        });
      }
    } else res.send(data);
  });
};

// Update a Paiement identified by the paiementId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Paiement.updateById(
    req.params.paiementId,
    new Paiement(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Paiement with id ${req.params.paiementId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Paiement with id " + req.params.paiementId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Paiement with the specified paiementId in the request
exports.delete = (req, res) => {
  Paiement.remove(req.params.paiementId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Paiement with id ${req.params.paiementId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Paiement with id " + req.params.paiementId
        });
      }
    } else res.send({ message: `Paiement was deleted successfully!` });
  });
};

// Delete all Paiements from the database.
exports.deleteAll = (req, res) => {
  Paiement.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Paiements were deleted successfully!` });
  });
};
