import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import {route} from "./route/todo"
import { config } from "dotenv";

config();
const app = express();

app.use(function(req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");

  next();
});

app.use("/task", route);

async function mongoConnect() {
    await mongoose.connect(`mongodb://${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_MONGODATABASE}`, {
      auth: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWD,
      },
    });
}

mongoConnect();

app.listen(process.env.APP_PORT, ()=>{
    console.log("server is listening");
});
