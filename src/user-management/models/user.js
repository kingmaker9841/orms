const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/credentials");

module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    isActive: {
      type: type.BOOLEAN,
      defaultValue: true
    },
    isDeleted: {
      type: type.BOOLEAN,
      defaultValue: false
    },
    distinguishedName: {
      type: type.STRING,
      primaryKey: true,
      unique: true
    },
    email: {
      //AD : userPrincipalName
      type: type.STRING(40),
      primaryKey: true
    },
    username: {
      //AD : sAMAccountName
      type: type.STRING(40),
      primaryKey: true
    },
    firstName: {
      //AD : givenName
      type: type.STRING(45)
    },
    lastName: {
      //AD : sn
      type: type.STRING(45)
    },
    phoneNumber: {
      //AD : telephoneNumber
      type: type.STRING(20)
    },
    loginAttempts: {
      type: type.INTEGER,
      defaultValue: 3
    },
    loginAttemptsCount: {
      type: type.INTEGER,
      defaultValue: 3
    },
    roleId: {
      type: type.INTEGER
    },
    branchId: {
      type: type.INTEGER
    },
    provinceId: {
      type: type.INTEGER
    },
    isProvinceAdmin: {
      type: type.BOOLEAN,
      defaultValue: false
    },
    departmentId: {
      type: type.INTEGER
    },
    createdBy: {
      type: type.INTEGER
    },
    editedBy: {
      type: type.INTEGER
    }
  });
};

module.exports.hash = (password, callback) => {
  bcrypt.hash(password, 10, callback);
};

module.exports.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, callback);
};

module.exports.generateJWT = function(user) {
  const expireAfter = 12 * 60 * 60; // **IN SECONDS**

  return jwt.sign(
    {
      id: user.id,
      name: user.firstName,
      roleId: user.roleId,
      branchId: user.branchId,
      departmentId: user.departmentId,
      email: user.email,
      exp: parseInt(new Date().getTime() / 1000 + expireAfter, 10)
    },
    JWT_SECRET
  );
};

module.exports.toAuthJSON = function(user) {
  return {
    id: user.id,
    name: user.firstName,
    roleId: user.roleId,
    token: this.generateJWT(user)
  };
};
