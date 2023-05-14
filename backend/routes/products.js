var express = require("express");
var router = express.Router();

router.post("/validate", function (req, res, next) {
  res.json("Validade endpoint");
});

router.put("/update", function (req, res, next) {
  res.json("Update endpoint");
});

module.exports = router;
