import dotenv from "dotenv";
import path from "path";
import express, { Application, Request, Response } from "express";

//For env File
dotenv.config({
  path: path.resolve(path.resolve(__dirname + "/../.env")),
});

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
