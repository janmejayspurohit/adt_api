require("dotenv").config();

const DB_CONFIG = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "postgres",
  define: {
    timestamps: true,
  },
};

module.exports = DB_CONFIG;
