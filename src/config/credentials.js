const dotenv = require("dotenv");
dotenv.config();

module.exports.DB = {
  NAME: process.env.DB_NAME,
  DIALECT: process.env.DB_DIALECT,
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
};

module.exports.FTP = {
  HOST: process.env.FTP_HOST,
  PORT: process.env.FTP_PORT,
  USERNAME: process.env.FTP_USERNAME,
  PASSWORD: process.env.FTP_PASSWORD,
  TYPE: process.env.FTP_TYPE,
};

module.exports.LDAP = {
  serverUrl: process.env.LDAP_SERVER_URL,
  suffixOne: process.env.LDAP_SUFFIX_ONE,
  suffixTwo: process.env.LDAP_SUFFIX_TWO,
  username: process.env.LDAP_USERNAME,
  password: process.env.LDAP_PASSWORD,
  readerDN: process.env.LDAP_READER_DN,
  readerPwd: process.env.LDAP_READER_PASSWORD,
};

module.exports.EMAIL = {
  HOST: process.env.EMAIL_HOST,
  PORT: process.env.EMAIL_PORT,
  USERNAME: process.env.EMAIL_USERNAME,
  PASSWORD: process.env.EMAIL_PASSWORD,
  SECURE: process.env.EMAIL_SECURE, // true for 465, false for other ports
  TEST: process.env.EMAIL_TEST,
};

module.exports.JWT_SECRET = process.env.JWT_SECRET || "secret";
