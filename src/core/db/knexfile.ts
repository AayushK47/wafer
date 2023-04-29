import path from "path";
import { Knex } from "knex";
import { knexSnakeCaseMappers } from "objection";

const knexConfig: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    port: parseInt(process.env.DB_PORT || ""),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  migrations: {
    directory: path.join(__dirname, "..", "migrations"),
  },
  ...knexSnakeCaseMappers(),
};

export default knexConfig;