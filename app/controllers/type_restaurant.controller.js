const Type_restaurant = require("../models/type_restaurant.model.js");

// Create and Save a new Type_restaurant
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Type_restaurant
  const type_restaurant = new Type_restaurant({
    libelle_type_restaurant: req.body.libelle_type_restaurant,
    picture_type_restaurant: req.body.picture_type_restaurant,
    state_type_restaurant: req.body.state_type_restaurant,
    created_at: req.body.created_at
  });

  // Save Type_restaurant in the database
  Type_restaurant.create(type_restaurant, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the USer."
      });
    else res.send(data);
  });
};

// Retrieve all Type_restaurants from the database.
exports.findAll = (req, res) => {
  Type_restaurant.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving type_restaurants."
      });
    else res.send(data);
  });
};

// Find a single Type_restaurant with a type_restaurantId
exports.findOne = (req, res) => {
  Type_restaurant.findById(req.params.type_restaurantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Type_restaurant with id ${req.params.type_restaurantId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Type_restaurant with id " + req.params.type_restaurantId
        });
      }
    } else res.send(data);
  });
};

// Update a Type_restaurant identified by the type_restaurantId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Type_restaurant.updateById(
    req.params.type_restaurantId,
    new Type_restaurant(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Type_restaurant with id ${req.params.type_restaurantId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Type_restaurant with id " + req.params.type_restaurantId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Type_restaurant with the specified type_restaurantId in the request
exports.delete = (req, res) => {
  Type_restaurant.remove(req.params.type_restaurantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Type_restaurant with id ${req.params.type_restaurantId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Type_restaurant with id " + req.params.type_restaurantId
        });
      }
    } else res.send({ message: `Type_restaurant was deleted successfully!` });
  });
};

// Delete all Type_restaurants from the database.
exports.deleteAll = (req, res) => {
  Type_restaurant.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Type_restaurants were deleted successfully!` });
  });
};
