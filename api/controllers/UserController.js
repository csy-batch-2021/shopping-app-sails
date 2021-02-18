//const UserDAO = require("../dao/UserDAO");

const UserDAO = require("../../dao/UserDAO");

/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
class UserController {
  static async login(req, res) {
    let { email, password } = req.query;
    console.log(email, password);

    let user = new UserDAO().login(email, password);
    //let user = {};
    if (user === null) {
      console.log("Invalid User Credentials");
      throw new Error("Invalid User Credentials");
    }
    res.json(user);
  }
}
const userController = new UserController();
//module.exports = { login: UserDAO().login };
