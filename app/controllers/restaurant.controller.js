const Restaurant = require("../models/restaurant.model.js");

// Create and Save a new Restaurant
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Restaurant
  const restaurant = new Restaurant({
    libelle_restaurant: req.body.libelle_restaurant,
    description_restaurant: req.body.description_restaurant,
    picture_restaurant: req.body.picture_restaurant,
    time_open_restaurant: req.body.time_open_restaurant,
    time_close_restaurant: req.body.time_close_restaurant,
    type_restaurant_id: req.body.type_restaurant_id,
    is_open: req.body.is_open,
    state_restaurant: req.body.state_restaurant,
    created_at: req.body.created_at
  });

  // Save Restaurant in the database
  Restaurant.create(restaurant, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the USer."
      });
    else res.send(data);
  });
};

// Retrieve all Restaurants from the database.
exports.findAll = (req, res) => {
  Restaurant.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurants."
      });
    else res.send(data);
  });
};

// Find a single Restaurant with a restaurantId
exports.findOne = (req, res) => {
  Restaurant.findById(req.params.restaurantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Restaurant with id ${req.params.restaurantId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Restaurant with id " + req.params.restaurantId
        });
      }
    } else res.send(data);
  });
};

// Update a Restaurant identified by the restaurantId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Restaurant.updateById(
    req.params.restaurantId,
    new Restaurant(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Restaurant with id ${req.params.restaurantId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Restaurant with id " + req.params.restaurantId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Restaurant with the specified restaurantId in the request
exports.delete = (req, res) => {
  Restaurant.remove(req.params.restaurantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Restaurant with id ${req.params.restaurantId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Restaurant with id " + req.params.restaurantId
        });
      }
    } else res.send({ message: `Restaurant was deleted successfully!` });
  });
};

// Delete all Restaurants from the database.
exports.deleteAll = (req, res) => {
  Restaurant.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Restaurants were deleted successfully!` });
  });
};
