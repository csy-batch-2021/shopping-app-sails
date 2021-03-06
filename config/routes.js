/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },
  "get /login": { view: "pages/login" },
  "get /register": { view: "pages/register" },
  "get /adminRegister": { view: "pages/adminRegister" },
  "get /wallet": { view: "pages/wallet" },
  "get /userList": { view: "pages/userList" },
  "get /updatePassword": { view: "pages/updatePassword" },
  "get /allproducts": { view: "pages/allproducts" },
  "get /products": { view: "pages/products" },
  "get /orders": { view: "pages/orders" },
  "get /myorders": { view: "pages/myorders" },
  "get /addProducts": { view: "pages/addProducts" },


  //REST API
  //"get /api/login": { controller: "UserController", action: "login" },
  "post /api/login": { action: "user/login" },
  "post /api/register": { action: "user/register" },

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
