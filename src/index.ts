import dotenv from "dotenv";
import path from "path";
import express, { Application, Request, Response } from "express";
import EntityTypeManager from "./modules/Entity/EntityTypeManager";
import Connection from "./modules/Connection/Connection";
import ConfigFactory from "./modules/Config/ConfigFactory";
import { config } from "./modules/Entity/config.entity";

//For env File
dotenv.config({
  path: path.resolve(path.resolve(__dirname + "/../.env")),
});

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", async (req: Request, res: Response) => {
  await ConfigFactory.set("test_key_insert", ["a", "b"]);
  let configTest: any = await ConfigFactory.get("test_key_insert");
  res.json({
    config: configTest,
    isConnected: Connection.isInitialized(),
  });
});

app.listen(port, () => {
  console.log(`Server is Fire at http://${process.env.DOMAIN}`);
});
