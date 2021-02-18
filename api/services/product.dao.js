class ProductDAO {
  static async findAll() {
    let ds = await sails.getDatastore();
    const result = await ds.sendNativeQuery("select * from products");
    return result.rows;
  }

  static async findActive() {
    var id = 1;
    let ds = await sails.getDatastore();
    const result = await ds.sendNativeQuery(
      "select * from products where active=?",
      [id]
    );
    return result.rows;
  }

  static async findOneUsingName(product) {
    let ds = await sails.getDatastore();
    // const param
    const result = await ds.sendNativeQuery(
      "select 1 from products where name=? AND brand_name=?",
      [product.name, product.brandName]
    );
    return result.rows.length != 0;
  }
  static async findOne(id) {
    let ds = await sails.getDatastore();
    const result = await ds.sendNativeQuery(
      "select * from products where id=?",
      [id]
    );
    return result.rows[0];
  }

  static async findByBrandName(brandname) {
    let ds = await sails.getDatastore();
    const result = await ds.sendNativeQuery(
      "select * from products where id=?"[brandname]
    );
    return result.rows[0];
  }
  static async findOneAndUpdate(productId, status) {
    let ds = await sails.getDatastore();
    let params = [status, productId];
    const sql = "UPDATE products SET active=? where id=?";
    const result = await ds.sendNativeQuery(sql, params);
    return result.rows.affectedRows;
  }

  static async save(product) {
    let ds = await sails.getDatastore();
    let params = [
      product.name,
      product.brandName,
      product.ram,
      product.price,
      product.created_date,
      product.modified_date,
      product.created_by,
      product.modified_by,
    ];
    const sql =
      "insert into products(name,brand_name,ram,price,active,created_date,modified_date,created_by,modified_by) values(?,?,?,?,1,?,?,?,?)";
    const result = await ds.sendNativeQuery(sql, params);
    return result.rows.affectedRows;
  }
}

module.exports = ProductDAO;
