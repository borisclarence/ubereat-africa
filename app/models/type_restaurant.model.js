const sql = require("./db.js");

// constructor
const Type_restaurant = function(type_restaurant) {
  this.libelle_type_restaurant = type_restaurant.libelle_type_restaurant;
  this.picture_type_restaurant = type_restaurant.picture_type_restaurant;
  this.state_type_restaurant = type_restaurant.state_type_restaurant;
  this.created_at = type_restaurant.created_at;
};

Type_restaurant.create = (newtype_restaurant, result) => {
  sql.query("INSERT INTO type_restaurant SET ?", newtype_restaurant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created type_restaurant: ", { id: res.insertId, ...newtype_restaurant });
    result(null, { id: res.insertId, ...newtype_restaurant });
  });
};

Type_restaurant.findById = (type_restaurantId, result) => {
  sql.query(`SELECT * FROM type_restaurant WHERE idtype_restaurant = ${type_restaurantId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found type_restaurant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found type_restaurant with the id
    result({ kind: "not_found" }, null);
  });
};

Type_restaurant.getAll = result => {
  sql.query("SELECT * FROM type_restaurant", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("type restaurant: ", res);
    result(null, res);
  });
};

Type_restaurant.updateById = (id, type_restaurant, result) => {
  sql.query(
    "UPDATE type_restaurant SET libelle_type_restaurant = ?, picture_type_restaurant = ? WHERE idtype_restaurant = ?",
    [type_restaurant.libelle_type_restaurant, type_restaurant.picture_type_restaurant, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Type_restaurant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated type restaurant: ", { id: id, ...type_restaurant });
      result(null, { id: id, ...type_restaurant });
    }
  );
};

Type_restaurant.remove = (id, result) => {
  sql.query("DELETE FROM type_restaurant WHERE idtype_restaurant = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Type_restaurant with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted type restaurant with id: ", id);
    result(null, res);
  });
};

Type_restaurant.removeAll = result => {
  sql.query("DELETE FROM type_restaurant", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} type restaurant`);
    result(null, res);
  });
};

Type_restaurant.logic_remove = (id, type_restaurant, result) => {
  sql.query(
    "UPDATE type_restaurant SET state_type_restaurant = ? WHERE idtype_restaurant = ?",
    [type_restaurant.state_type_restaurant, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Type_restaurant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("delete logic type restaurant: ", { id: id, ...type_restaurant });
      result(null, { id: id, ...type_restaurant });
    }
  );
};

Type_restaurant.logic_removeAll = (type_restaurant, result) => {
  sql.query("UPDATE type_restaurant SET state_type_restaurant = ? ",
  [type_restaurant.state_type_restaurant],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`delete logic ${res.affectedRows} type restaurant`);
    result(null, res);
  });
};

module.exports = Type_restaurant;
