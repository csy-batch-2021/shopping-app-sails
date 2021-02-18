class ProductValidator {
  static validateNewProduct(product) {
    if (product.brandName == null || product.brandName.trim().length == 0) {
      throw new Error("please enter validate BrandName");
    } else if (product.name == null || product.name.trim().length == 0) {
      throw new Error("please enter validate Name");
    } else if (product.ram == null || product.ram <= 0) {
      throw new Error("please enter validate Ram");
    } else if (product.price == null || product.price <= 0) {
      throw new Error("please enter validate Price");
    }
  }
}

module.exports = ProductValidator;
