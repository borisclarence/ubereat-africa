const Type_payement = require("../models/type_payement.model.js");

// Create and Save a new Type_payement
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Type_payement
  const type_payement = new Type_payement({
    libelletype_payement: req.body.libelletype_payement,
    picturetype_payement: req.body.picturetype_payement,
    state_type_payement: req.body.state_type_payement,
    created_at: req.body.created_at
  });

  // Save Type_payement in the database
  Type_payement.create(type_payement, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the USer."
      });
    else res.send(data);
  });
};

// Retrieve all Type_payements from the database.
exports.findAll = (req, res) => {
  Type_payement.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving type_payements."
      });
    else res.send(data);
  });
};

// Find a single Type_payement with a type_payementId
exports.findOne = (req, res) => {
  Type_payement.findById(req.params.type_payementId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Type_payement with id ${req.params.type_payementId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Type_payement with id " + req.params.type_payementId
        });
      }
    } else res.send(data);
  });
};

// Update a Type_payement identified by the type_payementId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Type_payement.updateById(
    req.params.type_payementId,
    new Type_payement(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Type_payement with id ${req.params.type_payementId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Type_payement with id " + req.params.type_payementId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Type_payement with the specified type_payementId in the request
exports.delete = (req, res) => {
  Type_payement.remove(req.params.type_payementId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Type_payement with id ${req.params.type_payementId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Type_payement with id " + req.params.type_payementId
        });
      }
    } else res.send({ message: `Type_payement was deleted successfully!` });
  });
};

// Delete all Type_payements from the database.
exports.deleteAll = (req, res) => {
  Type_payement.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Type_payements were deleted successfully!` });
  });
};
