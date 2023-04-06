require("dotenv").config();

const DB_CONFIG = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // allows self-signed SSL certificates
    },
  },
  define: {
    timestamps: true,
  },
};

module.exports = DB_CONFIG;
