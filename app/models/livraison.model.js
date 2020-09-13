const sql = require("./db.js");

// constructor
const Livraison = function(livraison) {
  this.libellelivraison = livraison.libellelivraison;
  this.estimate_datelivraison = livraison.estimate_datelivraison;
  this.real_datelivraison = livraison.real_datelivraison;
  this.livraison_confirmed = livraison.livraison_confirmed;
  this.adress_livraison = livraison.adress_livraison;
  this.command_id = livraison.command_id;
  this.state_livraison = livraison.state_livraison;
  this.created_at = livraison.created_at;
};

Livraison.create = (newlivraison, result) => {
  sql.query("INSERT INTO livraison SET ?", newlivraison, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created livraison: ", { id: res.insertId, ...newlivraison });
    result(null, { id: res.insertId, ...newlivraison });
  });
};

Livraison.findById = (livraisonId, result) => {
  sql.query(`SELECT * FROM livraison WHERE idlivraison = ${livraisonId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found livraison: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found livraison with the id
    result({ kind: "not_found" }, null);
  });
};

Livraison.getAll = result => {
  sql.query("SELECT * FROM livraison", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("livraison: ", res);
    result(null, res);
  });
};

Livraison.updateById = (id, livraison, result) => {
  sql.query(
    "UPDATE livraison SET libellelivraison = ?, estimate_datelivraison = ?, real_datelivraison = ?, livraison_confirmed = ?, adress_livraison = ?, command_id = ? WHERE idlivraison = ?",
    [livraison.libellelivraison, livraison.estimate_datelivraison, livraison.real_datelivraison, livraison.livraison_confirmed, livraison.adress_livraison, livraison.command_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Livraison with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated livraison: ", { id: id, ...livraison });
      result(null, { id: id, ...livraison });
    }
  );
};

Livraison.remove = (id, result) => {
  sql.query("DELETE FROM livraison WHERE idlivraison = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Livraison with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted livraison with id: ", id);
    result(null, res);
  });
};

Livraison.removeAll = result => {
  sql.query("DELETE FROM livraison", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} livraison`);
    result(null, res);
  });
};

Livraison.logic_remove = (id, livraison, result) => {
  sql.query(
    "UPDATE livraison SET state_livraison = ? WHERE idlivraison = ?",
    [livraison.state_livraison, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Livraison with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("delete logic livraison: ", { id: id, ...livraison });
      result(null, { id: id, ...livraison });
    }
  );
};

Livraison.logic_removeAll = (livraison, result) => {
  sql.query("UPDATE livraison SET state_livraison = ? ",
  [livraison.state_livraison],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`delete logic ${res.affectedRows} livraison`);
    result(null, res);
  });
};

module.exports = Livraison;
