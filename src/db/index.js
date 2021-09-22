const path = require("path");
const fs = require("fs");
const sqlite = require("sqlite3").verbose();
const locationDb = "./db/items.db";

let db;

function init() {
  return new Promise((res, rej) => {
    const dirDb = path.dirname(locationDb);
    if (!fs.existsSync(dirDb)) {
      fs.mkdirSync(dirDb, { recursive: true });
    }

    db = new sqlite.Database(locationDb, (err) => {
      if (err) return rej(err);

      db.run(
        "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255))",
        (err) => {
          if (err) return rej(err);
          res();
        }
      );
    });
  });
}

function addItem({ item }) {
  return new Promise((res, rej) => {
    db.run("INSERT INTO items (name) VALUES (?)", [item.name], (err) => {
      if (err) return rej(err);
      res();
    });
  });
}

function getItems() {
  return new Promise((res, rej) => {
    db.all("SELECT * FROM items", (err, rows) => {
      if (err) return rej(err);
      res(rows);
    });
  });
}

module.exports = { init, addItem, getItems };
