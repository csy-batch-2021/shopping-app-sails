const { ProductDAO } = require("./product.dao");
const { OrderDAO } = require("./order.dao");
const { UserDAO } = require("./user.dao");

const { ProductValidator } = require("./product.validator");
const { UserValidator } = require("./user.validator");
const { OrderValidator } = require("./order.validator");
class OrderService {
  //get all orders
  static async getAllOrder() {
    try {
      let orders = await OrderDAO.findAll();
      return orders;
    } catch (err) {
      throw new Error("Not able to fetch the orders");
    }
  }

  // to find by order based on user id
  static async getMyOrder(userId) {
    let myOrder = await OrderDAO.findMyOrder(userId);
    return myOrder;
    // console.log(myOrder);
  }
  // to add a new order
  static async addOrder(orderDetails) {
    try {
      await OrderValidator.validCheck(orderDetails);
      await OrderValidator.isValidId(orderDetails);
      const product = await ProductDAO.findOne(orderDetails.productId);
      orderDetails.totalAmount = orderDetails.qty * product.price;
      await OrderValidator.toCheckWalletBalance(orderDetails);
      orderDetails.status = "ORDERED";
      orderDetails.created_date = new Date();
      orderDetails.modified_date = new Date();
      orderDetails.created_by = orderDetails.userId;
      orderDetails.modified_by = orderDetails.userId;
      console.log("orderDetails", orderDetails);
      await OrderDAO.save(orderDetails);
      return "Product Ordered sucessfully";
    } catch (err) {
      throw err;
    }
  }

  // to change order status delivered
  static async changeOrderStatus(orderId, userId, status) {
    try {
      // await OrderValidator.statusValidCheck(orderId, status);
      await OrderValidator.isValidForDelivery(orderId, status);
      // await OrderValidator.toCheckValidOrderId(orderId);
      var result = await OrderDAO.findOneAndUpdate(orderId, status, userId);
      return result;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  // to cancel order
  static async cancelOrder(orderDetails) {
    try {
      console.log("orderDetails", orderDetails);

      let userId = orderDetails.userId;
      let orderId = orderDetails.orderId;
      await UserValidator.toCheckValidUserId(userId);

      // // await OrderValidator.isValidCheck(orderId);
      await OrderValidator.isExistOrderId(orderId);
      var result = await OrderDAO.cancelOrder(orderDetails);
      console.log(result);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = OrderService;
