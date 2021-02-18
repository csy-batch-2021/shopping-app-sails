module.exports = {
  friendlyName: "Login",

  description: "Login something.",

  inputs: {
    email: {
      type: "string",
      description: "Email",
      required: true,
    },
    password: {
      type: "string",
      description: "The password.",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async (inputs, exits) => {
    console.log("Login Helper:", inputs);

    let user = await User.login(inputs.email, inputs.password);
    console.log("Helper resposne", user);
    if (user === null) {
      throw new Error("Invalid Login Credentials");
    }
    return exits.success(user);
  },
};
