import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import {route} from "./route/todo"
const app = express();

app.use(function(req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");

  next();
});

app.use("/task", route);

async function mongoConnect() {
    await mongoose.connect("mongodb://test:1234@0.0.0.0:27017/testdb");
}

mongoConnect();

app.listen(3000, ()=>{
    console.log("server is listening");
});
