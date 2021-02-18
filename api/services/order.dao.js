class OrderDAO {
  constructor() {}
  static async findAll() {
    let ds = await sails.getDatastore();
    const result = await ds.sendNativeQuery(
      "select o.id,u.user_name,p.name,p.brand_name,p.price,o.qty,o.total_amount,o.status,o.created_date,o.modified_date from users u, products p,orders o where o.user_id=u.id AND o.product_id=p.id"
    );

    return result.rows;
  }

  static async findOne(id) {
    let ds = await sails.getDatastore();
    const result = await ds.sendNativeQuery("select * from orders where id=?", [
      id,
    ]);
    return result.rows[0];
  }

  static async findMyOrder(userId) {
    let ds = await sails.getDatastore();
    // const result = await ds.sendNativeQuery("select * from orders where user_id=?", [
    //   userId,
    // ]);

    const result = await ds.sendNativeQuery(
      "select o.id,u.user_name,p.name,p.brand_name,p.price,o.qty,o.total_amount,o.status,o.created_date,o.modified_date from users u, products p,orders o where o.user_id=u.id AND o.product_id=p.id AND o.user_id=?",
      [userId]
    );
    return result.rows;
  }

  static async findOneAndUpdate(orderId, status, userId) {
    let ds = await sails.getDatastore();
    let params = [status, userId, orderId];
    const sql =
      "UPDATE orders SET status=?,modified_by=?,modified_date=Now() where id=?";
    const result = await ds.sendNativeQuery(sql, params);
    return result.rows.affectedRows;
  }
  static async cancelOrder(orderDetails) {
    let ds = await sails.getDatastore();
    let params = ["CANCELLED", orderDetails.userId, orderDetails.orderId];
    console.log(params, "params");

    const sql =
      "UPDATE orders SET status=?,modified_by=?,modified_date=now() where id=?";
    // console.log("sql query", sql);

    const result = await ds.sendNativeQuery(sql, params);
    return result.rows.affectedRows;
  }

  static async save(orders) {
    let ds = await sails.getDatastore();
    let params = [
      orders.userId,
      orders.productId,
      orders.qty,
      orders.totalAmount,
      orders.status,
      orders.created_date,
      orders.modified_date,
      orders.created_by,
      orders.modified_by,
    ];
    const sql =
      "insert into orders (user_id,product_id,qty,total_amount,status,created_date,modified_date,created_by,modified_by) values (?,?,?,?,?,?,?,?,?)";
    const result = await ds.sendNativeQuery(sql, params);
    return result.rows.affectedRows;
  }
}

module.exports = OrderDAO;
