module.exports = {
  login: async function (email, password) {
    let ds = await sails.getDatastore();
    let result = await ds.sendNativeQuery(
      "select id,user_name,email,role from users where email=$1 and password= $2",
      [email, password]
    );
    let data = result.rows;
    let user = data.length > 0 ? data[0] : null;
    return user;
  },
};
