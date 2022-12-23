import "dotenv/config";

import { Users } from "../models/UserModel";
import { Contacts } from "../models/ContactModel";

module.exports = {
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_bin",
  },
  dialect: process.env.DB_DIALECT || "mysql",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "gold",
  password: process.env.DB_PASS || "gold",
  database: process.env.DB_NAME || "gold",
  logging: false,
  models: [Contacts, Users],
};
