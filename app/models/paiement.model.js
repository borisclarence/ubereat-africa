const sql = require("./db.js");

// constructor
const Paiement = function(paiement) {
  this.tokenpaiement = paiement.tokenpaiement;
  this.datepaiement = paiement.datepaiement;
  this.command_id = paiement.command_id;
  this.type_paiement_id = paiement.type_paiement_id;
  this.state_paiement = paiement.state_paiement;
  this.created_at = paiement.created_at;
};

Paiement.create = (newpaiement, result) => {
  sql.query("INSERT INTO paiement SET ?", newpaiement, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created paiement: ", { id: res.insertId, ...newpaiement });
    result(null, { id: res.insertId, ...newpaiement });
  });
};

Paiement.findById = (paiementId, result) => {
  sql.query(`SELECT * FROM paiement WHERE idpaiement = ${paiementId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found paiement: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found paiement with the id
    result({ kind: "not_found" }, null);
  });
};

Paiement.getAll = result => {
  sql.query("SELECT * FROM paiement", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("paiement: ", res);
    result(null, res);
  });
};

Paiement.updateById = (id, paiement, result) => {
  sql.query(
    "UPDATE paiement SET tokenpaiement = ?, datepaiement = ?, command_id = ?, type_paiement_id = ? WHERE idpaiement = ?",
    [paiement.tokenpaiement, paiement.datepaiement, paiement.command_id, paiement.type_paiement_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Paiement with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated paiement: ", { id: id, ...paiement });
      result(null, { id: id, ...paiement });
    }
  );
};

Paiement.remove = (id, result) => {
  sql.query("DELETE FROM paiement WHERE idpaiement = ?", id, (err, res) => {
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

    console.log("deleted paiement with id: ", id);
    result(null, res);
  });
};

Paiement.removeAll = result => {
  sql.query("DELETE FROM paiement", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} paiement`);
    result(null, res);
  });
};

Paiement.logic_remove = (id, paiement, result) => {
  sql.query(
    "UPDATE paiement SET state_paiement = ? WHERE idpaiement = ?",
    [paiement.state_paiement, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Paiement with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("delete logic paiement: ", { id: id, ...paiement });
      result(null, { id: id, ...paiement });
    }
  );
};

Paiement.logic_removeAll = (paiement, result) => {
  sql.query("UPDATE paiement SET state_paiement = ? ",
  [paiement.state_paiement],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`delete logic ${res.affectedRows} paiement`);
    result(null, res);
  });
};

module.exports = Paiement;
