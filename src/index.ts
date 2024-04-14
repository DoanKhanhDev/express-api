import dotenv from "dotenv";
import path from "path";
import express, { Application, Request, Response } from "express";
import EntityTypeManager from "./modules/Entity/EntityTypeManager";
import Connection from "./modules/Connection/Connection";

//For env File
dotenv.config({
  path: path.resolve(path.resolve(__dirname + "/../.env")),
});

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", async (req: Request, res: Response) => {
  const photoStorage = EntityTypeManager.getStorage("photo");
  const photo = await photoStorage?.find();
  res.json({
    entity_photo: photo,
    isConnected: Connection.isInitialized(),
  });
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
