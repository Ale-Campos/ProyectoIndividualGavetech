import express from "express";
import morgan from "morgan";

//Router
import products from "./routes/userRoutes.routes";
import register from "./routes/register.routes";
import login from "./routes/login.routes";

const app = express();

//Configs

app.set("port", 4000);

//Middlewares (funciones intermedias entre una request y una response)
app.use(morgan("dev"));
app.use(express.json()); //Aclaramos que el servidor pueda procesar JSON
//Routes
app.use("/home", products);
app.use("/register", register);
app.use("/login", login);
//Archivos estáticos
app.use(express.static("public"));

export default app;
