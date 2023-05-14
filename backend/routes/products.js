var express = require("express");
var router = express.Router();
var Product = require("../models/Products");

router.post("/validate", function (req, res, next) {
  const { new_prices } = req.body;

  if (!new_prices) {
    throw new Error(
      "É necessário encaminhar uma lista de preços para validação."
    );
  }

  const validationPromises = [];

  for (const [productId, newPrice] of Object.entries(new_prices)) {
    const validationPromise = Product.getData(productId)
      .then((product) => {
        const validation_result = product.validate(newPrice, new_prices);
        return {
          id: product.id,
          name: product.name,
          current_price: product.sales_price,
          new_price: newPrice,
          new_cost_price: this.newCostPrice,
          validation_errors: validation_result,
          valid: validation_result.length === 0,
        };
      })
      .catch((err) => {
        return {
          id: productId,
          name: null,
          current_price: null,
          new_price: null,
          new_cost_price: null,
          validation_errors: [err.message],
          valid: false,
        };
      });

    validationPromises.push(validationPromise);
  }

  Promise.all(validationPromises).then((products) => res.json({ products }));
});

router.put("/update", function (req, res, next) {
  const { new_prices } = req.body;

  console.log(new_prices);

  if (!new_prices) {
    throw new Error(
      "É necessário encaminhar uma lista de preços para validação."
    );
  }

  const updatePromises = [];

  for (const product of new_prices) {
    console.log(product);
    const updatePromise = Product.setData(
      product.id,
      product.new_price,
      product.new_cost_price
    );
    updatePromises.push(updatePromise);
  }

  Promise.all(updatePromises).then(() => {
    res.json({ success: true });
  });
});

module.exports = router;
