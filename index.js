const express = require("express");
const parser_json = require("body-parser").json();
const app = express();
const port = 8000;

const { init } = require("./src/db");
const addItem = require("./src/ctrl/addItem");
const getItems = require("./src/ctrl/getItems");

app.use(parser_json);
app.use(express.static(__dirname + "/src/static"));

app.post("/items", addItem);
app.get("/items", getItems);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ha ocurrido un error!");
});

init()
  .then(() => {
    app.listen(port, () => console.log("Listening port " + port));
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });
