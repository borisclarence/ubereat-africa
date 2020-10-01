module.exports = app => {
  const type_restaurant = require("../controllers/type_restaurant.controller.js");

  // Create a new type_restaurant
  app.post("/type_restaurant", type_restaurant.create);

  // Retrieve all type_restaurants
  app.get("/type_restaurant", type_restaurant.findAll);

  // Retrieve a single type_restaurant with type_restaurantId
  app.get("/type_restaurant/:type_restaurantId", type_restaurant.findOne);

  // Update a type_restaurant with type_restaurantId
  app.put("/type_restaurant/:type_restaurantId", type_restaurant.update);

  // Delete a type_restaurant with type_restaurantId
  app.delete("/type_restaurant/:type_restaurantId", type_restaurant.delete);

  // Create a new type_restaurant
  app.delete("/type_restaurant", type_restaurant.deleteAll);
};
