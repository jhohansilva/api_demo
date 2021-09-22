const { getItems } = require("../db");

module.exports = async (req, res) => {
  getItems()
    .then((data) => {
      res.send({ code: true, data });
    })
    .catch((err) => {
      res.status(500).send({ code: false, message: "Error consultando items" });
    });
};
