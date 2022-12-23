import { Sequelize } from "sequelize-typescript";
import { Contacts } from "../models/ContactModel";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "whaticket",
  password: "whaticket",
  database: "whaticket",
  logging: false,
  models: [Contacts],
});

export default connection;
