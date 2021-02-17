class UserController {
  static async login(req, res) {
    res.json({ message: "Login" });
  }

  static async signup(req, res) {
    res.json({ message: "Register" });
  }
}
module.exports.UserController = UserController;
