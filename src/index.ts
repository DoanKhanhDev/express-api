import express, { Application } from "express";
import { ConfigRoutes } from "./api/ConfigRoutes";
import { CommonRoutesConfig } from "./api/CommonRoutesConfig";
import MysqlConnection from "./modules/Connection/Mysql";
import bodyParser from "body-parser";

const app: Application = express();
const port = process.env.PORT || 8000;
const routes: Array<CommonRoutesConfig> = [];

app.use(bodyParser.json());

MysqlConnection.isConnected().then((isConnected) => {
  if (isConnected) {
    console.log("Connected to the MySQL database");
    routes.push(new ConfigRoutes(app));
  }
});

app.listen(port, () => {
  console.log(`Server is Fire at https://${process.env.DOMAIN}`);
});
