const { ProductDAO } = require("./product.dao");

const { UserDAO } = require("./user.dao");
const { ProductValidator } = require("./product.validator");
const { UserValidator } = require("./user.validator");
class ProductService {
  // to get all products
  static async getAllProduct(params) {
    try {
      var products = await ProductDAO.findAll();
      return products;
    } catch (err) {
      throw new Error("Not able to fecth products");
    }
  }

  // to find and get particular order
  static async getProductDetails(productId) {
    try {
      var result = await ProductDAO.findOne(productId);
      if (!result) {
        throw new Error("Please enter valid Prodct Id");
      }
      return result;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  // to find active Products
  static async getActiveProduct() {
    try {
      var activeProduct = await ProductDAO.findActive();
      return activeProduct;
    } catch (err) {
      throw new Error("Not able to fetch active products");
    }
  }

  // to add a new product
  static async addProducts(product) {
    try {
      await UserValidator.toCheckValidUserId(product.userId);
      var userResult = await UserDAO.findOne(product.userId);

      console.log("userResult", userResult.role);
      if (userResult.role == "ADMIN") {
        ProductValidator.validateNewProduct(product); //to check validate the products details
        let exists = await ProductDAO.findOneUsingName(product); //to find and if same product and brandname product is there in db

        if (exists) {
          throw new Error("This Product already Exists in the given brand");
        }
        product.created_date = new Date();
        product.modified_date = new Date();
        product.created_by = product.userId;
        product.modified_by = product.userId;
        console.log("productValues", product);
        return await ProductDAO.save(product);
      } else {
        throw new Error("You Are Not Authorized");
      }
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  static async searchProducts(filters) {
    // let result = await getAllProducts().then(res => {
    //     return res.data;
    // });
    var activeProduct = await ProductDAO.findActive();
    // console.log("activeProduct", activeProduct);
    let products = activeProduct;
    // console.log("filters", filters)
    let searchValues = filters;
    // console.log("searchValues", searchValues)

    var resultValues = [];
    if (Object.keys(searchValues).length != 0) {
      //to filter the values  based on brandName
      resultValues = products.filter(
        (p) =>
          !searchValues.hasOwnProperty("brandName") ||
          searchValues.brandName.length == 0 ||
          searchValues.brandName.includes(p.brand_name)
      );
      // to filter the values based on ram
      // resultValues = resultValues.filter(p => !filters.hasOwnProperty("ram") || filters.ram.length == 0 || filters.ram.includes(p.ram));
      // // to filter the values based on price
      // resultValues = resultValues.filter(r => !filters.hasOwnProperty("price") || filters.price.min <= r.price && filters.price.max >= r.price);
      // //to sort the values based on price field
      // resultValues.sort(this.sorting);
      // return the all condition matching array
      // console.log("resultValues", resultValues);
      return resultValues;
    } else {
      return products;
    }
  }

  // // to add a new product
  // static async addProducts(product) {
  //   try {
  //     ProductValidator.validateNewProduct(product); //to check validate the products details
  //     let exists = await ProductDAO.findOneUsingName(product); //to find and if same product and brandname product is there in db
  //     if (exists) {
  //       throw new Error("Product and brand Name already Exists");
  //     }
  //     return await ProductDAO.save(product);
  //   } catch (err) {
  //     console.log(err.message);
  //     throw err;
  //   }
  // }

  // too change the product status active and inactive
  static async changeStatus(productId, status) {
    try {
      var result = await ProductDAO.findOne(productId);
      console.log(result);

      if (result) {
        let isActive = result.active == 1;
        if (status == isActive) {
          throw new Error(
            "Already record is " + (isActive ? "Active" : "Inactive")
          );
        }
        //if (status && result.active == 0) {
        await ProductDAO.findOneAndUpdate(result.id, !result.active);
        // } else if (status == false && result.active == 1) {
        //    await ProductDAO.findOneAndUpdate(result.id, 0);
        //} else {
        //  console.log("Not able to change status");
        //}
        // var result = await ProductDAO.changeStatus(productId, status);
      } else {
        throw new Error("Please Enter valid Product ID");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
module.exports = ProductService;
