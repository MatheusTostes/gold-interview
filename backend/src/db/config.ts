import { Sequelize } from "sequelize-typescript";
import * as dbConfig from "./database";

const connection = new Sequelize(dbConfig);

export default connection;
