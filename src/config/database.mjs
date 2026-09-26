import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "blog",
  "root",
  "12345678",
  {
    dialect: "mysql",
    port: "3307",
    host: "localhost"
  }
);