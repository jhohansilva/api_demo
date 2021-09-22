const { addItem } = require("../db");

module.exports = async (req, res) => {
  const item = {
    name: req?.body?.name || "n/a",
  };

  addItem({ item })
    .then(() => {
      res.send({ code: true, message: "Item agregado correctamente" });
    })
    .catch((err) => {
      res.status(500).send({ code: false, message: "Error agregando item" });
    });
};
