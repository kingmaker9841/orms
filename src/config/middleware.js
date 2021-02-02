const middleware = require("express").Router();
const auth = require("./auth");
const jwt = require("jsonwebtoken");

/**
 * Middleware to append **req.body** with a `createdBy` field containing `userId` for admin routes in POST method
 * @alias AdminPOSTMiddleware
 */
middleware.post("/*", (req, res, next) => {
  const headers = auth.getToken(req).admin;
  const decoded = jwt.decode(headers);
  req.body.createdBy = decoded ? decoded.id : 0;
  next();
});
/**
 * Middleware to append **req.body** with a `editedBy` field containing `userId` for admin routes in PUT method
 * @alias AdminPUTMiddleware
 */
middleware.put("/*", (req, res, next) => {
  const headers = auth.getToken(req).admin;
  const decoded = jwt.decode(headers);
  req.body.editedBy = decoded ? decoded.id : 0;
  next();
});
/**
 * Middleware to append **req.body** with a `createdBy` field containing `userId` for client routes in POST method
 * @alias ClientPOSTMiddleware
 */
middleware.post("/client/*", (req, res, next) => {
  const headers = auth.getToken(req).client;
  const decoded = jwt.decode(headers);
  req.body.createdBy = decoded ? decoded.id : 0;
  next();
});
/**
 * Middleware to append **req.body** with a `editedBy` field containing `userId` for client routes in PUT method
 * @alias ClientPUTMiddleware
 */
middleware.put("/client/*", (req, res, next) => {
  const headers = auth.getToken(req).client;
  const decoded = jwt.decode(headers);
  req.body.editedBy = decoded ? decoded.id : 0;
  next();
});

module.exports = middleware;
