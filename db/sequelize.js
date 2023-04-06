const { Sequelize } = require("sequelize");
const config = require("./config");

const rootSequelize = new Sequelize(config.database, config.username, config.password, config);

const testConnection = async () => {
  try {
    await rootSequelize.authenticate();
    console.log("<>".repeat(20));
    console.log("Sequelize DB connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw new Error(error.message || JSON.stringify(error));
  }
  console.log("<>".repeat(20));
};

testConnection();

module.exports = rootSequelize;
