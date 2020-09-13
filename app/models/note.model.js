const sql = require("./db.js");

// constructor
const Note = function(note) {
  this.valuenote = note.valuenote;
  this.command_id = note.command_id;
  this.isfavoury = note.isfavoury;
  this.state_note = note.state_note;
  this.created_at = note.created_at;
};

Note.create = (newnote, result) => {
  sql.query("INSERT INTO note SET ?", newnote, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created note: ", { id: res.insertId, ...newnote });
    result(null, { id: res.insertId, ...newnote });
  });
};

Note.findById = (noteId, result) => {
  sql.query(`SELECT * FROM note WHERE idnote = ${noteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found note: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found note with the id
    result({ kind: "not_found" }, null);
  });
};

Note.getAll = result => {
  sql.query("SELECT * FROM note", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("note: ", res);
    result(null, res);
  });
};

Note.updateById = (id, note, result) => {
  sql.query(
    "UPDATE note SET valuenote = ?, command_id = ?, isfavoury = ? WHERE idnote = ?",
    [note.valuenote, note.command_id, note.isfavoury, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Note with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated note: ", { id: id, ...note });
      result(null, { id: id, ...note });
    }
  );
};

Note.remove = (id, result) => {
  sql.query("DELETE FROM note WHERE idnote = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Note with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted note with id: ", id);
    result(null, res);
  });
};

Note.removeAll = result => {
  sql.query("DELETE FROM note", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} note`);
    result(null, res);
  });
};

Note.logic_remove = (id, note, result) => {
  sql.query(
    "UPDATE note SET state_note = ? WHERE idnote = ?",
    [note.state_note, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Note with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("delete logic note: ", { id: id, ...note });
      result(null, { id: id, ...note });
    }
  );
};

Note.logic_removeAll = (note, result) => {
  sql.query("UPDATE note SET state_note = ? ",
  [note.state_note],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`delete logic ${res.affectedRows} note`);
    result(null, res);
  });
};

module.exports = Note;
