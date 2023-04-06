/**
 * !DEV SETUP
 * * This file is responsible for initializing dev related DB & Service Configuration
 *
 * !USAGE:
 * yarn dev-init setup # This initializes DB & Service
 *
 * !Help:
 * yarn dev-init help # Lists the possible commands
 *
 * ? Where to run this command?
 * * Run from the root of this API directory
 */
require("dotenv").config({ path: "./.env" });

// eslint-disable-next-line security/detect-child-process
const { execSync } = require("child_process");

const ENUM_ARG_TYPES = {
  help: "help",
  setup: "setup",
};

const customExecSync = async (cmd) => execSync(cmd, { stdio: "inherit" });

const dropDB = async () => {
  await customExecSync(`sequelize-cli db:drop`);
};

const createDB = async () => {
  await customExecSync(`sequelize-cli db:create`);
};

const migrateDB = async () => {
  await customExecSync(`sequelize-cli db:migrate`);
};

const seedDB = async () => {
  await customExecSync(`sequelize-cli db:seed:undo:all`);
  await customExecSync(`sequelize-cli db:seed:all`);
};

const spin = async () => {
  await customExecSync("yarn dev");
};

const COMMANDS_TO_INIT_DB = [dropDB, createDB, migrateDB, seedDB];

const setup = async () => {
  /* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */
  /* eslint-disable no-await-in-loop */
  for (const func of COMMANDS_TO_INIT_DB) {
    await func();
  }
};

const run = async () => {
  const args = process.argv.slice(2);
  let arg1 = args[0];

  if (!arg1) arg1 = ENUM_ARG_TYPES.setup;

  switch (arg1) {
    case ENUM_ARG_TYPES.help:
      break;
    case ENUM_ARG_TYPES.setup:
      await setup();
      break;
    default:
      break;
  }
};

run();
