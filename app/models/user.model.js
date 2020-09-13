const sql = require("./db.js");

// constructor
const User = function(user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.adress_street = user.adress_street;
  this.sex = user.sex;
  this.phone_number = user.phone_number;
  this.picture = user.picture;
  this.email = user.email;
  this.password = user.password;
  this.is_active = user.is_active;
  this.state_user = user.state_user;
  this.profile_id = user.profile_id;
  this.created_at = user.created_at;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM user WHERE iduser = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user SET firstname = ?, lastname = ?, adress_street = ?, sex = ?, phone_number = ?, picture = ?, email = ?, password = ? WHERE iduser = ?",
    [user.firstname, user.lastname, user.adress_street, user.sex, user.phone_number, user.picture, user.email, user.password, id],
    (err, res) => {
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

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM user WHERE iduser = ?", id, (err, res) => {
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

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} user`);
    result(null, res);
  });
};

User.logic_remove = (id, user, result) => {
  sql.query(
    "UPDATE user SET is_active = ?, state_user = ? WHERE iduser = ?",
    [user.is_active, user.state_user, id],
    (err, res) => {
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

      console.log("delete logic user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.logic_removeAll = (user, result) => {
  sql.query("UPDATE user SET is_active = ?, state_user = ? ",
  [user.is_active, user.state_user],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`delete logic ${res.affectedRows} user`);
    result(null, res);
  });
};

module.exports = User;
