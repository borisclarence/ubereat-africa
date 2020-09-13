const sql = require("./db.js");

// constructor
const Commande = function(commande) {
  this.numbercommande = commande.numbercommande;
  this.datecommande = commande.datecommande;
  this.quantitycommande = commande.quantitycommande;
  this.global_pricecommande = commande.global_pricecommande;
  this.product_id = commande.product_id;
  this.user_id = commande.user_id;
  this.state_commande = commande.state_commande;
  this.created_at = commande.created_at;
};

Commande.create = (newcommande, result) => {
  sql.query("INSERT INTO commande SET ?", newcommande, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created commande: ", { id: res.insertId, ...newcommande });
    result(null, { id: res.insertId, ...newcommande });
  });
};

Commande.findById = (commandeId, result) => {
  sql.query(`SELECT * FROM commande WHERE idcommande = ${commandeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found commande: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found commande with the id
    result({ kind: "not_found" }, null);
  });
};

Commande.getAll = result => {
  sql.query("SELECT * FROM commande", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("commande: ", res);
    result(null, res);
  });
};

Commande.updateById = (id, commande, result) => {
  sql.query(
    "UPDATE commande SET numbercommande = ?, datecommande = ?, quantitycommande = ?, global_pricecommande = ?, product_id = ?, user_id = ? WHERE idcommande = ?",
    [commande.numbercommande, commande.datecommande, commande.quantitycommande, commande.global_pricecommande, commande.product_id, commande.user_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Commande with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated commande: ", { id: id, ...commande });
      result(null, { id: id, ...commande });
    }
  );
};

Commande.remove = (id, result) => {
  sql.query("DELETE FROM commande WHERE idcommande = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Commande with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted commande with id: ", id);
    result(null, res);
  });
};

Commande.removeAll = result => {
  sql.query("DELETE FROM commande", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} commande`);
    result(null, res);
  });
};

Commande.logic_remove = (id, commande, result) => {
  sql.query(
    "UPDATE commande SET state_commande = ? WHERE idcommande = ?",
    [commande.state_commande, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Commande with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("delete logic commande: ", { id: id, ...commande });
      result(null, { id: id, ...commande });
    }
  );
};

Commande.logic_removeAll = (commande, result) => {
  sql.query("UPDATE commande SET state_commande = ? ",
  [commande.state_commande],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`delete logic ${res.affectedRows} commande`);
    result(null, res);
  });
};

module.exports = Commande;
