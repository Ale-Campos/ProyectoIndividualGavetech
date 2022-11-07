import express from "express";
import session from "express-session";
import flash from "connect-flash";
import morgan from "morgan";
import path from "path";

//Router
import products from "./src/routes/userRoutes.routes";
import register from "./src/routes/register.routes";
import login from "./src/routes/login.routes";
import menuAlumno from "./src/routes/menuAlumno.routes";
import menuProfesor from "./src/routes/menuProfesor.routes";
import generarPedidos from "./src/routes/pedidos.routes";
import misPedodos from "./src/routes/misPedidos.routes";
import pedidosPendientes from "./src/routes/pedidosPendientes.routes";
import pedidosAprobados from "./src/routes/pedidosAprobados.routes";
import gestProductos from "./src/routes/gestPedidos.routes";
import cargaComponentes from "./src/routes/cargaComponente.routes";
const app = express();

//Configs
app.engine("html", require("ejs").renderFile);
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
// app.use(flash());
// //Variable global para usuario logueado
// app.use((req, res, next) => {
//   const user = req.flash("usuario")[0];
//   console.log(user);
//   console.log(user != "");
//   console.log(user != undefined);
//   if (user != "" && user != undefined) {
//     app.locals.usuario = user;
//     console.log("MIDDLEWARE: ");
//     console.log(app.locals.usuario);
//   }

//   next();
// });

//Routes

const main = () => {
  app.listen(app.get("port"));
  console.log(`Server corriendo en el puerto ${app.get("port")}`);
};
main();
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
//Archivos estáticos
app.use(express.static("public"));

export default app;
