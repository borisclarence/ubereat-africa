module.exports = app => {
  const paiement = require("../controllers/paiement.controller.js");

  // Create a new paiement
  app.post("/paiement", paiement.create);

  // Retrieve all paiements
  app.get("/paiement", paiement.findAll);

  // Retrieve a single paiement with paiementId
  app.get("/paiement/:paiementId", paiement.findOne);

  // Update a paiement with paiementId
  app.put("/paiement/:paiementId", paiement.update);

  // Delete a paiement with paiementId
  app.delete("/paiement/:paiementId", paiement.delete);

  // Create a new paiement
  app.delete("/paiement", paiement.deleteAll);
};
