import express from "express";
import morgan from "morgan";
import path from "path";

//Router
import products from "./routes/userRoutes.routes";
import register from "./routes/register.routes";
import login from "./routes/login.routes";
import menuAlumno from "./routes/menuAlumno.routes";
import menuProfesor from "./routes/menuProfesor.routes";
import generarPedidos from "./routes/pedidos.routes";
import misPedodos from "./routes/misPedidos.routes";
import pedidosPendientes from "./routes/pedidosPendientes.routes";
const app = express();

//Configs
app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "../public/views"));
app.set("view engine", "html");
app.set("port", 4000);

//Middlewares (funciones intermedias entre una request y una response)
app.use(morgan("dev"));
app.use(express.json()); //Aclaramos que el servidor pueda procesar JSON
//Routes
app.use("/home", products);
app.use("/register", register);
app.use("/login", login);
app.use("/menuAlumno", menuAlumno);
app.use("/menuProfesor", menuProfesor);
app.use("/generarPedido", generarPedidos);
app.use("/misPedidos", misPedodos);
app.use("/pedidosPendientes", pedidosPendientes);
//Archivos estáticos
app.use(express.static("public"));

export default app;
