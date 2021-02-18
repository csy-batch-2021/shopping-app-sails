/**
 * Module dependencies
 */

// ...

/**
 * user/login.js
 *
 * Login user.
 */
module.exports = async function login(req, res) {
  let { email, password } = req.body;
  console.log(email, password);
  let ds = await sails.getDatastore();
  let result = await ds.sendNativeQuery(
    "select id,user_name,email,role from users where email=$1 and password= $2",
    [email, password]
  );
  let data = result.rows;
  let user = data.length > 0 ? data[0] : null;

  sails.log.debug("User", user);
  if (user === null) {
    return res.status(400).json({ message: "Invalid Login Credentials" });
  }
  return res.status(200).json(user);
};
