const db = require("../db/db");

class Product {
  constructor(id, name, cost_price, sales_price, pack_components) {
    this.id = id;
    this.name = name;
    this.cost_price = cost_price;
    this.sales_price = sales_price;
    this.pack_components = pack_components;
    this.validation_errors = [];
  }

  static async getData(id) {
    /*
        - get data related to product with id
        - get data related to pack_components of product
        - return new Product object with data used
    */

    const productQuery = `SELECT * FROM products WHERE code=${id}`;
    const productComponentsQuery = `SELECT product_id as id, qty FROM packs WHERE pack_id=${id}`;

    const productPromise = db.executeQuery(productQuery);
    const productComponentsPromise = db.executeQuery(productComponentsQuery);

    return Promise.all([productPromise, productComponentsPromise]).then(
      ([product, productComponents]) => {
        const { code, name, cost_price, sales_price } = product[0];
        return new Product(
          code,
          name,
          cost_price,
          sales_price,
          productComponents
        );
      }
    );
  }

  static async setData(id, newPrice, newCostPrice = null) {
    /*
        - set the new price of product ID
        - if newCostPrice is present, also sets the cost price
    */

    const query = newCostPrice
      ? `UPDATE products SET sales_price=${newPrice}, cost_price=${newPrice} WHERE code=${id}`
      : `UPDATE products SET sales_price=${newPrice} WHERE code=${id}`;

    return db.executeQuery(query);
  }

  validate(newPrice, new_prices) {
    /*
        Deffers work to other methods to make full validation, then consolidate the results.
        return object of formati {valid: bool, err_msgs: []}
    */

    this.validatePriceVersusCost(newPrice);
    this.validatePriceVariation(newPrice);

    if (this.pack_components.length > 0) {
      this.validatePriceOfPackComponents(newPrice, new_prices);
    }

    return this.validation_errors;
  }

  validatePriceVersusCost(newPrice) {
    //verifies if new price is bigger than cost_price

    newPrice < this.cost_price &&
      this.validation_errors.push("Preço de venda inferior ao preço de custo");
  }

  validatePriceVariation(newPrice) {
    //vefiries if price variation is within 10% size

    const priceVariation = newPrice / this.sales_price - 1;

    if (priceVariation > 0.1)
      return this.validation_errors.push(
        "Preço de venda aumentou mais do que que 10%."
      );

    if (-1 * priceVariation > 0.1)
      return this.validation_errors.push(
        "Preço de venda diminuiu mais do que que 10%."
      );
  }

  validatePriceOfPackComponents(newPrice, new_prices) {
    //verifies if pack_components_prices are valid

    let totalPrice = 0;

    this.pack_components.forEach((component) => {
      if (!Object.hasOwn(new_prices, component.id)) {
        this.validation_errors.push(
          `Não foi informado valor para atualização do componente ${component.id}`
        );
      } else {
        totalPrice += new_prices[component.id] * component.qty;
      }
    });

    if (totalPrice !== newPrice)
      this.validation_errors.push(
        "O valor total do pacote não é coerente com o valor de seus componentes"
      );
  }
}

module.exports = Product;
