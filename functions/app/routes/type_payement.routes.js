module.exports = app => {
  const type_payement = require("../controllers/type_payement.controller.js");

  // Create a new type_payement
  app.post("/type_payement", type_payement.create);

  // Retrieve all type_payements
  app.get("/type_payement", type_payement.findAll);

  // Retrieve a single type_payement with type_payementId
  app.get("/type_payement/:type_payementId", type_payement.findOne);

  // Update a type_payement with type_payementId
  app.put("/type_payement/:type_payementId", type_payement.update);

  // Delete a type_payement with type_payementId
  app.delete("/type_payement/:type_payementId", type_payement.delete);

  // Create a new type_payement
  app.delete("/type_payement", type_payement.deleteAll);
};
