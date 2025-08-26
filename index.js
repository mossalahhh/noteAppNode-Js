import express from "express";
import { connectDb } from "./Db/connectionDb.js";
import { routerApp } from "./src/app_router.js";
const app = express();
const port = 3000;
connectDb();
routerApp(app, express);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
