/**
 * @module AuthModule
 */
const jwt = require("express-jwt");
const { JWT_SECRET } = require("./credentials");

/**
 * This functions gets the token from headers
 *
 * @method
 * @param {Object} req  The object **req** from the express.js method
 *
 * @returns Object with the token of admin/client
 */
const getTokenFromHeaders = (req) => {
  let [admin, client] = [null, null];
  const {
    headers: { authorization },
  } = req;
  if (authorization) {
    tokens = authorization.split(",");
    tokens.forEach((t) => {
      const [bearer, token] = t.split(" ");
      switch (bearer) {
        case "Bearer": // Change According to the requirement
          admin = token;
          break;
        case "Client":
          client = token;
          break;
        default:
          break;
      }
    });
  }
  return {
    admin,
    client,
  };
};

/**
 * This object contains the functions to getTokenFromHeaders
 *
 * @method
 * @param {Object} req  The object **req** from the express.js method
 * @property {Method} admin This method is for the **admin** access users
 * @property {Method} client This method is for the **client** access users
 * @returns {Object} Object with the token of admin or client
 */
const getToken = {
  admin: (req) => getTokenFromHeaders(req).admin,
  client: (req) => getTokenFromHeaders(req).client,
};

/**
 * Middleware auth object for routes to limit the access of unauthorized users
 *
 *
 * @property {Middleware} required  Used to throw status 401 for the unauthenticated **admin** users
 * @property {Middleware} optional  Used to know the user accessing the route even if the token is not valid
 * @property {Middleware} client    Used to throw status 401 for the unauthenticated **client** users
 *
 */
const auth = {
  required: jwt({
    secret: JWT_SECRET,
    userProperty: "payload",
    getToken: getToken.admin,
    algorithms: ["HS256"],
  }),
  optional: jwt({
    secret: JWT_SECRET,
    userProperty: "payload",
    getToken: getToken.admin,
    credentialsRequired: false,
    algorithms: ["HS256"],
  }),
  client: jwt({
    secret: JWT_SECRET,
    userProperty: "payload",
    getToken: getToken.client,
    algorithms: ["HS256"],
  }),
  getToken: getTokenFromHeaders,
};

module.exports = auth;
