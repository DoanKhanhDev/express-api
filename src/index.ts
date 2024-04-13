import dotenv from "dotenv";
import path from "path";
import express, { Application, Request, Response } from "express";
import Connection from "./modules/Connection/Connection";

//For env File
dotenv.config({
  path: path.resolve(path.resolve(__dirname + "/../.env")),
});

const app: Application = express();
const port = process.env.PORT || 8000;

const connection = Connection.getConnection();

app.get("/", (req: Request, res: Response) => {
  res.json({ isConnection: Connection.isConnection() });
});


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
