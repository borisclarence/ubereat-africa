const sql = require("./db.js");

// constructor
const Category = function(category) {
  this.libellecategory = category.libellecategory;
  this.picturecategory = category.picturecategory;
  this.state_category = category.state_category;
  this.created_at = category.created_at;
};

Category.create = (newcategory, result) => {
  sql.query("INSERT INTO category SET ?", newcategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created category: ", { id: res.insertId, ...newcategory });
    result(null, { id: res.insertId, ...newcategory });
  });
};

Category.findById = (categoryId, result) => {
  sql.query(`SELECT * FROM category WHERE idcategory = ${categoryId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found category: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found category with the id
    result({ kind: "not_found" }, null);
  });
};

Category.getAll = result => {
  sql.query("SELECT * FROM category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("category: ", res);
    result(null, res);
  });
};

Category.updateById = (id, category, result) => {
  sql.query(
    "UPDATE category SET libellecategory = ?, picturecategory = ? WHERE idcategory = ?",
    [category.libellecategory, category.picturecategory, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Category with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated category: ", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, result) => {
  sql.query("DELETE FROM category WHERE idcategory = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Category with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted category with id: ", id);
    result(null, res);
  });
};

Category.removeAll = result => {
  sql.query("DELETE FROM category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} category`);
    result(null, res);
  });
};

Category.logic_remove = (id, category, result) => {
  sql.query(
    "UPDATE category SET state_category = ? WHERE idcategory = ?",
    [category.state_category, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Category with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("delete logic category: ", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

Category.logic_removeAll = (category, result) => {
  sql.query("UPDATE category SET state_category = ? ",
  [category.state_category],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`delete logic ${res.affectedRows} category`);
    result(null, res);
  });
};

module.exports = Category;
