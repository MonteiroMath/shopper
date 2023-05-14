class Product {
  constructor(code, name, cost_price, sales_price, pack_components) {
    this.code = code;
    this.name = name;
    this.cost_price = cost_price;
    this.sales_price = sales_price;
    this.pack_components = pack_components;
  }

  static async getData(id) {
    /*
        - get data related to product with id
        - get data related to pack_components of product
        - return new Product object with data used
    */

    return;
  }

  static async setData(id, newPrice, newCostPrice = null) {
    /*
        - set the new price of product ID
        - if newCostPrice is present, also sets the cost price
    */
    return;
  }

  validate(newPrice, pack_components_prices = null) {
    /*
        Deffers work to other methods to make full validation, then consolidate the results.
        return object of formati {valid: bool, err_msgs: []}
    */
    return {};
  }

  validatePriceVersusCost(newPrice) {
    //verifies if new price is bigger than cost_price
    return;
  }

  validatePriceVariation(newPrice) {
    //vefiries if price variation is within 10% size
    return;
  }

  validadePriceOfPackComponents(newPrice, pack_components_prices) {
    //verifies if pack_components_prices are valid
    return;
  }
}
