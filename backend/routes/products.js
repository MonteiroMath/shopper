var express = require("express");
var router = express.Router();
var Product = require("../Products.js");

router.post("/validate", function (req, res, next) {
  const { new_prices } = req.body;

  if (!new_prices) {
    throw new Error(
      "É necessário encaminhar uma lista de preços para validação."
    );
  }

  const validationPromises = [];

  for (const [productId, newPrice] of Object.entries(new_prices)) {
    const validationPromise = Product.getData(productId).then((product) => {
      const validation_result = product.validate(newPrice, new_prices);
      return {
        id: product.id,
        name: product.name,
        current_price: product.sales_price,
        new_price: newPrice,
        validation_errors: validation_result,
      };
    });

    validationPromises.push(validationPromise);
  }

  Promise.all(validationPromises).then((products) => res.json({ products }));
});

router.put("/update", function (req, res, next) {
  res.json("Update endpoint");
});

module.exports = router;
