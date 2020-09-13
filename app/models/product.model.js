const sql = require("./db.js");

// constructor
const Product = function(product) {
  this.libelleproduct = product.libelleproduct;
  this.descriptionproduct = product.descriptionproduct;
  this.pictureproduct = product.pictureproduct;
  this.price_out_taxproduct = product.price_out_taxproduct;
  this.category_id = product.category_id;
  this.state_product = product.state_product;
  this.created_at = product.created_at;
};

Product.create = (newproduct, result) => {
  sql.query("INSERT INTO product SET ?", newproduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new product: ", { id: res.insertId, ...newproduct });
    result(null, { id: res.insertId, ...newproduct });
  });
};

Product.findById = (productId, result) => {
  sql.query(`SELECT * FROM product WHERE idproduct = ${productId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found productId: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = result => {
  sql.query("SELECT * FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("product: ", res);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE product SET libelleproduct = ?, descriptionproduct = ?, pictureproduct = ?, price_out_taxproduct = ?, category_id = ? WHERE idproduct = ?",
    [product.libelleproduct, product.descriptionproduct, product.pictureproduct, product.price_out_taxproduct, product.category_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  sql.query("DELETE FROM product WHERE idproduct = ?", id, (err, res) => {
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

    console.log("deleted product with id: ", id);
    result(null, res);
  });
};

Product.removeAll = result => {
  sql.query("DELETE FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} product`);
    result(null, res);
  });
};

Product.logic_remove = (id, product, result) => {
  sql.query(
    "UPDATE product SET state_product = ? WHERE idproduct = ?",
    [product.state_product, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("delete logic product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.logic_removeAll = (product, result) => {
  sql.query("UPDATE product SET state_product = ? ",
  [product.state_product],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`delete logic ${res.affectedRows} product`);
    result(null, res);
  });
};

module.exports = Product;
