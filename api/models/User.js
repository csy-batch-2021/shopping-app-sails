/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  login: async function login(email, password) {
    console.log("UserModel", email, password);
    try {
      let ds = await sails.getDatastore();
      let result = await ds.sendNativeQuery(
        "select id,user_name,email,role from users where email=$1 and password= $2",
        [email, password]
      );
      console.log("Result:", result.rows);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      console.log("ERror", err);
      return null;
    }
  },
};
