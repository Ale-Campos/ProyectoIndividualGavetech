import express from "express";
import session from "express-session";
import flash from "connect-flash";
import morgan from "morgan";
import path from "path";
import http from "http"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//Router
import products from "./src/routes/userRoutes.routes.js";
import register from "./src/routes/register.routes.js";
import login from "./src/routes/login.routes.js";
import menuAlumno from "./src/routes/menuAlumno.routes.js";
import menuProfesor from "./src/routes/menuProfesor.routes.js";
import generarPedidos from "./src/routes/pedidos.routes.js";
import misPedodos from "./src/routes/misPedidos.routes.js";
import pedidosPendientes from "./src/routes/pedidosPendientes.routes.js";
import pedidosAprobados from "./src/routes/pedidosAprobados.routes.js";
import gestProductos from "./src/routes/gestPedidos.routes.js";
import cargaComponentes from "./src/routes/cargaComponente.routes.js";
import raspiRoutes from "./src/routes/raspi.router.js"
import ejs from "ejs";
const app = express();

//Configs
app.engine("html", ejs.renderFile);
app.set("views", path.join(__dirname, "./public/views"));
app.set("view engine", "html");
app.set("port", 4000);

//Middlewares (funciones intermedias entre una request y una response)
app.use(morgan("dev"));
app.use(express.json()); //Aclaramos que el servidor pueda procesar JSON
app.use(
  session({
    secret: "gavetech",
    resave: true,
    saveUninitialized: true,
  })
);


//Routes

const main = () => {
  app.listen(app.get("port"));
  console.log(`Server corriendo en el puerto ${app.get("port")}`);
};

main()
app.use("/home", products);
app.use("/register", register);
app.use("/login", login);
app.use("/menuAlumno", menuAlumno);
app.use("/menuProfesor", menuProfesor);
app.use("/generarPedido", generarPedidos);
app.use("/misPedidos", misPedodos);
app.use("/pedidosPendientes", pedidosPendientes);
app.use("/pedidosAprobados", pedidosAprobados);
app.use("/gestionarPedidos", gestProductos);
app.use("/cargaComponentes", cargaComponentes);
app.use("/raspi", raspiRoutes)
//Archivos estáticos
app.use(express.static("public"));

export default app;
