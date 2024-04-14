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
  entities: [__dirname + "/src/modules/Entity/*.entity.ts"],
  migrations: [__dirname + "/src/modules/Migration/*.migration.ts"],
  subscribers: [__dirname + "/src/modules/Subscriber/*.subscriber.ts"],
};
