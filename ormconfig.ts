import { DataSourceOptions } from "typeorm";

export const ormconfig: DataSourceOptions = {
  type: "mysql",
  host: "db",
  port: 3306,
  username: "sandbox_user",
  password: "passsword",
  database: "sanbox",
  synchronize: true,
  logging: false,
  entities: ["src/Entity/**/*.ts"],
  migrations: ["src/Migration/**/*.ts"],
  subscribers: ["src/Subscriber/**/*.ts"],
};
