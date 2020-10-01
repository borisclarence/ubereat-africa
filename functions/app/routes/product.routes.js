module.exports = app => {
  const product = require("../controllers/product.controller.js");

  // Create a new product
  app.post("/product", product.create);

  // Retrieve all products
  app.get("/product", product.findAll);

  // Retrieve a single product with productId
  app.get("/product/:productId", product.findOne);

  // Update a product with productId
  app.put("/product/:productId", product.update);

  // Delete a product with productId
  app.delete("/product/:productId", product.delete);

  // Create a new product
  app.delete("/product", product.deleteAll);
};
