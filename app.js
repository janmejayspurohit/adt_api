import express from "express";
import dotenv from "dotenv";

import cors from "cors";

import rootRoutes from "./src/routes";
import errorHandler from "./src/middleware/errorHandler";

dotenv.config();
require("./db/sequelize");

const app = express();

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", rootRoutes);

app.use(errorHandler);

module.exports = app;
