const sql = require("./db.js");

// constructor
const Type_payement = function(type_payement) {
  this.libelletype_payement = type_payement.libelletype_payement;
  this.picturetype_payement = type_payement.picturetype_payement;
  this.state_type_payement = type_payement.state_type_payement;
  this.created_at = type_payement.created_at;
};

Type_payement.create = (newtype_payement, result) => {
  sql.query("INSERT INTO type_payement SET ?", newtype_payement, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created type payement: ", { id: res.insertId, ...newtype_payement });
    result(null, { id: res.insertId, ...newtype_payement });
  });
};

Type_payement.findById = (type_payementId, result) => {
  sql.query(`SELECT * FROM type_payement WHERE idtype_payement = ${type_payementId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found type payement: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found restaurant with the id
    result({ kind: "not_found" }, null);
  });
};

Type_payement.getAll = result => {
  sql.query("SELECT * FROM type_payement", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("type payement: ", res);
    result(null, res);
  });
};

Type_payement.updateById = (id, type_payement, result) => {
  sql.query(
    "UPDATE type_payement SET libelletype_payement = ?, picturetype_payement = ? WHERE idtype_payement = ?",
    [type_payement.libelletype_payement, type_payement.picturetype_payement, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Type_payement with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated type payement: ", { id: id, ...type_payement });
      result(null, { id: id, ...type_payement });
    }
  );
};

Type_payement.remove = (id, result) => {
  sql.query("DELETE FROM type_payement WHERE idtype_payement = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Type Payement with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted type payement with id: ", id);
    result(null, res);
  });
};

Type_payement.removeAll = result => {
  sql.query("DELETE FROM type_payement", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} type payement`);
    result(null, res);
  });
};

Type_payement.logic_remove = (id, type_payement, result) => {
  sql.query(
    "UPDATE type_payement SET state_type_payement = ? WHERE idtype_payement = ?",
    [type_payement.state_type_payement, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Restaurant wi th the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("delete logic type payement: ", { id: id, ...type_payement });
      result(null, { id: id, ...type_payement });
    }
  );
};

Type_payement.logic_removeAll = (type_payement, result) => {
  sql.query("UPDATE type_payement SET state_type_payement = ? ",
  [type_payement.state_type_payement],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`delete logic ${res.affectedRows} type payement`);
    result(null, res);
  });
};

module.exports = Type_payement;
