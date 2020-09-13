module.exports = app => {
  const livraison = require("../controllers/livraison.controller.js");

  // Create a new Livraison
  app.post("/livraison", livraison.create);

  // Retrieve all Livraison
  app.get("/livraison", livraison.findAll);

  // Retrieve a single Livraison with livraisonId
  app.get("/livraison/:livraisonId", livraison.findOne);

  // Update a Livraison with livraisonId
  app.put("/livraison/:livraisonId", livraison.update);

  // Delete a Livraison with livraisonId
  app.delete("/livraison/:livraisonId", livraison.delete);

  // Create a new Livraison
  app.delete("/livraison", livraison.deleteAll);
};
