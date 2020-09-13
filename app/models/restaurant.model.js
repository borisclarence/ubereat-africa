const sql = require("./db.js");

// constructor
const Restaurant = function(restaurant) {
  this.libelle_restaurant = restaurant.libelle_restaurant;
  this.description_restaurant = restaurant.description_restaurant;
  this.picture_restaurant = restaurant.picture_restaurant;
  this.time_open_restaurant = restaurant.time_open_restaurant;
  this.time_close_restaurant = restaurant.time_close_restaurant;
  this.type_restaurant_id = restaurant.type_restaurant_id;
  this.is_open = restaurant.is_open;
  this.state_restaurant = restaurant.state_restaurant;
  this.created_at = restaurant.created_at;
};

Restaurant.create = (newrestaurant, result) => {
  sql.query("INSERT INTO restaurant SET ?", newrestaurant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created restaurant: ", { id: res.insertId, ...newrestaurant });
    result(null, { id: res.insertId, ...newrestaurant });
  });
};

Restaurant.findById = (restaurantId, result) => {
  sql.query(`SELECT * FROM restaurant WHERE idrestaurant = ${restaurantId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found restaurant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found restaurant with the id
    result({ kind: "not_found" }, null);
  });
};

Restaurant.getAll = result => {
  sql.query("SELECT * FROM restaurant", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("restaurant: ", res);
    result(null, res);
  });
};

Restaurant.updateById = (id, restaurant, result) => {
  sql.query(
    "UPDATE restaurant SET libelle_restaurant = ?, description_restaurant = ?, picture_restaurant = ?, time_open_restaurant = ?, time_close_restaurant = ?, type_restaurant_id = ?, is_open = ? WHERE idrestaurant = ?",
    [restaurant.libelle_restaurant, restaurant.description_restaurant, restaurant.picture_restaurant, restaurant.time_open_restaurant, restaurant.time_close_restaurant, restaurant.type_restaurant_id, restaurant.is_open, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Restaurant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated restaurant: ", { id: id, ...restaurant });
      result(null, { id: id, ...restaurant });
    }
  );
};

Restaurant.remove = (id, result) => {
  sql.query("DELETE FROM restaurant WHERE idrestaurant = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted restaurant with id: ", id);
    result(null, res);
  });
};

Restaurant.removeAll = result => {
  sql.query("DELETE FROM restaurant", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} restaurant`);
    result(null, res);
  });
};

Restaurant.logic_remove = (id, restaurant, result) => {
  sql.query(
    "UPDATE restaurant SET state_restaurant = ? WHERE idrestaurant = ?",
    [restaurant.state_restaurant, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Restaurant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("delete logic restaurant: ", { id: id, ...restaurant });
      result(null, { id: id, ...restaurant });
    }
  );
};

Restaurant.logic_removeAll = (restaurant, result) => {
  sql.query("UPDATE restaurant SET state_restaurant = ? ",
  [restaurant.state_restaurant],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
      }

    console.log(`delete logic ${res.affectedRows} restaurant`);
    result(null, res);
  });
};

module.exports = Restaurant;
