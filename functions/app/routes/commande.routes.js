module.exports = app => {
  const commande = require("../controllers/commande.controller.js");

  // Create a new Commande
  app.post("/commande", commande.create);

  // Retrieve all Commande
  app.get("/commande", commande.findAll);

  // Retrieve a single Commande with commandeId
  app.get("/commande/:commandeId", commande.findOne);

  // Update a Commande with commandeId
  app.put("/commande/:commandeId", commande.update);

  // Delete a Commande with commandeId
  app.delete("/commande/:commandeId", commande.delete);

  // Create a new Commande
  app.delete("/commande", commande.deleteAll);
};
