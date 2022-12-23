import { Sequelize } from "sequelize-typescript";
import { Users } from "../models/UserModel";
import { Contacts } from "../models/ContactModel";
import "dotenv/config";

const connection = new Sequelize({
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_bin",
  },
  dialect: "mysql",
  host: "localhost",
  username: "gold",
  password: "gold",
  database: "gold",
  logging: false,
  models: [Contacts, Users],
});

export default connection;
