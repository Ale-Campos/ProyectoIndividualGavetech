import express from "express";

import morgan from "morgan";

const app = express();

//Configs

app.set("port", 4000);

//Middlewares (funciones intermedias entre una request y una response)
app.use(morgan("dev"));

export default app;
