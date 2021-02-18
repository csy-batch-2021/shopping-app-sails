/**
 * Module dependencies
 */

const UserService = require("../../services/user.service");

// ...

/**
 * user/login.js
 *
 * Login user.
 */
module.exports = async function login(req, res) {
  let { email, password } = req.body;
  console.log(email, password);
  try {
    let loginDetails = req.body;
    let isValidUser = await UserService.userLogin(loginDetails);
    res.json(isValidUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
