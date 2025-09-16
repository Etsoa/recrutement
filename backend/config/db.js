require("dotenv").config();
const { Sequelize } = require("sequelize");

let sequelize = null;

function getDBInstance() {
  if (!sequelize) {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: false,
      }
    );
  }
  return sequelize;
}

module.exports = getDBInstance();
