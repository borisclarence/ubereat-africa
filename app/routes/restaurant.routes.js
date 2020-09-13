module.exports = app => {
  const restaurant = require("../controllers/restaurant.controller.js");

  // Create a new restaurant
  app.post("/restaurant", restaurant.create);

  // Retrieve all restaurant
  app.get("/restaurant", restaurant.findAll);

  // Retrieve a single restaurant with restaurantId
  app.get("/restaurant/:restaurantId", restaurant.findOne);

  // Update a restaurant with restaurantId
  app.put("/restaurant/:restaurantId", restaurant.update);

  // Delete a restaurant with restaurantId
  app.delete("/restaurant/:restaurantId", restaurant.delete);

  // Create a new restaurant
  app.delete("/restaurant", restaurant.deleteAll);
};
