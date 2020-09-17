module.exports = app => {
  const user = require("../controllers/user.controller.js");

  // Create a new user
  app.post("/user", user.create);

  // Register a new user
  app.post("/register", user.register);

  // Login a user
  app.post("/login", user.login);

  // Logout a user
  app.post("/logout", user.logout);

  // I'm a user logged
  app.post("/me", user.userLogged);

  // Retrieve all users
  app.get("/user", user.findAll);

  // Retrieve a single user with userId
  app.get("/user/:userId", user.findOne);

  // Update a user with userId
  app.put("/user/:userId", user.update);

  // Delete a user with userId
  app.delete("/user/:userId", user.delete);

  // Create a new user
  app.delete("/user", user.deleteAll);
};
