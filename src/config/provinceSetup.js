const sequelize = require("sequelize");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
// const { hash } = require('../user-management/models/user');
const { Province } = require("./database");
const { DB } = require("./credentials");
const Sequelize = new sequelize(DB.NAME, DB.USERNAME, DB.PASSWORD, {
  host: DB.HOST,
  port: DB.PORT,
  dialect: DB.DIALECT,
  logging: false,
});

/**
 * Route to initially setup the system for usage - /province-setup
 *
 * @alias ProvinceSetup
 */
router.get("/province-setup", (req, res, next) => {
  const sqlFilePath = path.resolve(__dirname, "./provinceSetup.sql");
  Province.findAll({
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
            "<h1>Completed :</h1><br/><strong>All provinces are mapped to the database</strong><br/>"
          );
        })
        .catch((err) => {
          console.log(err);
          res.send("<h1>500 Error Occurred</h1>");
        });
    } else {
      res.send("<h1>Can`t populate the same data on the database!</h1>");
    }
  });
});

module.exports = router;
