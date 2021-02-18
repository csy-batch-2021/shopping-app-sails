//const pool = require("./config/db");

class UserDAO {
  constructor() {}

  static async findAll() {
    let ds = await sails.getDatastore();
    const result = await ds.sendNativeQuery("select * from users");
    return result.rows;
  }

  static async findOne(id) {
    let ds = await sails.getDatastore();
    const result = await ds.sendNativeQuery("select * from users where id=?", [
      id,
    ]);
    return result.rows[0];
  }

  static async findActiveUser() {
    let ds = await sails.getDatastore();
    const result = await ds.sendNativeQuery(
      "select * from users where active = 1"
    );
    return result.rows;
  }

  static async findByEmail(email) {
    const result = await ds.sendNativeQuery(
      "select 1 from users where email=?",
      [email]
    );
    return result.rows.length != 0;
  }

  static async findUser(email) {
    let ds = await sails.getDatastore();
    const result = await ds.sendNativeQuery(
      "select * from users where email=?",
      [email]
    );
    return result.rows;
  }

  static async findOneWalletId(id) {
    let ds = await sails.getDatastore();
    const result = await ds.sendNativeQuery(
      "select * from wallet where user_id=?",
      [id]
    );
    return result.rows[0];
  }

  static async findWalletUserId(id) {
    let ds = await sails.getDatastore();
    const result = await ds.sendNativeQuery(
      "select * from wallet where user_id=?",
      [id]
    );
    return result.rows[0];
  }

  static async createWalletAccount(userId) {
    let ds = await sails.getDatastore();
    let params = [userId];
    const sql = "insert into wallet(user_id,balance) values (?,0)";
    const result = await ds.sendNativeQuery(sql, params);
    return result.rows;
  }

  static async addWalletBalance(bals, id) {
    let ds = await sails.getDatastore();
    const sql = "update wallet set balance =? where user_id =?";
    const result = await ds.sendNativeQuery(sql, [bals, id]);
    return result.rows;
  }

  static async save(user, hash) {
    let role = user.role != "" && user.role != null ? user.role : "USER";
    let params = [user.name, user.email, hash, role];
    const sql =
      "insert into users (user_name,email,password,role,active) values ( ?,?,?,?,1)";
    const result = await ds.sendNativeQuery(sql, params);
    return result.rows;
  }

  static async updatePassword(hash, update) {
    let ds = await sails.getDatastore();
    let params = [hash, update.id];
    const sql = "update users set password = ? where id= ?";
    const result = await ds.sendNativeQuery(sql, params);
    return result.rows.affectedRows;
  }

  static async updateStatus(id, status) {
    let ds = await sails.getDatastore();
    const sql = "update users set active= ? where id= ?";
    const result = await ds.sendNativeQuery(sql, [status, id]);
    return result.rows.affectedRows;
  }
}
module.exports = UserDAO;
