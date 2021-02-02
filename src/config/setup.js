const sequelize = require("sequelize");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
// const { hash } = require('../user-management/models/user');
const { User } = require("./database");
const { DB } = require("./credentials");
const Sequelize = new sequelize(DB.NAME, DB.USERNAME, DB.PASSWORD, {
  host: DB.HOST,
  port: DB.PORT,
  dialect: DB.DIALECT,
  logging: false,
});
// const Sequelize = new sequelize("risk_analysis", "admin", "sagarghimire", {
//   host: "database-2.cctmb12jdi7j.us-east-1.rds.amazonaws.com",
//   port: 1433,
//   maxConcurrentQueries: 100,
//   dialect: "mssql",
//   dialectOptions: {
//     ssl: "Amazon RDS",
//     options: { requestTimeout: 300000 }
//   },
//   pool: { maxConnections: 5, maxIdleTime: 30 },
//   language: "en"
// });
/**
 * Route to initially setup the system for usage - /initial
 *
 * @alias InitialSetup
 */
router.get("/setup/initial", (req, res, next) => {
  const sqlFilePath = path.resolve(__dirname, "./setup.sql");
  User.findAll({
    raw: true,
  }).then((user) => {
    if (user.length === 0) {
      if (!fs.existsSync(sqlFilePath, "utf8")) {
        res.send("<h1>500 Error Occurred</h1>");
      }
      const sql = fs.readFileSync(sqlFilePath);
      Promise.all([
        sql
          .toString()
          .split(/;\n/)
          .forEach((query) => {
            Sequelize.query(query);
          }),
      ])
        .then((_) => {
          res.send(
            "<h1>Completed</h1><br/><strong>Username: </strong>admin<br/>"
          );
        })
        .catch((err) => {
          console.log(err);
          res.send("<h1>500 Error Occurred</h1>");
        });
    } else {
      res.send("<h1>Setup already completed</h1>");
    }
  });
});

module.exports = router;
