import mongoose from "mongoose";
import express from "express"
import routerProduct from "./router/routerProduct";

const app = express();
app.use(express.json());
app.use("/api", routerProduct)

mongoose.connect("mongodb://127.0.0.1:27017/we17307")


export const viteNodeApp = app;